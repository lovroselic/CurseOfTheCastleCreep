/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
/*jshint -W083 */
"use strict";

///////////////////////////////////////////////
//                                           //
//           WebGL libs and classes          //
//                                           //
///////////////////////////////////////////////

/**
 * STUDY:
 * https://glmatrix.net/docs/
 * https://www.tomdalling.com/blog/modern-opengl/
 * https://thebookofshaders.com/
 * https://webglfundamentals.org/webgl/lessons/resources/webgl-state-diagram.html
 * this: http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/#the-model-view-and-projection-matrices
 * https://learnopengl.com/Lighting/Basic-Lighting
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-directional.html
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-point.html
 * https://webglfundamentals.org/webgl/lessons/webgl-drawing-multiple-things.html
 * https://learnopengl.com/Lighting/Multiple-lights
 * 
 * https://learnopengl.com/Advanced-OpenGL/Advanced-Data
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
 * 
 * https://en.wikipedia.org/wiki/Wavefront_.obj_file
 * 
 * https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#properties-reference
 * https://github.com/KhronosGroup/glTF/tree/main/specification/2.0
 * https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0
 * https://raw.githubusercontent.com/javagl/JglTF/master/images/gltfOverview-0.2.0.png
 * https://github.com/mattdesl/gl-constants/blob/master/1.0/numbers.js
 * https://github.khronos.org/glTF-Tutorials/gltfTutorial/gltfTutorial_001_Introduction.html
 */

const WebGL = {
    VERSION: "1.04",
    CSS: "color: gold",
    CTX: null,
    VERBOSE: false,
    INI: {
        PIC_WIDTH: 0.5,
        PIC_TOP: 0.2,
        PIC_OUT: 0.0025,
        ITEM_UP: 0.01,
        LIGHT_WIDTH: 0.4,
        LIGHT_TOP: 0.1,
        DEFAULT_RESOLUTION: 256,
        MIN_RESOLUTION: 128,
        INTERACT_DISTANCE: 1.3,
        DYNAMIC_LIGHTS_RESERVATION: 32,
        EXPLOSION_N_PARTICLES: 25000,
        EXPLOSION_DURATION_MS: 2000,
        BOMB_DURATION_MS: 4000,
        POISON_DURATION_MS: 3000,
        BLOOD_DURATION_MS: 2500,
        SMUDGE_DURATION_MS: 500,
        MIN_R: 0.25,
        MAX_R: 0.5001,
        INTERACTION_TIMEOUT: 4000,
        BLAST_RADIUS: 1.495,
        BLAST_DAMAGE: 100,
    },
    CONFIG: {
        firstperson: true,
        dual: false,
        prevent_movement_in_exlusion_grids: true,
        set(type, dual = false, prevent = true) {
            this.dual = dual;
            this.prevent_movement_in_exlusion_grids = prevent;
            switch (type) {
                case "first_person":
                    this.firstperson = true;
                    break;
                case "third_person":
                    this.firstperson = false;
                    break;
                default:
                    throw `WebGL CONFIG type error: ${type}`;
            }
            if (WebGL.VERBOSE) console.info(`%cWebGL set to type: ${type}, dual mode: ${dual}, prevent_movement_in_exlusion_grids: ${prevent}`, WebGL.CSS);
        },
        holesSupported: true,
        supportHoles() {
            this.holesSupported = true;
        },
        ignoreHoles() {
            this.holesSupported = false;
        }
    },
    programs_compiled: false,
    program: null,
    pickProgram: null,
    buffer: null,
    texture: null,
    aspect: null,
    zNear: 0.1,
    zFar: 100,
    projectionMatrix: null,
    vertexCount: null,
    targetTexture: null,
    depthBuffer: null,
    frameBuffer: null,
    playerList: [],
    staticDecalList: [DECAL3D, LIGHTS3D, BUMP3D],
    interactiveDecalList: [INTERACTIVE_DECAL3D, INTERACTIVE_BUMP3D],
    dynamicDecalList: [GATE3D, ITEM3D],
    dynamicLightSources: [MISSILE3D, EXPLOSION3D],
    models: [$3D_MODEL],
    modelTextureSet: false,
    main_program: {
        vSource: "vShader",
        fSource: "fShader",
    },
    pick_program: {
        vSource: "pick_vShader",
        fSource: "pick_fShader",
    },
    model_program: {
        vSource: "model_vShader",
        fSource: "fShader",
        program: null,
    },
    explosion_program: {
        transform: {
            vSource: "particle_transform_vShader",
            fSource: "particle_transform_fShader",
            transformFeedback: ["o_offset", "o_velocity", "o_age", "o_ageNorm"],
            program: null,
        },
        render: {
            vSource: "particle_render_vShader",
            fSource: "particle_render_fShader",
            transformFeedback: null,
            program: null,
        }
    },
    update_shaders_forLightSources: ['fShader'],
    hero: null,
    setContext(layer) {
        this.CTX = LAYER[layer];
        if (this.VERBOSE) console.log(`%cContext:`, this.CSS, this.CTX);
        if (!this.CTX) console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
    },
    setWorld(world) {
        const gl = this.CTX;
        this.world = world;
        this.initAllBuffers(gl, world);
    },
    init(layer, world, textureData, camera, decalsAreSet) {
        this.setContext(layer);
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.initPrograms(gl);
        this.setWorld(world);
        this.setTexture(textureData);
        if (!decalsAreSet) this.setDecalTextures();
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.setCamera(camera);

        if (this.VERBOSE) {
            console.log(`%cWorld:`, this.CSS, this.world);
            console.log(`%cWebGL:`, this.CSS, this);
        }
    },
    initAllBuffers(gl, world) {
        this.initBuffers(gl, world);
        this.setPickBuffers(gl);
        this.setModelBuffers(gl);
    },
    initPrograms(gl) {
        if (this.programs_compiled) return;
        this.initShaderProgram(gl);
        this.initPickProgram(gl);
        this.initParticlePrograms(gl);
        this.initModelPrograms(gl);
        this.programs_compiled = true;
    },
    init_required_IAM(map, hero) {
        DECAL3D.init(map);
        LIGHTS3D.init(map);
        GATE3D.init(map);
        VANISHING3D.init(map);
        ITEM3D.init(map);
        DYNAMIC_ITEM3D.init(map, hero);
        MISSILE3D.init(map, hero);
        INTERACTIVE_DECAL3D.init(map);
        INTERACTIVE_BUMP3D.init(map);
        BUMP3D.init(map);
        ENTITY3D.init(map, hero);
        INTERFACE3D.init(map);
        EXPLOSION3D.init(map, hero)
        this.hero = hero;
    },
    setCamera(camera) {
        this.camera = camera;
        const projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(projectionMatrix, this.camera.fov, this.aspect, this.zNear, this.zFar);
        this.projectionMatrix = projectionMatrix;
    },
    createTexture(T, S = null) {
        if (T instanceof WebGLTexture) return T;
        const gl = this.CTX;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, T);
        if (isPowerOf2(T.width) && isPowerOf2(T.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        if (S) {
            for (let filter in S) {
                gl.texParameteri(gl.TEXTURE_2D, gl[filter], gl[S[filter]]);
            }
        }

        return texture;

        function isPowerOf2(value) {
            return (value & (value - 1)) === 0;
        }
    },
    setTexture(textureData) {
        const gl = this.CTX;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);                   //changed, keep
        this.texture = {};

        for (let T in textureData) {
            this.texture[T] = this.createTexture(textureData[T]);
        }

        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    },
    setDecalTextures() {
        for (const iam of [...WebGL.staticDecalList, ...WebGL.dynamicDecalList, ...WebGL.interactiveDecalList]) {
            for (const decal of iam.POOL) {
                decal.texture = this.createTexture(decal.texture);
            }
        }

        if (!this.modelTextureSet) this.setModelTextures();
    },
    setModelTextures() {
        const gl = this.CTX;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        for (const obj of [...WebGL.models]) {
            for (const [_, O] of Object.entries(obj)) {
                for (let [index, texture] of O.textures.entries()) {
                    O.textures[index] = this.createTexture(texture, O.samplers[index]);
                }
            }
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        this.modelTextureSet = true;
    },
    initBuffers(gl, world) {
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.positions), gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(world.indices), gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.textureCoordinates), gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.vertexNormals), gl.STATIC_DRAW);

        this.buffer = {
            position: positionBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
        };
    },
    setPickBuffers(gl) {
        // Create a texture to render to
        const targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, targetTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.targetTexture = targetTexture;

        // create a depth renderbuffer
        const depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        this.depthBuffer = depthBuffer;

        // Create and bind the framebuffer
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        // attach the texture as the first color attachment
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.targetTexture, 0);

        // make a depth buffer and the same size as the targetTexture
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.canvas.clientWidth, gl.canvas.clientHeight);

        this.frameBuffer = fb;
    },
    loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    },
    updateShaders() {
        const src = "N_LIGHTS = 1";
        const dest = `N_LIGHTS = ${LIGHTS3D.POOL.length + this.INI.DYNAMIC_LIGHTS_RESERVATION}`;
        for (let sh of this.update_shaders_forLightSources) {
            SHADER[sh] = SHADER[sh].replace(src, dest);
        }
    },
    initModelPrograms(gl) {
        const type = ["model"];
        for (let T of type) {
            let prog = `${T}_program`;
            const vSource = SHADER[this[prog].vSource];
            const fSource = SHADER[this[prog].fSource];
            const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vSource);
            const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fSource);
            const shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
                return null;
            }
            this[prog].program = shaderProgram;
            this[prog].uniforms = {
                projection_matrix: gl.getUniformLocation(this[prog].program, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(this[prog].program, "uModelViewMatrix"),
                cameraPos: gl.getUniformLocation(this[prog].program, "uCameraPos"),
                uLights: gl.getUniformLocation(this[prog].program, "uPointLights"),
                uLightColors: gl.getUniformLocation(this[prog].program, "uLightColors"),
                u_sampler: gl.getUniformLocation(this[prog].program, "uSampler"),
                uMaterialAmbientColor: gl.getUniformLocation(this[prog].program, 'uMaterial.ambientColor'),
                uMaterialDiffuseColor: gl.getUniformLocation(this[prog].program, 'uMaterial.diffuseColor'),
                uMaterialSpecularColor: gl.getUniformLocation(this[prog].program, 'uMaterial.specularColor'),
                uMaterialShininess: gl.getUniformLocation(this[prog].program, 'uMaterial.shininess'),
            };
        }
    },
    initParticlePrograms(gl) {
        const particleType = ["explosion"];
        const shaderType = ["transform", "render"];
        for (let PT of particleType) {
            let prog = `${PT}_program`;
            for (let ST of shaderType) {
                const vSource = SHADER[this[prog][ST].vSource];
                const fSource = SHADER[this[prog][ST].fSource];
                const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vSource);
                const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fSource);
                const shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);

                if (this[prog][ST].transformFeedback) {
                    gl.transformFeedbackVaryings(shaderProgram, this[prog][ST].transformFeedback, gl.SEPARATE_ATTRIBS);
                }

                gl.linkProgram(shaderProgram);
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
                    return null;
                }
                this[prog][ST].program = shaderProgram;
            }
        }
    },
    initPickProgram(gl) {
        const vSource = SHADER[this.pick_program.vSource];
        const fSource = SHADER[this.pick_program.fSource];
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
            return null;
        }
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                id: gl.getUniformLocation(shaderProgram, "u_id"),
                uScale: gl.getUniformLocation(shaderProgram, "uScale"),
                uTranslate: gl.getUniformLocation(shaderProgram, "uTranslate"),
                uRotY: gl.getUniformLocation(shaderProgram, "uRotateY"),
            },
        };

        this.pickProgram = programInfo;
    },
    initShaderProgram(gl) {
        const vSource = SHADER[this.main_program.vSource];
        const fSource = SHADER[this.main_program.fSource];
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
            return null;
        }
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
                vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
                textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
                cameraPos: gl.getUniformLocation(shaderProgram, "uCameraPos"),
                lights: gl.getUniformLocation(shaderProgram, "uPointLights"),
                uScale: gl.getUniformLocation(shaderProgram, "uScale"),
                uTranslate: gl.getUniformLocation(shaderProgram, "uTranslate"),
                uItemPosition: gl.getUniformLocation(shaderProgram, "uItemPosition"),
                lightColors: gl.getUniformLocation(shaderProgram, "uLightColors"),
                lightDirections: gl.getUniformLocation(shaderProgram, "uLightDirections"),
                uRotY: gl.getUniformLocation(shaderProgram, "uRotateY"),
                uMaterialAmbientColor: gl.getUniformLocation(shaderProgram, 'uMaterial.ambientColor'),
                uMaterialDiffuseColor: gl.getUniformLocation(shaderProgram, 'uMaterial.diffuseColor'),
                uMaterialSpecularColor: gl.getUniformLocation(shaderProgram, 'uMaterial.specularColor'),
                uMaterialShininess: gl.getUniformLocation(shaderProgram, 'uMaterial.shininess'),
            },
        };

        this.program = programInfo;
    },
    setModelBuffers(gl) {
        for (let m of this.models) {
            for (let model in m) {
                for (let mesh of m[model].meshes) {
                    for (let primitive of mesh.primitives) {
                        for (let a in primitive) {
                            if (typeof (primitive[a]) == 'number') continue;
                            primitive[a].initBuffer(gl);
                        }
                    }
                }
            }
        }
    },
    black() {
        const gl = this.CTX;
        if (!gl) return;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    },
    transparent() {
        const gl = this.CTX;
        if (!gl) return;
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    },
    renderScene() {
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //scene
        const viewMatrix = glMatrix.mat4.create();
        const cameratarget = this.camera.pos.translate(this.camera.dir);
        glMatrix.mat4.lookAt(viewMatrix, this.camera.pos.array, cameratarget.array, [0.0, 1.0, 0.0]);
        this.viewMatrix = viewMatrix;

        // identity placeholders & and defaults
        const translationMatrix = glMatrix.mat4.create();
        const scaleMatrix = glMatrix.mat4.create();
        const rotateY = glMatrix.mat4.create();

        gl.useProgram(this.program.program);

        // Set the uniform matrices
        gl.uniformMatrix4fv(this.program.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.modelViewMatrix, false, this.viewMatrix);
        gl.uniform3fv(this.program.uniformLocations.cameraPos, this.camera.pos.array);
        gl.uniformMatrix4fv(this.program.uniformLocations.uScale, false, scaleMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.uTranslate, false, translationMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.uRotY, false, rotateY);
        gl.uniform1i(this.program.uniformLocations.uSampler, 0);
        //default material for walls and decals
        gl.uniform3fv(this.program.uniformLocations.uMaterialAmbientColor, MATERIAL.wall.ambientColor);
        gl.uniform3fv(this.program.uniformLocations.uMaterialDiffuseColor, MATERIAL.wall.diffuseColor);
        gl.uniform3fv(this.program.uniformLocations.uMaterialSpecularColor, MATERIAL.wall.specularColor);
        gl.uniform1f(this.program.uniformLocations.uMaterialShininess, MATERIAL.wall.shininess);


        //light uniforms
        let lights = [];
        let lightColors = [];
        let lightDirections = [];
        for (let L = 0; L < LIGHTS3D.POOL.length; L++) {
            let dir = Vector3.from_2D_dir(FaceToDirection(LIGHTS3D.POOL[L].face));
            lightDirections.push(...dir.array);
            lights.push(...LIGHTS3D.POOL[L].position.array);
            lightColors.push(...LIGHTS3D.POOL[L].lightColor);
        }

        //dynamic lights
        let dynLights = [];
        let dynLightColors = [];
        let dynLightDirs = [];                      // in current implementation dynamic light has no direction - same level in all directions
        let dynCount = 0;
        let cont = true;
        for (let iam of this.dynamicLightSources) {
            for (let LS of iam.POOL) {
                if (!LS) continue;

                dynLights.push(...LS.pos.array);
                dynLightColors.push(...LS.lightColor);
                dynLightDirs.push(255, 255, 255);
                dynCount++;
                if (dynCount > this.INI.DYNAMIC_LIGHTS_RESERVATION) {
                    console.error("Dynamic light sources exceed reserved memory! Ignoring silently.");
                    cont = false;
                    break;
                }
            }
            if (!cont) break;
        }

        while (dynLights.length < this.INI.DYNAMIC_LIGHTS_RESERVATION * 3) {
            dynLights.push(-1, -1, -1);
            dynLightColors.push(0, 0, 0);
            dynLightDirs.push(255, 255, 255);
        }

        lights.push(...dynLights);
        lightColors.push(...dynLightColors);
        lightDirections.push(...dynLightDirs);
        lights = new Float32Array(lights);
        lightColors = new Float32Array(lightColors);
        lightDirections = new Float32Array(lightDirections);

        //console.info("lightDirections", lightDirections);


        gl.uniform3fv(this.program.uniformLocations.lights, lights);
        gl.uniform3fv(this.program.uniformLocations.lightColors, lightColors);
        gl.uniform3fv(this.program.uniformLocations.lightDirections, lightDirections);

        //set global uniforms for model program - could be extended to loop over more programs if required
        gl.useProgram(this.model_program.program);
        gl.uniformMatrix4fv(this.model_program.uniforms.projection_matrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.model_program.uniforms.modelViewMatrix, false, this.viewMatrix);
        gl.uniform3fv(this.model_program.uniforms.cameraPos, this.camera.pos.array);
        gl.uniform3fv(this.model_program.uniforms.uLights, lights);
        gl.uniform3fv(this.model_program.uniforms.uLightColors, lightColors);
        gl.uniform1i(this.model_program.uniforms.u_sampler, 0);

        //pickProgram uniforms and defaults
        gl.useProgram(this.pickProgram.program);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.modelViewMatrix, false, this.viewMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uScale, false, scaleMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uTranslate, false, translationMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uRotY, false, rotateY);

        this.renderDungeon();
    },
    enableAttributes(gl) {
        //dungeon
        //setPositionAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(this.program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.vertexPosition);

        //setTextureAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
        gl.vertexAttribPointer(this.program.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.textureCoord);

        // indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        //setNormalAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
        gl.vertexAttribPointer(this.program.attribLocations.vertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.vertexNormal);

        // Bind the texture to texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.wall);

        //picking program
        gl.useProgram(this.pickProgram.program);

        //setPositionAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(this.pickProgram.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.pickProgram.attribLocations.vertexPosition);
    },
    renderDungeon() {
        const gl = this.CTX;
        gl.useProgram(this.program.program);
        this.enableAttributes(gl);

        //start draw
        gl.useProgram(this.program.program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        /**  draw per slice of the world  */

        //wall
        gl.drawElements(gl.TRIANGLES, this.world.offset.wall_count, gl.UNSIGNED_SHORT, this.world.offset.wall_start * 2);

        //floor
        gl.bindTexture(gl.TEXTURE_2D, this.texture.floor);
        gl.drawElements(gl.TRIANGLES, this.world.offset.floor_count, gl.UNSIGNED_SHORT, this.world.offset.floor_start * 2);

        //ceil
        if (this.CONFIG.firstperson) {
            gl.bindTexture(gl.TEXTURE_2D, this.texture.ceil);
            gl.drawElements(gl.TRIANGLES, this.world.offset.ceil_count, gl.UNSIGNED_SHORT, this.world.offset.ceil_start * 2);
        }

        //static decals
        let decalCount = 0;
        for (const iam of WebGL.staticDecalList) {
            for (const decal of iam.POOL) {
                gl.bindTexture(gl.TEXTURE_2D, decal.texture);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (this.world.offset.decal_start + decalCount * 6) * 2);
                decalCount++;
            }
        }

        //interactive decals
        for (const iam of WebGL.interactiveDecalList) {
            for (const decal of iam.POOL) {
                if (decal.active) {
                    gl.bindTexture(gl.TEXTURE_2D, decal.texture);
                    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (this.world.offset.decal_start + decalCount * 6) * 2);

                    //to texture
                    let id_vec = this.idToVec(decal.global_id);
                    gl.useProgram(this.pickProgram.program);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                    gl.uniform4fv(this.pickProgram.uniformLocations.id, new Float32Array(id_vec));
                    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (this.world.offset.decal_start + decalCount * 6) * 2);

                    //back to canvas
                    gl.useProgram(this.program.program);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                }
                //end
                decalCount++;
            }
        }

        /**  draw per object */

        //doors
        for (const door of GATE3D.POOL) {
            if (door) {
                door.drawObject(gl);
                door.drawInteraction(gl, this.frameBuffer);
            }
        }

        //items
        for (const item of ITEM3D.POOL) {
            if (item.active) {
                item.drawObject(gl);
                item.drawInteraction(gl, this.frameBuffer);
            }
        }

        //missile
        for (const missile of MISSILE3D.POOL) {
            if (missile) {
                missile.drawObject(gl);
            }
        }

        //pov 
        if (this.CONFIG.firstperson) {
            for (const pov of INTERFACE3D.POOL) {
                if (pov) {
                    pov.drawObject(gl);
                }
            }
        }

        //entities
        gl.useProgram(WebGL.model_program.program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        for (const entity of ENTITY3D.POOL) {
            if (entity) {
                entity.drawSkin(gl);
            }
        }
        //movables
        for (const entity of DYNAMIC_ITEM3D.POOL) {
            if (entity) {
                entity.drawSkin(gl);
            }
        }
        //movable interaction - switching to picking program and to frame buffer!
        for (const entity of DYNAMIC_ITEM3D.POOL) {
            if (entity) {
                entity.drawInteraction(gl, this.frameBuffer);
            }
        }

        //and HERO
        gl.useProgram(WebGL.model_program.program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (!this.CONFIG.firstperson || this.CONFIG.dual) {
            for (const player of this.playerList) {
                player.draw(gl);
            }
        }

        //explosion
        for (const explosion of EXPLOSION3D.POOL) {
            if (explosion) {
                explosion.draw(gl);
            }
        }

        //remember: last draw was on particle renderer!!!
    },
    idToVec(id) {
        return [((id >> 0) & 0xFF) / 0xFF, ((id >> 8) & 0xFF) / 0xFF, ((id >> 16) & 0xFF) / 0xFF, ((id >> 24) & 0xFF) / 0xFF];
    },
    DATA: {
        window: null,
        layer: null,
    },
    MOUSE: {
        initialize(id) {
            WebGL.DATA.window = id;
            WebGL.DATA.layer = ENGINE.getCanvasName(id);
            ENGINE.topCanvas = WebGL.DATA.layer;
            $(WebGL.DATA.layer).on("mousemove", { layer: WebGL.DATA.layer }, ENGINE.readMouse);
            if (WebGL.VERBOSE) console.log(`%cWebGL.MOUSE -> window ${WebGL.DATA.window}, layer: ${WebGL.DATA.layer}`, WebGL.CSS);
        },
        click(hero) {
            if (ENGINE.mouseOverId(WebGL.DATA.window)) {
                if (ENGINE.mouseClickId(WebGL.DATA.window)) {
                    const gl = WebGL.CTX;
                    gl.bindFramebuffer(gl.FRAMEBUFFER, WebGL.frameBuffer);
                    const pixelX = ENGINE.mouseX;
                    const pixelY = gl.canvas.height - ENGINE.mouseY - 1;
                    const data = new Uint8Array(4);
                    gl.readPixels(pixelX, pixelY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
                    const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
                    //console.warn("id", id); //debug
                    if (id <= 0) return;
                    const obj = GLOBAL_ID_MANAGER.getObject(id);
                    if (!obj) return;
                    if (!obj.interactive) return;
                    if (WebGL.VERBOSE) console.info("Object clicked:", obj, "globalID", id);
                    let PPos2d = Vector3.to_FP_Grid(hero.player.pos);

                    let itemGrid = obj.grid;
                    if (obj.moveState) {
                        itemGrid = obj.moveState.grid;                                                          // support fort movables
                    }
                    else if (obj.grid.constructor.name === "Grid") {                                            // support for non FP grids
                        itemGrid = Grid.toCenter(obj.grid);
                    }

                    let distance = PPos2d.EuclidianDistance(itemGrid);
                    if (WebGL.VERBOSE) console.info("Object distance:", distance);
                    if (distance < WebGL.INI.INTERACT_DISTANCE) {
                        /** 
                         * GA
                         * inventory
                         * mouseClick
                         * hero
                         * (GA, inventory, mouseClick, hero)
                         */

                        if (!obj.excludeFromInventory) {
                            if (hero.inventory.totalSize() >= hero.inventoryLimit) {
                                return {
                                    category: "error",
                                    which: "inventory_full"
                                };
                            }
                        }
                        return obj.interact(hero.player.GA, hero.inventory, true, hero);
                    }
                }
            }
        }
    }
};

const RAY = {
    /*
        raycast related utility functions
    */
    INI: {
        NO_SOUND: 8,
        NORMAL_SOUND: 2
    },
    volume(distance) {
        let ratio = (RAY.INI.NO_SOUND - RAY.INI.NORMAL_SOUND - (distance - RAY.INI.NORMAL_SOUND)) / (RAY.INI.NO_SOUND - RAY.INI.NORMAL_SOUND);
        ratio = Math.min(Math.max(0, ratio), 1);
        return ratio;
    }
};

const WORLD = {
    bufferTypes: ["positions", 'indices', "textureCoordinates", "vertexNormals"],
    objectTypes: ["wall", "floor", "ceil", "decal"],
    init() {
        for (let BT of this.bufferTypes) {
            this[BT] = [];
        }
        for (let OT of this.objectTypes) {
            this[OT] = {};
            for (let BT of this.bufferTypes) {
                this[OT][BT] = [];
            }
        }
    },
    getBoundaries(cat, W, H, resolution) {
        const R = W / H;
        let leftX, rightX, topY, bottomY;
        let dW, dH;

        switch (cat) {
            case "picture":
                leftX = ((1 - WebGL.INI.PIC_WIDTH) / 2.0);
                rightX = 1.0 - leftX;
                topY = 1.0 - WebGL.INI.PIC_TOP;
                bottomY = 1.0 - ((WebGL.INI.PIC_WIDTH / R) + WebGL.INI.PIC_TOP);
                break;
            case "light":
                leftX = ((1 - WebGL.INI.LIGHT_WIDTH) / 2.0);
                rightX = 1.0 - leftX;
                topY = 1.0 - WebGL.INI.LIGHT_TOP;
                bottomY = 1.0 - ((WebGL.INI.LIGHT_WIDTH / R) + WebGL.INI.LIGHT_TOP);
                break;
            case "crest":
            case "portal":
            case "texture":
                dW = (1.0 - W / resolution) / 2;
                dH = (1.0 - H / resolution) / 2;
                leftX = dW;
                rightX = 1.0 - dW;
                topY = 1.0 - dH;
                bottomY = dH;
                break;
            default:
                console.error("decal category error", cat);
                break;
        }
        return [leftX, rightX, topY, bottomY];
    },
    divineResolution(pic) {
        let maxDimension = Math.max(pic.width, pic.height);
        let resolution = 2 ** (Math.ceil(Math.log2(maxDimension)));
        return Math.max(resolution, WebGL.INI.MIN_RESOLUTION);
    },
    addPic(Y, decal, type) {
        let resolution = WebGL.INI.DEFAULT_RESOLUTION;
        if (decal.resolution) {
            resolution = decal.resolution;
        } else if ((decal.category === "texture") || (decal.category === "crest" || decal.category === "portal") && decal.expand) {
            resolution = this.divineResolution(decal.texture);
            decal.resolution = resolution;
        }
        //console.info("addpic", decal, resolution);
        const [leftX, rightX, topY, bottomY] = this.getBoundaries(decal.category, decal.width, decal.height, resolution);
        const E = ELEMENT[`${decal.face}_FACE`];
        let positions = E.positions.slice();
        let indices = E.indices.slice();
        let textureCoordinates = E.textureCoordinates.slice();
        let vertexNormals = E.vertexNormals.slice();

        //scale
        switch (decal.face) {
            case "FRONT":
                positions[0] = leftX;
                positions[1] = bottomY;
                positions[3] = rightX;
                positions[4] = bottomY;
                positions[6] = rightX;
                positions[7] = topY;
                positions[9] = leftX;
                positions[10] = topY;
                for (let z of [2, 5, 8, 11]) {
                    positions[z] += WebGL.INI.PIC_OUT;
                }
                break;
            case "BACK":
                positions[0] = leftX;
                positions[1] = bottomY;
                positions[3] = leftX;
                positions[4] = topY;
                positions[6] = rightX;
                positions[7] = topY;
                positions[9] = rightX;
                positions[10] = bottomY;
                for (let z of [2, 5, 8, 11]) {
                    positions[z] -= WebGL.INI.PIC_OUT;
                }
                break;
            case "RIGHT":
                positions[1] = bottomY;
                positions[2] = leftX;
                positions[4] = topY;
                positions[5] = leftX;
                positions[7] = topY;
                positions[8] = rightX;
                positions[10] = bottomY;
                positions[11] = rightX;
                for (let x of [0, 3, 6, 9]) {
                    positions[x] += WebGL.INI.PIC_OUT;
                }
                break;
            case "LEFT":
                positions[1] = bottomY;
                positions[2] = leftX;
                positions[4] = bottomY;
                positions[5] = rightX;
                positions[7] = topY;
                positions[8] = rightX;
                positions[10] = topY;
                positions[11] = leftX;
                for (let x of [0, 3, 6, 9]) {
                    positions[x] -= WebGL.INI.PIC_OUT;
                }
                break;
            case "TOP":
                positions[0] = leftX;
                positions[2] = bottomY;
                positions[3] = rightX;
                positions[5] = bottomY;
                positions[6] = rightX;
                positions[8] = topY;
                positions[9] = leftX;
                positions[11] = topY;
                for (let y of [1, 4, 7, 10]) {
                    positions[y] += WebGL.INI.PIC_OUT - 1.0;
                }
                break;
            case "BOTTOM":
                positions[0] = leftX;
                positions[2] = bottomY;
                positions[3] = rightX;
                positions[5] = bottomY;
                positions[6] = rightX;
                positions[8] = topY;
                positions[9] = leftX;
                positions[11] = topY;
                for (let y of [1, 4, 7, 10]) {
                    positions[y] -= WebGL.INI.PIC_OUT - 1.0;
                }
                break;
            default:
                console.error("addPic face error:", decal.face);
                break;
        }

        //translate
        for (let p = 0; p < positions.length; p += 3) {
            positions[p] += decal.grid.x;
            positions[p + 1] += Y;
            positions[p + 2] += decal.grid.y;
        }

        //indices
        indices = indices.map(e => e + (this[type].positions.length / 3));

        this[type].positions.push(...positions);
        this[type].indices.push(...indices);
        this[type].textureCoordinates.push(...textureCoordinates);
        this[type].vertexNormals.push(...vertexNormals);

    },
    addCube(Y, grid, type) {
        return this.addElement(ELEMENT.CUBE, Y, grid, type);
    },
    addBlockWall(Y, grid, type) {
        return this.addElement(ELEMENT.BLOCKWALL, Y, grid, type);
    },
    addElement(E, Y, grid, type, scale = null) {
        let positions = E.positions.slice();
        let indices = E.indices.slice();
        let textureCoordinates = E.textureCoordinates.slice();
        let vertexNormals = E.vertexNormals.slice();

        //positions
        for (let p = 0; p < positions.length; p += 3) {
            if (scale) {
                positions[p] *= scale[0];
                positions[p + 1] *= scale[1];
                positions[p + 2] *= scale[2];
            }
            positions[p] += grid.x;
            positions[p + 1] += Y;
            positions[p + 2] += grid.y;
        }

        //indices
        indices = indices.map(e => e + (this[type].positions.length / 3));

        this[type].positions.push(...positions);
        this[type].indices.push(...indices);
        this[type].textureCoordinates.push(...textureCoordinates);
        this[type].vertexNormals.push(...vertexNormals);
    },
    reserveObject(E, type) {
        let positions = E.positions.slice();
        let indices = E.indices.slice();
        let textureCoordinates = E.textureCoordinates.slice();
        let vertexNormals = E.vertexNormals.slice();

        //indices
        indices = indices.map(e => e + (this[type].positions.length / 3));

        this[type].positions.push(...positions);
        this[type].indices.push(...indices);
        this[type].textureCoordinates.push(...textureCoordinates);
        this[type].vertexNormals.push(...vertexNormals);
    },
    build(map, Y = 0) {
        const GA = map.GA;
        console.time("WorldBuilding");
        this.init();

        for (let [index, value] of GA.map.entries()) {
            let grid = GA.indexToGrid(index);
            value &= (2 ** GA.gridSizeBit - 1 - (MAPDICT.FOG + MAPDICT.RESERVED + MAPDICT.ROOM));
            switch (value) {
                case MAPDICT.EMPTY:
                case MAPDICT.DOOR:
                case MAPDICT.WALL + MAPDICT.DOOR:
                    this.addCube(Y - 1, grid, "floor");
                    this.addCube(Y + 1, grid, "ceil");
                    break;
                case MAPDICT.WALL:
                case MAPDICT.WALL + MAPDICT.STAIR:
                case MAPDICT.WALL + MAPDICT.SHRINE:
                    this.addCube(Y, grid, "wall");
                    if (WebGL.CONFIG.holesSupported) this.addCube(Y - 1, grid, "wall");                  //support for holes //breaks CM2 if on - why?
                    break;
                case MAPDICT.HOLE:
                    this.addCube(Y + 1, grid, "ceil");
                    break;
                case MAPDICT.BLOCKWALL:
                    this.addBlockWall(Y, grid, "wall");
                    this.addCube(Y - 1, grid, "floor");
                    this.addCube(Y + 1, grid, "ceil");
                    break;
                default:
                    console.error("world building GA value error", value);
            }
        }

        /** build static decals */
        for (const iam of [...WebGL.staticDecalList, ...WebGL.interactiveDecalList]) {
            for (const decal of iam.POOL) {
                this.addPic(Y, decal, "decal");
            }
        }

        /** map indices */
        {
            let L = 0;
            for (let type of this.objectTypes) {
                this[type].indices = this[type].indices.map(e => e + L);
                L += this[type].positions.length / 3;
            }
        }

        /** globalize */
        for (let BT of this.bufferTypes) {
            this[BT] = [];
            for (let OT of this.objectTypes) {
                this[BT] = this[BT].concat(this[OT][BT]);
            }
        }

        const offset = this.create_offset('indices');
        const positionOffset = this.create_offset('positions');

        console.timeEnd("WorldBuilding");
        return new World(this.positions, this.indices, this.textureCoordinates, this.vertexNormals, offset, positionOffset);
    },
    create_offset(BT) {
        let offset = {};
        let L = 0;
        for (let OT of this.objectTypes) {
            offset[`${OT}_count`] = this[OT][BT].length;
            offset[`${OT}_start`] = L;
            L += this[OT][BT].length;
        }

        return offset;
    }
};

/** Classes */

class Material {
    constructor(ambient, diffuse, specular, shininess) {
        this.ambientColor = ambient;
        this.diffuseColor = diffuse;
        this.specularColor = specular;
        this.shininess = 128.0 * Math.min(Math.max(shininess, 0.001), 1.0);
    }
}

class World {
    constructor(positions, indices, textureCoordinates, vertexNormals, offset, positionOffset) {
        this.positions = positions;
        this.indices = indices;
        this.textureCoordinates = textureCoordinates;
        this.vertexNormals = vertexNormals;
        this.offset = offset;
        this.positionOffset = positionOffset;
    }
}

class $3D_Camera {
    constructor(reference, translation_direction, translation_offset, direction_offset, back_offset = 1, fov = 70) {
        this.translation_direction = translation_direction;
        this.translation_offset = translation_offset;
        this.direction_offset = direction_offset;
        this.back_offset = back_offset;
        this.reference = reference;
        this.setFov(fov);
        this.update();
    }
    setFov(fov = 70) {
        this.fov = Math.radians(fov);
    }
    update() {
        this.pos = this.reference.pos.translate(this.translation_direction, this.translation_offset);
        this.dir = this.reference.dir.add(this.direction_offset);
        this.pos = this.pos.translate(this.reference.dir.reverse2D(), this.back_offset);
    }
}

class $3D_player {
    constructor(position, dir, map = null, type = null, size = 0.5) {
        this.camera = null;
        this.model = null;
        this.setDir(dir);
        this.setPos(position);
        this.setMap(map);
        this.setR(size / 2.0);
        this.setFov();
        this.rotationResolution = 64;
        this.setSpeed(4.0);
        this.type = type;
        if (this.type) {
            for (const prop in type) {
                this[prop] = type[prop];
            }
            if (typeof (this.scale) === "number") this.scale = new Float32Array([this.scale, this.scale, this.scale]);
            this.setModel();
            this.minY = this.model.meshes[0].primitives[0].positions.min[1] * this.scale[1];
            this.matrixUpdate();
            WebGL.playerList.push(this);
        };
        this.setMode("idle");
        this.actionModes = ["attacking"];
        this.actionCallback = null;
    }
    setMode(mode) {
        /**
         * idle             : draws skin
         * walking          : animation 0
         * attacking        : animation 1
         */
        if (this.mode === 'idle' && mode === 'idle') this.resetBirth();
        this.mode = mode;
        if (this.actor) {
            switch (this.mode) {
                case "idle":
                case "walking":
                    this.actor.animationIndex = 0;
                    this.actionCallback = null;
                    break;
                case "attacking":
                    this.actor.animationIndex = 1;
                    this.actionCallback = this.attackPerformed;
                    this.resetBirth();
                    break;
                default:
                    throw Error(`3D played mode error: ${this.mode}`);
            }
        }
    }
    setModel() {
        this.model = $3D_MODEL[this.model];
        this.jointMatrix = Float32Array.from(this.model.skins[0].jointMatrix);
        this.restPose = Float32Array.from(this.model.skins[0].jointMatrix);
        this.boundingBox = new BoundingBox(this.model.meshes[0].primitives[0].positions.max, this.model.meshes[0].primitives[0].positions.min, this.scale);
        this.birth = Date.now();
        this.actor = new $3D_ACTOR(this, this.model.animations, this.model.skins[0], this.jointMatrix);
        const dZ = (this.boundingBox.max.z - this.boundingBox.min.z) / 2;
        const dX = (this.boundingBox.max.x - this.boundingBox.min.x) / 2;
        const avgDim = (dZ + dX) / 2;
        const maxDim = Math.max(dZ, dX);
        this.r = Math.max((avgDim + maxDim) / 2, WebGL.INI.MIN_R);
    }
    animateAction() {
        if (this.actionModes.includes(this.mode)) {
            this.actor.animate(Date.now());
        }
    }
    attack() {
        this.setMode("attacking");
    }
    attackPerformed() {
        const hit = this.hit();
        if (!hit) return;
        let damage = TURN.damage(WebGL.hero, hit);
        const luckAddiction = Math.min(1, (damage * 0.1) >>> 0);
        damage += WebGL.hero.luck * luckAddiction;

        if (damage <= 0) {
            damage = "MISSED";
            TURN.display(damage);
            this.miss();
            return;
        }

        TURN.display(damage);
        AUDIO.SwordHit.play();
        WebGL.hero.incExp(Math.min(damage, hit.health), "attack");
        hit.health -= damage;
        AUDIO[hit.hurtSound].play();
        EXPLOSION3D.add(new BloodSmudge(hit.moveState.pos.translate(DIR_UP, hit.midHeight)));
        if (hit.health <= 0) hit.die("attack");
    }
    miss() {
        AUDIO.SwordMiss.play();
    }
    hit() {
        const attackLength = 0.5;
        const refPoint = this.pos.translate(this.dir, attackLength);
        const refGrid = Vector3.toGrid(refPoint);
        const playerGrid = Vector3.toGrid(this.pos);
        const IA = this.map.enemyIA;
        const POOL = ENTITY3D.POOL;
        const enemies = IA.unrollArray([refGrid, playerGrid]);

        if (enemies.size === 0) return this.miss();
        let attackedEnemy = null;
        if (enemies.size === 1) {
            attackedEnemy = POOL[enemies.first() - 1];
        } else if (enemies.size > 1) {
            let distance = Infinity;
            for (let e of enemies) {
                const entity = POOL[e - 1];
                if (!entity.swordTipDistance) {
                    entity.swordTipDistance = this.swordTipPosition.EuclidianDistance(entity.moveState.pos);
                }
                if (entity.swordTipDistance < distance) {
                    distance = entity.swordTipDistance;
                    attackedEnemy = entity;
                }
            }
        }
        if (ENGINE.verbose) console.info("selected attackedEnemy", `${attackedEnemy.name} - ${attackedEnemy.id}`);
        let hit = ENGINE.lineIntersectsCircle(Vector3.to_FP_Grid(this.pos),
            Vector3.to_FP_Grid(refPoint),
            Vector3.to_FP_Grid(attackedEnemy.moveState.pos),
            attackedEnemy.r);
        if (hit) return attackedEnemy;
        return null;
    }
    associateExternalCamera(camera) {
        this.camera = camera;
    }
    clearCamera() {
        this.camera = null;
    }
    matrixUpdate() {
        this.setRotation();
        this.setTranslation();
    }
    setTranslation() {
        this.translation = glMatrix.mat4.create();
        const modelPosition = this.pos.clone();
        modelPosition.set_y(this.minY);
        glMatrix.mat4.fromTranslation(this.translation, modelPosition.array);
    }
    setRotation() {
        this.rotation = glMatrix.mat4.create();
        const angle = -FP_Vector.toClass(UP).radAngleBetweenVectors(Vector3.to_FP_Vector(this.dir));
        glMatrix.mat4.rotate(this.rotation, this.rotation, this.rotateToNorth + angle, [0, 1, 0]);
    }
    setSpeed(speed) {
        this.moveSpeed = speed;
    }
    setPos(position) {
        this.pos = position;
        this.setSwordTip();
        if (this.camera) this.camera.update();
        if (this.camera || (this.model && WebGL.CONFIG.dual)) {
            this.matrixUpdate();
            this.actor.animate(Date.now());
        }
        this.setMode('walking');
    }
    resetBirth() {
        this.actor.birth = Date.now();
    }
    setSwordTip() {
        this.swordTipPosition = this.pos.translate(this.dir, this.r);
    }
    setDir(dir) {
        this.dir = dir;
        if (this.pos) this.setSwordTip();
        if (this.camera) this.camera.update();
        this.setMode('walking');
    }
    setMap(map) {
        this.map = map;
        this.GA = this.map.GA;
        this.enemyIA = this.map.enemyIA;
    }
    setR(r) {
        this.r = r;
    }
    setFov(fov = 70) {
        this.fov = Math.radians(fov);
    }
    rotate(rotDirection, lapsedTime) {
        let angle = Math.round(lapsedTime / ENGINE.INI.ANIMATION_INTERVAL) * rotDirection * ((2 * Math.PI) / this.rotationResolution);
        this.setDir(Vector3.from_2D_dir(this.dir.rotate2D(angle), this.dir.y));
        if (WebGL.CONFIG.dual && WebGL.CONFIG.firstperson) this.setRotation();   //
    }
    bumpEnemy(nextPos) {
        let checkGrids = this.GA.gridsAroundEntity(nextPos, Vector3.to_FP_Vector(this.dir), this.r); //grid check is 2D projection!
        let enemies = this.map.enemyIA.unrollArray(checkGrids);
        if (enemies.size > 0) {
            for (const e of enemies) {
                let EP_hit = this.circleCollision(ENTITY3D.POOL[e - 1], nextPos);
                if (EP_hit) return true;
            }
        }
        return false;
    }
    move(reverse, lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        let dir = this.dir;

        if (reverse) {
            dir = dir.reverse2D();
        }

        let nextPos3 = this.pos.translate(dir, length); //3D
        let nextPos = Vector3.to_FP_Grid(nextPos3);
        let bump = this.usingStaircase(nextPos);
        if (bump !== null) {
            bump.interact();
            return;
        }

        if (this.bumpEnemy(nextPos)) return;
        let check;
        if (WebGL.CONFIG.prevent_movement_in_exlusion_grids) {
            check = this.GA.entityNotInExcusion(nextPos, Vector3.to_FP_Vector(dir), this.r);
        } else {
            check = this.GA.entityNotInWall(nextPos, Vector3.to_FP_Vector(dir), this.r);
        }
        if (check) {
            this.setPos(nextPos3);
        }
    }
    strafe(rotDirection, lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        let dir = Vector3.from_2D_dir(this.dir.rotate2D((rotDirection * Math.PI) / 2), this.dir.y);
        let nextPos3 = this.pos.translate(dir, length);
        let nextPos = Vector3.to_FP_Grid(nextPos3);
        let bump = this.usingStaircase(nextPos);
        if (bump !== null) {
            bump.interact(this);
            return;
        }

        if (this.bumpEnemy(nextPos)) return;
        let check;
        if (WebGL.CONFIG.prevent_movement_in_exlusion_grids) {
            check = this.GA.entityNotInExcusion(nextPos, Vector3.to_FP_Vector(dir), this.r);
        } else {
            check = this.GA.entityNotInWall(nextPos, Vector3.to_FP_Vector(dir), this.r);
        }
        if (check) {
            this.setPos(nextPos3);
        }
    }
    usingStaircase(nextPos, resolution = 4) {
        let currentGrid = Grid.toClass(Vector3.to_FP_Grid(this.pos));
        let dir = Vector3.to_FP_Vector(this.dir);
        let checks = [];
        for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / resolution) {
            checks.push(nextPos.translate(dir.rotate(theta), this.r));
        }

        for (const point of checks) {
            let futureGrid = Grid.toClass(point);
            if (GRID.same(futureGrid, currentGrid)) {
                continue;
            } else {
                if (this.GA.isWall(futureGrid) && this.GA.isStair(futureGrid)) {
                    const IA = this.map.decalIA3D || this.map.interactive_bump3d;
                    const bump = IA.unroll(futureGrid)[0] - 1;
                    if (isNaN(bump)) return null;
                    if (BUMP3D.POOL.length > 0) return BUMP3D.POOL[bump];
                    return INTERACTIVE_BUMP3D.POOL[bump];
                }
            }
        }
        return null;
    }
    circleCollision(entity, nextPos = null) {
        let distance;
        if (nextPos !== null) {
            distance = Vector3.to_FP_Grid(entity.moveState.pos).EuclidianDistance(nextPos);
        } else {
            distance = Vector3.to_FP_Grid(entity.moveState.pos).EuclidianDistance(Vector3.to_FP_Grid(this.pos));
        }
        let touchDistance = entity.r + this.r;
        return distance < touchDistance;
    }
    respond(lapsedTime) {
        if (this.actionModes.includes(this.mode)) return;               //action must not be interrupted

        const map = ENGINE.GAME.keymap;
        if (map[ENGINE.KEY.map.Q]) {
            this.rotate(-1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.E]) {
            this.rotate(1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.W]) {
            this.move(false, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.S]) {
            this.move(true, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.A]) {
            this.strafe(-1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.D]) {
            this.strafe(1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.LT] || map[ENGINE.KEY.map.LTC]) {
            this.dir = Vector3.from_2D_dir(Vector3.to_FP_Vector(this.dir).ortoAlign(), this.dir.y);
            return;
        }
    }
    draw(gl) {
        //console.warn("mode:", this.mode, "animation index", this.actor.animationIndex);
        const program = WebGL.model_program.program;
        //uniforms
        //material
        gl.uniform3fv(WebGL.model_program.uniforms.uMaterialAmbientColor, this.material.ambientColor);
        gl.uniform3fv(WebGL.model_program.uniforms.uMaterialDiffuseColor, this.material.diffuseColor);
        gl.uniform3fv(WebGL.model_program.uniforms.uMaterialSpecularColor, this.material.specularColor);
        gl.uniform1f(WebGL.model_program.uniforms.uMaterialShininess, this.material.shininess);

        //scale
        const mScaleMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
        const uScaleMatrix = gl.getUniformLocation(program, 'uScale');
        gl.uniformMatrix4fv(uScaleMatrix, false, mScaleMatrix);

        //translate
        const uTranslateMatrix = gl.getUniformLocation(program, 'uTranslate');
        gl.uniformMatrix4fv(uTranslateMatrix, false, this.translation);

        //rotate
        const uRotatematrix = gl.getUniformLocation(program, 'uRotateY');
        gl.uniformMatrix4fv(uRotatematrix, false, this.rotation);

        //u_jointMat
        const uJointMat = gl.getUniformLocation(program, "u_jointMat");
        switch (this.mode) {
            case "idle":
                gl.uniformMatrix4fv(uJointMat, false, this.restPose);
                break;
            case "walking":
            case "attacking":
                gl.uniformMatrix4fv(uJointMat, false, this.jointMatrix);
                break;
            default:
                throw Error(`3D played mode error: ${this.mode}`);
        }

        for (let mesh of this.model.meshes) {
            for (let [index, primitive] of mesh.primitives.entries()) {

                //positions
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.positions.buffer);
                const vertexPosition = gl.getAttribLocation(program, "aVertexPosition");
                gl.vertexAttribPointer(vertexPosition, 3, gl[primitive.positions.type], false, 0, 0);
                gl.enableVertexAttribArray(vertexPosition);

                //texture
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.textcoord.buffer);
                const textureCoord = gl.getAttribLocation(program, "aTextureCoord");
                gl.vertexAttribPointer(textureCoord, 2, gl[primitive.textcoord.type], false, 0, 0);
                gl.enableVertexAttribArray(textureCoord);

                //normals
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.normals.buffer);
                const vertexNormal = gl.getAttribLocation(program, "aVertexNormal");
                gl.vertexAttribPointer(vertexNormal, 3, gl[primitive.normals.type], false, 0, 0);
                gl.enableVertexAttribArray(vertexNormal);

                //aJoint
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.joints.buffer);
                const joints = gl.getAttribLocation(program, "aJoint");
                gl.vertexAttribPointer(joints, 4, gl[primitive.joints.type], false, 0, 0);
                gl.enableVertexAttribArray(joints);

                //aWeight
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.weights.buffer);
                const weights = gl.getAttribLocation(program, "aWeight");
                gl.vertexAttribPointer(weights, 4, gl[primitive.weights.type], false, 0, 0);
                gl.enableVertexAttribArray(weights);

                //indices
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, primitive.indices.buffer);

                //binding texture data
                gl.activeTexture(gl.TEXTURE0);
                if (this.texture) {
                    gl.bindTexture(gl.TEXTURE_2D, this.texture);
                } else {
                    gl.bindTexture(gl.TEXTURE_2D, this.model.textures[index]);
                }

                gl.drawElements(gl.TRIANGLES, primitive.indices.count, gl[primitive.indices.type], 0);
            }
        }
    }
}

class Decal {
    constructor(grid, face, texture, category, name) {
        this.grid = grid;
        this.face = face;
        this.texture = texture;
        this.category = category;
        this.name = name;
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.active = true;
    }
}

class StaticDecal extends Decal {
    constructor(grid, face, texture, category, name, expand = false) {
        super(grid, face, texture, category, name);
        this.expand = expand;
        this.type = "StaticDecal";
        this.interactive = false;
    }
}

class LightDecal extends Decal {
    constructor(grid, face, texture, category, name, lightColor) {
        super(grid, face, texture, category, name);
        this.lightColor = lightColor;
        this.type = "LightDecal";
        this.interactive = false;
        this.setPosition(grid, face);
    }
    setPosition(grid, face) {
        let off = FaceToOffset(face, WebGL.INI.PIC_OUT);
        let pos = FP_Grid.toClass(grid).add(off);
        this.position = new Vector3(pos.x, WebGL.INI.LIGHT_TOP, pos.y);
    }
}

class Portal extends Decal {
    constructor(grid, face, texture, category, name, destination, call) {
        super(grid, face, texture, category, name);
        this.type = "Portal";
        this.interactive = false;
        this.destination = destination;
        this.texture = texture;
        this.call = call;
        this.excludeFromInventory = true;
    }
    interact() {
        this.call(this.destination);
    }
}

class ExternalGate extends Portal {
    constructor(grid, face, texture, category, name, color, open, locked, destination, call) {
        super(grid, face, texture, category, name, destination, call);
        this.type = "Portal";
        this.interactive = true;
        this.expand = true;//
        this.color = color;
        this.open = open;
        this.locked = locked;
        if (this.open) this.interactive = false;
    }
    openGate() {
        this.open = true;
        this.interactive = false;
        this.color = "Open";

        if (this.texture instanceof WebGLTexture) {
            this.texture = WebGL.createTexture(SPRITE.DungeonDoor_Open);
        } else {
            this.texture = SPRITE.DungeonDoor_Open;
        }
    }
    block() {
        //console.warn("WebGL::blocking door", this);
        this.open = false;
        this.interactive = false;
        this.color = "Blocked";
        /**
         * as this is always done before WebGL world building it must not be WebGL texture but SPRITE
         */
        this.texture = SPRITE.DungeonDoor_Blocked;
    }
    interact(GA = null, inventory = null, mouseClick = false) {
        if (this.open && !mouseClick) {
            this.call(this.destination);
            return;
        }
        if (mouseClick) {
            if (this.locked) {
                const checkKey = (key, value) => inventory.key.some((o) => o[key] === value);
                if (checkKey("color", this.color)) {
                    this.locked = false;
                    for (let [i, el] of inventory.key.entries()) {
                        if (el.color === this.color) {
                            inventory.key.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if (!this.locked) {
                this.openGate();
                this.storageLog();
                AUDIO.OpenGate.play();
                return { category: "title", section: "keys" };
            }
            AUDIO.ClosedDoor.play();
        }
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        this.IAM.map.storage.add(new IAM_Storage_item("INTERACTIVE_BUMP3D", this.id, "openGate"));
    }
}

class Destination {
    constructor(waypoint, level, origin = null) {
        this.waypoint = waypoint;
        this.level = level;
        this.origin = origin;
    }
}

class Drawable_object {
    constructor() {
        this.gl = WebGL.CTX;
    }
    initBuffers(gl = this.gl) {
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.element.positions), gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.element.indices), gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.element.textureCoordinates), gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.element.vertexNormals), gl.STATIC_DRAW);

        this.buffer = {
            position: positionBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
        };
    }
    enableAttributtes(gl, attrib) {
        //positions
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(attrib.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attrib.vertexPosition);

        //texture
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
        gl.vertexAttribPointer(attrib.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attrib.textureCoord);

        //normals
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
        gl.vertexAttribPointer(attrib.vertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attrib.vertexNormal);

        //indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        //binding texture data
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
    setUniforms(gl, uniforms) {
        gl.uniformMatrix4fv(uniforms.uScale, false, this.mScaleMatrix);
        gl.uniformMatrix4fv(uniforms.uTranslate, false, this.mTranslationMatrix);
        gl.uniformMatrix4fv(uniforms.uRotY, false, this.mRotationMatrix);
        gl.uniform3fv(uniforms.uMaterialAmbientColor, this.material.ambientColor);
        gl.uniform3fv(uniforms.uMaterialDiffuseColor, this.material.diffuseColor);
        gl.uniform3fv(uniforms.uMaterialSpecularColor, this.material.specularColor);
        gl.uniform1f(uniforms.uMaterialShininess, this.material.shininess);
    }
    drawObject(gl) {
        const program = WebGL.program.program;
        const attrib = WebGL.program.attribLocations;
        const uniforms = WebGL.program.uniformLocations;
        gl.useProgram(program);
        this.enableAttributtes(gl, attrib);
        this.setUniforms(gl, uniforms);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.drawElements(gl.TRIANGLES, this.indices, gl.UNSIGNED_SHORT, 0);
    }
    drawInteraction(gl, frameBuffer) {
        const id_vec = WebGL.idToVec(this.global_id);
        const program = WebGL.pickProgram.program;
        const attrib = WebGL.pickProgram.attribLocations;
        const uniforms = WebGL.pickProgram.uniformLocations;
        gl.useProgram(program);

        //setPositionAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(attrib.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attrib.vertexPosition);

        this.setUniforms(gl, uniforms);
        gl.uniform4fv(uniforms.id, new Float32Array(id_vec));
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        gl.drawElements(gl.TRIANGLES, this.indices, gl.UNSIGNED_SHORT, 0);
    }
    deactivate() {
        this.active = false;
        this.interactive = false;
    }
}

class $POV extends Drawable_object {
    constructor(type, player, offset, maxZ = 0.45) {
        super();
        offset = offset || [-0.1, 0.20, -0.02];
        maxZ = maxZ || 0.45;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.start = `${this.element}_start`;
        this.element = ELEMENT[this.element];
        this.initBuffers();
        this.texture = TEXTURE[this.texture];
        this.texture = WebGL.createTexture(this.texture);
        if (typeof (this.scale) === "number") {
            this.scale = new Float32Array([this.scale, this.scale, this.scale]);
        }
        this.indices = this.element.indices.length;
        this.player = player;
        this.offset = Vector3.from_array(offset);
        this.minZ = this.offset.z;
        this.maxZ = maxZ;
        this.translationLength = this.maxZ - this.minZ;

        //scale
        const mScaleMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
        this.mScaleMatrix = mScaleMatrix;

        //sword management
        this.time = 500;
        this.length = 0.5;
        this.stopMoving();
        this.manage();
    }
    stab() {
        if (this.moving) return;
        this.startMoving();
    }
    stopMoving() {
        this.now = this.minZ;
        this.moving = false;
        this.direction = null;
    }
    startMoving() {
        this.date = Date.now();
        this.moving = true;
        this.direction = 1;
    }
    setRotation() {
        const identity = glMatrix.mat4.create();
        const angle = -FP_Vector.toClass(UP).radAngleBetweenVectors(Vector3.to_FP_Vector(this.player.dir));
        glMatrix.mat4.rotate(identity, identity, angle, [0, 1, 0]);
        this.mRotationMatrix = identity;
    }
    setPosition() {
        let pos = this.player.pos.translate(this.player.dir, this.now);
        let dirRight = glMatrix.vec3.create();
        glMatrix.vec3.rotateY(dirRight, this.player.dir.array, glMatrix.vec3.create(), Math.PI / 2);
        pos = pos.translate(Vector3.from_array(dirRight), this.offset.x);
        pos = pos.translate(DIR_DOWN, this.offset.y);
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, pos.array);
        this.mTranslationMatrix = mTranslationMatrix;
    }
    stabbed() {
        this.direction = -1;
        this.date = Date.now();
        const hit = this.hit();
        if (!hit) return;
        let damage = TURN.damage(this.IAM.hero, hit);
        const luckAddiction = Math.min(1, (damage * 0.1) >>> 0);
        damage += this.IAM.hero.luck * luckAddiction;
        if (damage <= 0) {
            damage = "MISSED";
            TURN.display(damage);
            this.miss();
            return;
        }
        TURN.display(damage);
        AUDIO.SwordHit.play();
        this.IAM.hero.incExp(Math.min(damage, hit.health), "attack");
        hit.health -= damage;
        AUDIO[hit.hurtSound].play();
        EXPLOSION3D.add(new BloodSmudge(hit.moveState.pos.translate(DIR_UP, hit.midHeight)));
        if (hit.health <= 0) hit.die("attack");
    }
    miss() {
        AUDIO.SwordMiss.play();
    }
    hit() {
        const refPoint = this.player.pos.translate(this.player.dir, this.length);
        const refGrid = Vector3.toGrid(refPoint);
        const playerGrid = Vector3.toGrid(this.player.pos);
        const IA = this.IAM.IA.enemy;
        const map = this.IAM.map;
        const POOL = this.IAM.external.enemy.POOL;
        const enemies = map[IA].unrollArray([refGrid, playerGrid]);

        if (enemies.size === 0) return this.miss();
        let attackedEnemy = null;
        if (enemies.size === 1) {
            attackedEnemy = POOL[enemies.first() - 1];
        } else if (enemies.size > 1) {
            let distance = Infinity;
            for (let e of enemies) {
                const entity = POOL[e - 1];
                if (!entity.swordTipDistance) {
                    entity.swordTipDistance = this.player.swordTipPosition.EuclidianDistance(entity.moveState.pos);
                }
                if (entity.swordTipDistance < distance) {
                    distance = entity.swordTipDistance;
                    attackedEnemy = entity;
                }
            }
        }
        if (ENGINE.verbose) console.info("selected attackedEnemy", `${attackedEnemy.name}-${attackedEnemy.id}`);

        let hit = ENGINE.lineIntersectsCircle(Vector3.to_FP_Grid(this.player.pos),
            Vector3.to_FP_Grid(refPoint),
            Vector3.to_FP_Grid(attackedEnemy.moveState.pos),
            attackedEnemy.r);
        if (hit) return attackedEnemy;
        return null;
    }
    manage() {
        if (this.moving) {
            let currentTime;
            if (this.direction === 1) {
                currentTime = (Date.now() - this.date) / this.time;
                if (currentTime >= 1.0) {
                    this.stabbed();
                }
            } else if (this.direction === -1) {
                currentTime = 1.0 - (Date.now() - this.date) / this.time;
                if (currentTime <= 0.0) {
                    this.stopMoving();
                }
            }
            this.now = this.translationLength * currentTime + this.minZ;
        }
        this.setPosition();
        this.setRotation();
    }
}

class Gate extends Drawable_object {
    constructor(grid, type, GA) {
        super();
        this.grid = grid;
        this.pos = Vector3.from_Grid(grid);
        this.type = type;
        this.GA = GA;
        this.interactive = true;
        this.excludeFromInventory = true;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.texture = TEXTURE[this.texture];
        this.element = ELEMENT[this.element];
        this.initBuffers();
        this.indices = this.element.indices.length;

        this.mScaleMatrix = glMatrix.mat4.create();
        this.mRotationMatrix = glMatrix.mat4.create();
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.pos.array);
        this.mTranslationMatrix = mTranslationMatrix;
    }
    lift() {
        VANISHING3D.add(new LiftingGate(this));
    }
    interact(GA, inventory) {
        if (this.locked) {
            const checkKey = (key, value) => inventory.key.some((o) => o[key] === value);
            if (checkKey("color", this.color)) {
                this.locked = false;
                inventory.key = inventory.key.filter((el) => el.color !== this.color);
            }
        }

        if (!this.locked) {
            this.open(true);
            AUDIO.LiftGate.play();
            return { category: "title", section: "keys" };
        } else {
            AUDIO.ClosedDoor.play();
        }
    }
    open(logFlag) {
        if (logFlag) this.storageLog();
        this.deactivate();
        this.GA.openDoor(this.grid);
        this.lift();
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        this.IAM.map.storage.add(new IAM_Storage_item("GATE3D", this.id, "open", false));
    }
}

class LiftingGate {
    constructor(gate) {
        this.gate = gate;
    }
    manage(lapsedTime) {
        const DOOR_LIFTING_SPEED = 0.60;
        const dY = DOOR_LIFTING_SPEED * lapsedTime / 1000;
        this.lift(dY);
        if (this.done()) this.remove();
    }
    lift(dY) {
        this.gate.pos = this.gate.pos.add(new Vector3(0, dY, 0));
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.gate.pos.array);
        this.gate.mTranslationMatrix = mTranslationMatrix;
    }
    done() {
        return this.gate.pos.y > 1.0;
    }
    remove() {
        this.gate.IAM.remove(this.gate.id);
        this.IAM.remove(this.id);
    }
}

class FloorItem3D extends Drawable_object {
    constructor(grid, type, instanceIdentification = null, rotation = null) {
        super();
        this.grid = grid;
        this.type = type;
        this.instanceIdentification = instanceIdentification;
        this.excludeFromInventory = false;
        this.interactive = true;
        this.active = true;
        this.dropped = false;
        for (const prop in type) {
            this[prop] = type[prop];
        }

        this.element = ELEMENT[this.element];
        this.initBuffers();
        this.texture = TEXTURE[this.texture];
        if (typeof (this.scale) === "number") {
            this.scale = new Float32Array([this.scale, this.scale, this.scale]);
        }
        this.indices = this.element.indices.length;

        let heightTranslate = new Float32Array([0, 0, 0]);
        if (this.glueToFloor) {
            let max = ELEMENT.getMinY(this.element);
            heightTranslate[1] -= max * this.scale[1];
            heightTranslate[1] += WebGL.INI.ITEM_UP;
        }
        let translate = new Vector3(grid.x, 0, grid.y);
        translate = translate.add(Vector3.from_array(heightTranslate));
        this.translate = translate.array;

        if (this.category === "gold") {
            this.value = RND(this.minVal, this.maxVal);
        }

        if (rotation === null) rotation = Math.radians(RND(0, 359));;
        let identity = glMatrix.mat4.create();
        glMatrix.mat4.rotate(identity, identity, rotation, [0, 1, 0]);
        this.mRotationMatrix = identity;
        const mScaleMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
        this.mScaleMatrix = mScaleMatrix;
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.translate);
        this.mTranslationMatrix = mTranslationMatrix;
    }
    setValue(value) {
        this.value = value;
    }
    setTexture() {
        this.texture = WebGL.createTexture(this.texture);
    }
    interact(GA, inventory, click, hero) {
        this.storageLog();
        this.deactivate();
        if (this.instanceIdentification && typeof (this.instanceIdentification) === "string") {
            if (["INTERACTION_ITEM"].includes(this.instanceIdentification.split(".")[0])) {
                const type = eval(this.instanceIdentification);
                this.text = type.text;
            }
        }
        if (this.text) hero.speak(this.text);
        return {
            category: this.category,
            value: this.value,
            color: this.color,
            inventorySprite: this.inventorySprite,
            which: this.which,
            pos: this.translate,
            instanceIdentification: this.instanceIdentification,
            name: this.name,
        };
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        if (this.dropped) return;
        this.IAM.map.storage.add(new IAM_Storage_item("ITEM3D", this.id, "deactivate"));
    }
}

class Missile extends Drawable_object {
    constructor(position, direction, type, magic, casterId = 0) {
        super();
        this.active = true;
        this.name = "Missile";
        this.pos = position;
        this.dir = direction;
        this.magic = magic;
        //this.casterId = casterId;                   //legacy - obsolete
        this.distance = null;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.texture = WebGL.createTexture(TEXTURE[this.texture]);
        this.element = ELEMENT[this.element];
        this.initBuffers();
        this.lightColor = colorStringToVector(this.lightColor);

        if (typeof (this.scale) === "number") {
            this.scale = new Float32Array([this.scale, this.scale, this.scale]);
        }
        this.r = Math.max(...this.scale) * 2;
        this.indices = this.element.indices.length;
        this.power = this.calcPower(magic);
        this.pos = this.pos.translate(this.dir, 1.2 * this.r);

        const mScaleMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
        this.mScaleMatrix = mScaleMatrix;
        this.mRotationMatrix = glMatrix.mat4.create();
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.pos.array);
        this.mTranslationMatrix = mTranslationMatrix;
    }
    static calcMana(magic) {
        return (magic ** 1.15) | 0;
    }
    draw() {
        ENGINE.VECTOR2D.drawPerspective(this, "#F00");
    }
    move(lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        this.pos = this.pos.translate(this.dir, length);
        this.distance = glMatrix.vec3.distance(this.IAM.hero.player.pos.array, this.pos.array);

        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.pos.array);
        this.mTranslationMatrix = mTranslationMatrix;
    }
    calcPower(magic) {
        return 2 * magic + RND(-2, 2);
    }
    calcDamage(magic) {
        let part1 = (magic / 2) | 0;
        let part2 = magic - part1;
        let damage = this.power - part1 - RND(0, part2);
        return damage;
    }
    hitWall(IAM) {
        this.explode(IAM);
    }
    explode(IAM) {
        IAM.remove(this.id);
        EXPLOSION3D.add(new ParticleExplosion(this.pos));
        AUDIO.Explosion.volume = RAY.volume(this.distance);
        AUDIO.Explosion.play();
    }
    clean() {
        this.IAM.remove(this.id);
    }
}

class BouncingMissile extends Missile {
    constructor(position, direction, type, magic) {
        super(position, direction, type, magic);
        this.name = "BouncingMissile";
        this.bounceCount = 0;
        this.maxPower = this.power;
        this.minPower = (this.power * 0.2) >>> 0;
        this.originalScale = new Float32Array(this.scale);
    }
    static calcMana(magic) {
        return (2 * (magic ** 1.25)) | 0;
    }
    calcPower(magic) {
        return (3 * magic) + RND(-3, 3);
    }
    rebound(innerPoint, GA, IAM) {
        const pos2D = Vector3.to_FP_Grid(this.pos);
        const dir2D = Vector3.to_FP_Vector(this.dir);
        const reboundDir = GRID.getReboundDir(innerPoint, pos2D, dir2D, GA);
        if (!reboundDir) return this.explode(IAM);
        const new3D_dir = Vector3.from_2D_dir(reboundDir);
        this.dir = new3D_dir;
        this.bounceCount++;
    }
    hitWall(IAM, point, GA) {
        if (this.power >= this.minPower) {
            this.rebound(point, GA, IAM);
            AUDIO.Buzz.volume = RAY.volume(this.distance);
            AUDIO.Buzz.play();
            this.power--;
            const scaleFactor = this.power / this.maxPower;
            glMatrix.vec3.scale(this.scale, this.originalScale, scaleFactor);
            const mScaleMatrix = glMatrix.mat4.create();
            glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
            this.mScaleMatrix = mScaleMatrix;

        } else this.explode(IAM);

    }
    explode(IAM) {
        IAM.remove(this.id);
        EXPLOSION3D.add(new GreenMetalExplosion(this.pos));
        AUDIO.Explosion.volume = RAY.volume(this.distance);
        AUDIO.Explosion.play();
    }
}

class WallFeature3D {
    constructor(grid, face, type, gameContext = GAME, titleContext = TITLE) {
        this.interactive = true;
        this.active = true;
        this.grid = grid;
        this.face = face;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.texture = SPRITE[this.sprite];
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.excludeFromInventory = true;
        this.reset();
        this.gameContext = gameContext;
        this.titleContext = titleContext;
    }
    deactivate() {
        this.active = false;
        this.interactive = false;
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        this.IAM.map.storage.add(new IAM_Storage_item("INTERACTIVE_DECAL3D", this.id, "deactivate"));
    }
    speak(text) {
        SPEECH.use(this.voice);
        SPEECH.speakWithArticulation(text);
    }
    reset() {
        this.ready = true;
    }
    block() {
        this.ready = false;
    }
    deductGold(value) {
        if (this.gameContext.gold >= value) {
            this.gameContext.gold -= value;
            this.titleContext.gold();
            return true;
        }
        return false;
    }
}

class Shrine extends WallFeature3D {
    constructor(grid, face, type) {
        super(grid, face, type);
        this.expand = true;
    }
    interact() {

        if (!this.ready) return;
        this.block();
        setTimeout(this.reset.bind(this), WebGL.INI.INTERACTION_TIMEOUT);

        if (this.introduce) {
            this.introduce = false;
            this.speak(this.text);
            return {
                category: "oracle",
                text: this.text
            };
        }

        if (this.deductGold(this.price || 1)) {
            this.storageLog();
            this.deactivate();

            return {
                category: this.interactionCategory,
                inventorySprite: this.inventorySprite,
                which: this.which,
                level: this.level,
            };
        } else {
            AUDIO.MagicFail.play();
            return null;
        }
    }
    deactivate() {
        this.interactive = false;
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        this.IAM.map.storage.add(new IAM_Storage_item("INTERACTIVE_DECAL3D", this.id, "deactivate"));
    }
}

class Oracle extends WallFeature3D {
    constructor(grid, face, type) {
        super(grid, face, type);
        this.expand = true;
    }
    interact() {
        if (!this.ready) return;
        this.block();
        setTimeout(this.reset.bind(this), WebGL.INI.INTERACTION_TIMEOUT);

        if (this.deductGold(this.price || 1)) {
            this.speak(this.text);
            return {
                category: this.interactionCategory,
                text: this.text
            };

        } else {
            AUDIO.MagicFail.play();
            return null;
        }
    }
}

class InteractionEntity extends WallFeature3D {
    constructor(grid, face, type) {
        super(grid, face, type);
        this.wantCount = this.wants.length;
        this.mode = "intro";
        this.virgin = true;
        this.expand = true;
    }
    setMode(mode) {
        this.mode = mode;
    }
    storageLogWantRemoval(name) {
        this.IAM.map.storage.add(new IAM_Storage_item("INTERACTIVE_DECAL3D", this.id, "removeWant", name));
    }
    removeWant(name) {
        this.wants.splice(this.wants.indexOf(name), 1);
    }
    checkWants(items) {
        for (const [index, item] of items.entries()) {
            const name = item.name;
            if (this.wants.includes(name)) {
                items.splice(index, 1);
                this.storageLogWantRemoval(name);
                this.removeWant(name);
                return;
            }
        }
        return;
    }
    interact(GA, inventory) {
        if (!this.ready) return;
        this.block();
        setTimeout(this.reset.bind(this), WebGL.INI.INTERACTION_TIMEOUT);

        let inventorySprite = null;
        let name = null;
        let color = null;
        let which = null;
        let level = null;
        let category = "entity_interaction";
        if (!this.virgin) {
            this.checkWants(inventory.item);
            if (this.wants.length === 0) {
                this.setMode("conclusion");
                this.deactivate();
                this.storageLog();
                name = this.gives;
                inventorySprite = INTERACTION_ITEM[name].inventorySprite
                category = INTERACTION_ITEM[name].category;
                color = INTERACTION_ITEM[name].color;
                which = INTERACTION_ITEM[name].which;
                level = INTERACTION_ITEM[name].level;

            } else if (this.wants.length < this.wantCount) {
                this.setMode("progress");
            }
        }

        this.virgin = false;
        let text = this.text[this.mode];
        this.speak(text);

        return {
            category: category,
            inventorySprite: inventorySprite,
            text: text,
            name: name,
            color: color,
            which: which,
            level: level,
        };
    }
    deactivate() {
        this.interactive = false;
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        this.IAM.map.storage.add(new IAM_Storage_item("INTERACTIVE_DECAL3D", this.id, "deactivate"));
    }
}

class InterActor extends InteractionEntity {
    constructor(grid, face, type) {
        super(grid, face, type);
    }
    interact(GA, inventory) {
        if (!this.ready) return;
        this.block();
        setTimeout(this.reset.bind(this), WebGL.INI.INTERACTION_TIMEOUT);
        let category = "entity_interaction";

        if (!this.virgin) {
            this.checkWants(inventory.item);
            if (this.wants.length === 0) {
                this.setMode("conclusion");
                this.deactivate();
                this.storageLog();
                this.changeTexture();
                category = this.action;

            } else if (this.wants.length < this.wantCount) {
                this.setMode("progress");
            }
        }

        this.virgin = false;
        let text = this.text[this.mode];
        this.speak(text);

        return {
            category: category,
            text: text,
        };

    }
    changeTexture() {
        this.texture = WebGL.createTexture(SPRITE[this.spriteChange]);
    }
}

class Trigger extends WallFeature3D {
    constructor(grid, face, sprite, action, targetGrid, GA) {
        const type = {
            name: "trigger",
            category: 'crest',
            sprite: sprite
        };
        super(grid, face, type);
        this.action = action.split("->")[1];
        this.targetGrid = targetGrid;
        this.GA = GA;
        this.excludeFromInventory = true;
    }
    interact() {
        const pos = Vector3.from_Grid(Grid.toCenter(this.targetGrid));
        EXPLOSION3D.add(new FloorDust(pos));
        this.deactivate();
        this.storageLog();
        this.GA[this.action](this.targetGrid);
        return {
            category: "rebuild",
        };
    }
}

class Trap extends WallFeature3D {
    constructor(grid, face, sprite, action, prototype, targetGrid) {
        const type = {
            name: "trigger",
            category: 'crest',
            sprite: sprite
        };
        super(grid, face, type);
        this.action = action;
        this.targetGrid = targetGrid;
        this.prototype = prototype;
    }
    interact(GA, inventory, mouseClick, hero) {
        console.log("trap - interact");
        this.deactivate();
        this.storageLog();
        return this[this.action](hero);
    }
    Spawn() {
        const entity = new $3D_Entity(Grid.toCenter(this.targetGrid), this.prototype, UP);
        entity.dropped = true;
        ENTITY3D.add(entity);
    }
    Missile(hero) {
        const position = Grid.toCenter(this.targetGrid);
        const target = Grid.toCenter(this.grid);
        const direction2D = position.direction(target);
        const dir = Vector3.from_2D_dir(direction2D);
        const missile = new this.prototype.construct(Vector3.from_Grid(position, 0.5), dir, this.prototype, hero.magic);
        MISSILE3D.add(missile);
    }
}



class BoundingBox {
    constructor(max, min, scale = null) {
        this.max = Vector3.from_array(max);
        if (scale) this.max = this.max.scaleVec3(scale);
        this.min = Vector3.from_array(min);
        if (scale) this.min = this.min.scaleVec3(scale);
    }
}

class ItemTypeDefinition {
    constructor(name, category, element, scale, glueToFloor, texture, material) {
        this.name = name;
        this.category = category;
        this.element = element;
        this.scale = scale;
        this.glueToFloor = glueToFloor;
        this.texture = texture;
        this.material = material;
    }
}

class KeyTypeDefinition extends ItemTypeDefinition {
    constructor(name, inventorySprite, color, texture, material) {
        super(name, "key", "KEY", 1 / 2 ** 3, true, texture, material);
        this.inventorySprite = inventorySprite;
        this.color = color;
    }
}

class PotionTypeDefinition extends ItemTypeDefinition {
    constructor(name, inventorySprite, color, texture, material) {
        super(name, "potion", "FLASK", 1.1 / 2 ** 5, true, texture, material);
        this.inventorySprite = inventorySprite;
        this.color = color;
    }
}

/** Particle classes */

class ParticleEmmiter {
    constructor(position, texture) {
        this.gl = WebGL.CTX;
        this.pos = position;
        this.birth = Date.now();
        this.age = 0;
        this.duration = null;
        this.currentIndex = 0;
        this.texture = WebGL.createTexture(texture);
        this.callback = null;
    }
    update(date) {
        this.normalized_age = (date - this.birth) / this.duration;
    }
    build(number) {
        const gl = this.gl;
        let start_index = RND(0, UNIFORM.INI.MAX_N_PARTICLES - number);

        this.readFeedback = [gl.createVertexArray(), gl.createVertexArray()];
        this.writeFeedback = [gl.createTransformFeedback(), gl.createTransformFeedback()];

        //location
        let location_data = UNIFORM.spherical_locations.slice(start_index * 3, (start_index + number) * 3);
        this.bOffset = [gl.createBuffer(), gl.createBuffer()];
        let locOffset = 0;

        //velocity
        let velocity_data = UNIFORM.spherical_directions.slice(start_index * 3, (start_index + number) * 3);
        this.bVelocity = [gl.createBuffer(), gl.createBuffer()];
        const locVelocity = 1;

        //age
        let age_data = new Float32Array(number);
        let age = Date.now() - this.birth;
        age_data.fill(age);
        this.bAge = [gl.createBuffer(), gl.createBuffer()];
        const locAge = 2;

        //ageNorm
        let age_norm_data = new Float32Array(number);
        this.bAgeNorm = [gl.createBuffer(), gl.createBuffer()];
        let locAgeNorm = 3;

        //life
        let life_data = [];
        for (let c = 0; c < number; c++) {
            life_data.push(RND(Math.floor(this.duration * 0.85), this.duration));
        }
        this.bLife = [gl.createBuffer(), gl.createBuffer()];
        const locLife = 4;

        for (let i = 0; i < 2; i++) {
            gl.bindVertexArray(this.readFeedback[i]);

            //location offsets
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bOffset[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(location_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locOffset, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locOffset);

            //velocity_offsets
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bVelocity[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(velocity_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locVelocity, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locVelocity);

            //age buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bAge[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(age_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locAge, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locAge);

            //age_norm_buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bAgeNorm[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(age_norm_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locAgeNorm, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locAgeNorm);

            //life buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bLife[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(life_data), gl.STATIC_DRAW);
            gl.vertexAttribPointer(locLife, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locLife);

            //clean
            gl.bindVertexArray(null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            //Setup Transform Feedback
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.writeFeedback[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locOffset, this.bOffset[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locVelocity, this.bVelocity[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locAge, this.bAge[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locAgeNorm, this.bAgeNorm[i]);
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
        }

        //Render VAO
        this.vaoRender = [gl.createVertexArray(), gl.createVertexArray()];

        //index
        this.bIndex = gl.createBuffer();
        this.aIndex = new Uint16Array([0, 1, 2, 2, 3, 0]);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.aIndex, gl.STATIC_DRAW);
        this.vaoCount = this.aIndex.length;

        //vertices
        this.bVertices = gl.createBuffer();
        this.aVertices = new Float32Array([
            -0.025, -0.025, 0.0,
            0.025, -0.025, 0.0,
            0.025, 0.025, 0.0,
            -0.025, 0.025, 0.0,
        ]);

        const locVert = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bVertices);
        gl.bufferData(gl.ARRAY_BUFFER, this.aVertices, gl.STATIC_DRAW);

        //UVs
        this.bUV = gl.createBuffer();
        this.aUV = new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]);
        const locUV = 1;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bUV);
        gl.bufferData(gl.ARRAY_BUFFER, this.aUV, gl.STATIC_DRAW);

        //Setup VAOs for Rendering
        locOffset = 2;
        locAgeNorm = 3;
        for (let i = 0; i < 2; i++) {

            gl.bindVertexArray(this.vaoRender[i]);

            //INDEX
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bIndex);

            //VERTICES
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bVertices);
            gl.vertexAttribPointer(locVert, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locVert);

            //UVs
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bUV);
            gl.vertexAttribPointer(locUV, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locUV);

            //OFFSET
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bOffset[i]);
            gl.vertexAttribPointer(locOffset, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locOffset);
            gl.vertexAttribDivisor(locOffset, 1); //instanced

            //AGE NORM
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bAgeNorm[i]);
            gl.vertexAttribPointer(locAgeNorm, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locAgeNorm);
            gl.vertexAttribDivisor(locAgeNorm, 1); //instanced

            //CLEANUP
            gl.bindVertexArray(null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
    }
    draw(gl) {
        const transform_program = WebGL.explosion_program.transform.program;
        gl.useProgram(transform_program);

        //uniforms
        let u_time = gl.getUniformLocation(transform_program, "u_time");
        let time_now = Date.now() - this.birth;
        gl.uniform1f(u_time, time_now);
        const u_velocity_factor = gl.getUniformLocation(transform_program, "uVelocityFactor");
        gl.uniform1f(u_velocity_factor, this.velocity);
        const u_gravity = gl.getUniformLocation(transform_program, "uGravity");
        gl.uniform3fv(u_gravity, this.gravity);
        //

        const nextIndex = (this.currentIndex + 1) % 2;
        let vaoTFRead = this.readFeedback[this.currentIndex];
        let vaoTFWrite = this.writeFeedback[nextIndex];

        gl.bindVertexArray(vaoTFRead);										        //READ FROM
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, vaoTFWrite);		        //WRITE TO
        gl.enable(gl.RASTERIZER_DISCARD);							                //Disable Fragment Shader

        gl.beginTransformFeedback(gl.POINTS);					                    //Begin Feedback Process
        gl.drawArrays(gl.POINTS, 0, this.number);	                                //Execute Feedback Shader.
        gl.endTransformFeedback();									                //End Feedback Process

        gl.disable(gl.RASTERIZER_DISCARD);							                //Enable Fragment Shader
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);			            //Clear out which feedback is bound

        //render
        const render_program = WebGL.explosion_program.render.program;
        gl.useProgram(render_program);
        gl.disable(gl.CULL_FACE);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        //render uniforms
        const projection_matrix = gl.getUniformLocation(render_program, "uProjectionMatrix");
        gl.uniformMatrix4fv(projection_matrix, false, WebGL.projectionMatrix);
        const modelViewMatrix = gl.getUniformLocation(render_program, "uModelViewMatrix");
        gl.uniformMatrix4fv(modelViewMatrix, false, WebGL.viewMatrix);
        const expCenter = gl.getUniformLocation(render_program, "uExpCenter");
        gl.uniform3fv(expCenter, this.pos.array);
        const u_scale = gl.getUniformLocation(render_program, "uScale");
        gl.uniform1f(u_scale, this.scale);
        const u_rounded = gl.getUniformLocation(render_program, "uRounded");
        gl.uniform1i(u_rounded, this.rounded);
        // uniform end

        gl.bindVertexArray(this.vaoRender[nextIndex]);
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(gl.getUniformLocation(render_program, "uSampler"), 0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.drawElementsInstanced(gl.TRIANGLES, this.vaoCount, gl.UNSIGNED_SHORT, 0, this.number);

        //cleanup
        gl.bindVertexArray(null);
        this.currentIndex = nextIndex;
    }
    clean() {
        this.IAM.remove(this.id);
    }
}

class ParticleExplosion extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.EXPLOSION_DURATION_MS, texture = TEXTURE.Explosion, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#FF3300");
        this.scale = 0.5;
        this.gravity = new Float32Array([0, 0.0075, 0]);
        this.velocity = 0.03;
        this.rounded = 1;
    }
}

class GreenMetalExplosion extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.POISON_DURATION_MS, texture = TEXTURE.GreenMetal, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = LIGHT_COLORS.lightGreen;
        this.scale = 0.2;
        this.gravity = new Float32Array([0, 0.005, -0.005]);
        this.velocity = 0.01;
        this.rounded = 1;
    }
}

class BloodExplosion extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.BLOOD_DURATION_MS, texture = TEXTURE.RedLiquid, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.25;
        this.gravity = new Float32Array([0, 0.0025, 0]);
        this.velocity = 0.0075;
        this.rounded = 1;
    }
}

class BloodSmudge extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.SMUDGE_DURATION_MS, texture = TEXTURE.RedLiquid, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#330000");
        this.scale = 0.05;
        this.gravity = new Float32Array([0, 0.001, 0]);
        this.velocity = 0.0025;
        this.rounded = 1;
    }
}

class SmokeExplosion extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.EXPLOSION_DURATION_MS, texture = TEXTURE.ScrapedMetal, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.20;
        this.gravity = new Float32Array([0, -0.0025, 0]);
        this.velocity = 0.005;
        this.rounded = 1;
    }
}

class WoodExplosion extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.EXPLOSION_DURATION_MS, texture = TEXTURE.Wood1, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.1;
        this.gravity = new Float32Array([0, 0.0005, 0]);
        this.velocity = 0.0025;
        this.rounded = 0;
    }
}

class FloorDust extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.EXPLOSION_DURATION_MS * 1.5, texture = TEXTURE.Tile, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.1;
        this.gravity = new Float32Array([0, -0.05, 0]);
        this.velocity = 0.01;
        this.rounded = 0;
    }
}

class BigFireExplosion extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.EXPLOSION_DURATION_MS, texture = TEXTURE.Explosion2, number = UNIFORM.INI.MAX_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#FF3300");
        this.scale = 0.25;
        this.gravity = new Float32Array([0, 0.0075, 0]);
        this.velocity = 0.1;
        this.rounded = 1;
    }
}
class StaticParticleBomb extends ParticleEmmiter {
    constructor(position, duration = WebGL.INI.BOMB_DURATION_MS, texture = TEXTURE.Explosion2, number = UNIFORM.INI.MAX_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = duration;
        this.build(number);
        this.lightColor = colorStringToVector("#000000");
        this.scale = 0.6;
        this.gravity = new Float32Array([0, 0.005, 0]);
        this.velocity = 0.01;
        this.rounded = 1;
        this.callback = this.explode;
    }
    explode() {
        console.log("StaticParticleBomb EXPLODES", this);
        AUDIO.Fuse.stop();
        EXPLOSION3D.add(new BigFireExplosion(this.pos));
        AUDIO.Explosion.volume = RAY.volume(0);
        AUDIO.Explosion.play();
        this.blast();
    }
    blast() {
        const GA = this.IAM.map.GA;
        const position = Vector3.to_FP_Grid(this.pos);
        const playerHit = GRID.circleCollision2D(Vector3.to_FP_Grid(this.IAM.hero.player.pos), position, this.IAM.hero.player.r + WebGL.INI.BLAST_RADIUS);
        if (playerHit) this.IAM.hero.applyDamage(WebGL.INI.BLAST_DAMAGE);

        const blastVector = new FP_Vector(WebGL.INI.BLAST_RADIUS, WebGL.INI.BLAST_RADIUS);
        const TL = Grid.toClass(position.sub(blastVector));
        const BR = Grid.toClass(position.add(blastVector));
        console.info("TL BR", TL, BR);

        let modified_grid = false;
        let monsters_than_can_be_affected = [];
        let IA = this.IAM.map.enemyIA;
        for (let x = TL.x; x <= BR.x; x++) {
            for (let y = TL.y; y <= BR.y; y++) {
                const grid = new Grid(x, y);
                const check = GA.check(grid, EXPLOADABLES.sum());
                if (check) {
                    modified_grid = true;
                    GA.toEmpty(grid);
                    EXPLOSION3D.add(new FloorDust(Vector3.from_Grid(Grid.toCenter(grid))));
                }
                if (!IA.empty(grid)) monsters_than_can_be_affected.push(...IA.unroll(grid));
            }
        }
        monsters_than_can_be_affected = monsters_than_can_be_affected.unique();
        for (const monster_id of monsters_than_can_be_affected) {
            const monster = ENTITY3D.POOL[monster_id - 1];
            monster.damage(WebGL.INI.BLAST_DAMAGE);
        }
        if (modified_grid) {
            MAP_TOOLS.rebuild_3D_world(this.IAM.map.level);
        }
    }
    clean() {
        this.explode();
        this.IAM.remove(this.id);
    }
}

/** Animated movable entitites */

class $3D_Entity {
    constructor(grid, type, dir = UP) {
        this.distance = null;
        this.airDistance = null;
        this.proximityDistance = null;                                      //euclidian distance when close up
        this.swordTipDistance = null;                                       //attack priority resolution
        this.dirStack = [];
        this.final_boss = false;
        this.dropped = false;                                               //spawned as a trap
        this.texture = null;                                                //model is the texture source, until change is forced
        this.resetTime();
        this.grid = grid;
        this.type = type;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        if (this.texture) this.changeTexture(TEXTURE[this.texture]);        //superseed from model, if forced

        this.fullHealth = this.health;
        this.model = $3D_MODEL[this.model];
        this.jointMatrix = Float32Array.from(this.model.skins[0].jointMatrix);  //needs own jointMatrix, 

        if (typeof (this.scale) === "number") this.scale = new Float32Array([this.scale, this.scale, this.scale]);

        if (this.fly) {
            this.translate = Vector3.from_Grid(grid, this.fly);
        } else {
            const minY = this.model.meshes[0].primitives[0].positions.min[1] * this.scale[1];
            this.translate = Vector3.from_Grid(grid, minY);
        }
        this.boundingBox = new BoundingBox(this.model.meshes[0].primitives[0].positions.max, this.model.meshes[0].primitives[0].positions.min, this.scale);
        this.actor = new $3D_ACTOR(this, this.model.animations, this.model.skins[0], this.jointMatrix);
        this.moveState = new $3D_MoveState(this.translate, dir, this.rotateToNorth, this);
        const dZ = (this.boundingBox.max.z - this.boundingBox.min.z) / 2;
        const dX = (this.boundingBox.max.x - this.boundingBox.min.x) / 2;
        const avgDim = (dZ + dX) / 2;
        const maxDim = Math.max(dZ, dX);
        this.r = Math.max((avgDim + maxDim) / 2, WebGL.INI.MIN_R);
        this.r = Math.min(this.r, WebGL.INI.MAX_R)

        this.canAttack = true;
        this.canShoot = false;
        if (this.magic > 0) {
            this.mana = this.mana * Missile.calcMana(this.magic);
        }
        this.petrified = false;
        this.behaviour = new Behaviour(...this.behaviourArguments);
        this.guardPosition = null;
        this.actionModes = [];
    }
    setView(lookAt) {
        this.moveState.setView(lookAt);
    }
    performAttack(victim) {
        if (!this.canAttack || this.IAM.hero.dead || this.petrified) return;
        this.canAttack = false;
        AUDIO[this.attackSound].play();
        let damage = TURN.damage(this, victim);
        let luckAddiction = Math.min(1, (damage * 0.1) >>> 0);
        damage -= luckAddiction * victim.luck;
        if (damage <= 0) {
            damage = "MISSED";
            TURN.display(damage, "red");
        } else {
            TURN.display(damage, "red");
            victim.incExp(damage, "defense");
            victim.applyDamage(damage);
        }
        setTimeout(this.resetAttack.bind(this), INI.MONSTER_ATTACK_TIMEOUT);
    }
    resetAttack() {
        if (!this) return;
        this.canAttack = true;
    }
    weak() {
        let ratio = this.health / this.fullHealth;
        return ratio <= 0.2;
    }
    makeMove() {
        this.moveState.next(this.dirStack.shift());
    }
    setDistanceFromNodeMap(nodemap, prop = "distance") {
        let gridPosition = Vector3.toGrid(this.moveState.pos);
        if (!nodemap[gridPosition.x][gridPosition.y]) {
            if (this.fly) {
                this.distance = null;
                return;
            }
            //debug
            console.error(this.name, this.id, "has issue with gridPosition", gridPosition);
            console.warn("details:", this);
        }

        let distance = nodemap[gridPosition.x][gridPosition.y].distance;
        if (distance >= 0 && distance < Infinity) {
            this[prop] = distance;
        } else this[prop] = null;
    }
    hasStack() {
        return this.dirStack.length > 0;
    }
    resetTime() {
        this.birth = Date.now();
    }
    drawInteraction(gl, frameBuffer) {
        const id_vec = WebGL.idToVec(this.global_id);
        const program = WebGL.pickProgram.program;
        const attrib = WebGL.pickProgram.attribLocations;
        const uniforms = WebGL.pickProgram.uniformLocations;
        gl.useProgram(program);

        //uniforms
        //scale
        const mScaleMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
        gl.uniformMatrix4fv(uniforms.uScale, false, mScaleMatrix);

        //translate
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.moveState.pos.array);
        gl.uniformMatrix4fv(uniforms.uTranslate, false, mTranslationMatrix);

        //rotate
        gl.uniformMatrix4fv(uniforms.uRotY, false, this.moveState.rotate);

        //id
        gl.uniform4fv(uniforms.id, new Float32Array(id_vec));

        //positions
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        for (let mesh of this.model.meshes) {
            for (let [index, primitive] of mesh.primitives.entries()) {

                //positions
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.positions.buffer);
                gl.vertexAttribPointer(attrib.vertexPosition, 3, gl[primitive.positions.type], false, 0, 0);
                gl.enableVertexAttribArray(attrib.vertexPosition);

                //indices
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, primitive.indices.buffer);

                gl.drawElements(gl.TRIANGLES, primitive.indices.count, gl[primitive.indices.type], 0);
            }
        }
    }
    drawSkin(gl) {
        const program = WebGL.model_program.program;

        //uniforms
        //material
        gl.uniform3fv(WebGL.model_program.uniforms.uMaterialAmbientColor, this.material.ambientColor);
        gl.uniform3fv(WebGL.model_program.uniforms.uMaterialDiffuseColor, this.material.diffuseColor);
        gl.uniform3fv(WebGL.model_program.uniforms.uMaterialSpecularColor, this.material.specularColor);
        gl.uniform1f(WebGL.model_program.uniforms.uMaterialShininess, this.material.shininess);

        //scale
        const mScaleMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromScaling(mScaleMatrix, this.scale);
        const uScaleMatrix = gl.getUniformLocation(program, 'uScale');
        gl.uniformMatrix4fv(uScaleMatrix, false, mScaleMatrix);

        //translate
        const mTranslationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(mTranslationMatrix, this.moveState.pos.array);
        const uTranslateMatrix = gl.getUniformLocation(program, 'uTranslate');
        gl.uniformMatrix4fv(uTranslateMatrix, false, mTranslationMatrix);

        //rotate
        const uRotatematrix = gl.getUniformLocation(program, 'uRotateY');
        gl.uniformMatrix4fv(uRotatematrix, false, this.moveState.rotate);

        //u_jointMat
        const uJointMat = gl.getUniformLocation(program, "u_jointMat");
        gl.uniformMatrix4fv(uJointMat, false, this.jointMatrix);

        for (let mesh of this.model.meshes) {
            for (let [index, primitive] of mesh.primitives.entries()) {

                //positions
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.positions.buffer);
                const vertexPosition = gl.getAttribLocation(program, "aVertexPosition");
                gl.vertexAttribPointer(vertexPosition, 3, gl[primitive.positions.type], false, 0, 0);
                gl.enableVertexAttribArray(vertexPosition);

                //texture
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.textcoord.buffer);
                const textureCoord = gl.getAttribLocation(program, "aTextureCoord");
                gl.vertexAttribPointer(textureCoord, 2, gl[primitive.textcoord.type], false, 0, 0);
                gl.enableVertexAttribArray(textureCoord);

                //normals
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.normals.buffer);
                const vertexNormal = gl.getAttribLocation(program, "aVertexNormal");
                gl.vertexAttribPointer(vertexNormal, 3, gl[primitive.normals.type], false, 0, 0);
                gl.enableVertexAttribArray(vertexNormal);

                //aJoint
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.joints.buffer);
                const joints = gl.getAttribLocation(program, "aJoint");
                gl.vertexAttribPointer(joints, 4, gl[primitive.joints.type], false, 0, 0);
                gl.enableVertexAttribArray(joints);

                //aWeight
                gl.bindBuffer(gl.ARRAY_BUFFER, primitive.weights.buffer);
                const weights = gl.getAttribLocation(program, "aWeight");
                gl.vertexAttribPointer(weights, 4, gl[primitive.weights.type], false, 0, 0);
                gl.enableVertexAttribArray(weights);

                //indices
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, primitive.indices.buffer);

                //binding texture data
                gl.activeTexture(gl.TEXTURE0);
                if (this.texture) {
                    gl.bindTexture(gl.TEXTURE_2D, this.texture);
                } else {
                    gl.bindTexture(gl.TEXTURE_2D, this.model.textures[index]);
                }

                gl.drawElements(gl.TRIANGLES, primitive.indices.count, gl[primitive.indices.type], 0);
            }
        }
    }
    drawVector2D() {
        ENGINE.VECTOR2D.drawBlock(this);
    }
    update(date) {
        if (!this.petrified) {
            this.moveState.update();
            this.actor.animate(date);
        }
    }
    reset() {
        if (!this.petrified) this.moveState.resetView();
        this.swordTipDistance = null;
    }
    dropInventory() {
        if (!this.inventory) return;
        const grid = this.moveState.grid;
        const GA = this.IAM.map.GA;
        if (GA.isHole(Grid.toClass(grid))) return;
        const item = new FloorItem3D(grid, this.inventory);
        if (item.category === 'gold') item.setValue(this.gold);
        item.setTexture();
        item.dropped = true;
        ITEM3D.add(item);
    }
    die(expType, exp = 0) {
        this.storageLog();
        exp += this.xp;
        this.remove();
        this.dropInventory();
        EXPLOSION3D.add(new (eval(this.deathType))(this.moveState.pos.translate(DIR_UP, this.midHeight)));
        this.IAM.hero.incExp(exp, expType);
        AUDIO.MonsterDeath.volume = RAY.volume(this.distance);
        AUDIO.MonsterDeath.play();
    }
    applyDamage(damage, exp) {
        this.health -= damage;
        if (this.health <= 0) this.die('magic', exp);
    }
    damage(damage) {
        let exp = this.health;
        this.applyDamage(damage, exp);
    }
    hitByMissile(missile) {
        const damage = Math.max(missile.calcDamage(this.magic), 1);
        let exp = Math.min(this.health, damage);
        this.applyDamage(damage, exp);
        missile.explode(MISSILE3D);
    }
    shoot() {
        const dir = Vector3.from_2D_dir(this.moveState.lookDir);
        this.canShoot = false;
        this.caster = false;
        this.mana -= this.missile.calcMana(this.magic);
        let position = this.moveState.pos.translate(dir, this.r);
        position.set_y(0.5);
        const missile = new this.missile(position, dir, this.missileType, this.magic);
        MISSILE3D.add(missile);
        setTimeout(this.resetShooting.bind(this), INI.MONSTER_SHOOT_TIMEOUT);
    }
    resetShooting() {
        this.caster = true;
    }
    setGuardPosition(grid) {
        this.guardPosition = grid;
    }
    petrify() {
        if (this.fly) {
            const minY = this.model.meshes[0].primitives[0].positions.min[1] * this.scale[1];
            this.moveState.pos.set_y(minY);
            this.fly = 0;
        }
        this.moveSpeed = 0;
        this.canAttack = false;
        this.magic = 0;
        this.petrified = true;
        this.defense = 0;
        this.health = 1;
        this.inventory = null;
        this.xp = 1;
        this.changeTexture(TEXTURE.Marble);
        this.material = MATERIAL.marble;
    }
    changeTexture(texture) {
        const gl = WebGL.CTX;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        this.texture = texture;
        this.texture = WebGL.createTexture(this.texture);
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        if (this.dropped) return;
        this.IAM.map.storage.add(new IAM_Storage_item("ENTITY3D", this.id, "remove"));
    }
    remove() {
        this.IAM.remove(this.id);
    }
}

class $Movable_Interactive_entity extends $3D_Entity {
    constructor(grid, type, dir = UP) {
        super(grid, type, dir = UP);
        this.excludeFromInventory = false;
        this.interactive = true;
    }
    manage(lapsedTime, date) {
        if (this.moveState.moving) {
            if (this.IAM.hero.dead) {
                lapsedTime = IndexArrayManagers.DEAD_LAPSED_TIME;
            }
            GRID.translatePosition3D(this, lapsedTime);
            this.update(date);
            return;
        }

        if (!this.hasStack()) {
            this.dirStack = AI.wanderer(this);
        }
        this.makeMove();
    }
    interact(GA, inventory, click, hero) {
        this.storageLog();
        if (this.text) hero.speak(this.text);
        this.remove();
        return {
            category: this.category,
            inventorySprite: this.inventorySprite,
            name: this.name,
        };
    }
    storageLog() {
        if (!this.IAM.map.storage) return;
        if (this.dropped) return;
        this.IAM.map.storage.add(new IAM_Storage_item("DYNAMIC_ITEM3D", this.id, "remove"));
    }
    remove() {
        this.IAM.remove(this.id);
    }
}
/** model formats */

class $3D_Model {
    constructor(name, buffer, textures, meshes, samplers, skins, animations) {
        this.name = name;
        this.buffer = buffer;
        this.textures = textures;
        this.meshes = meshes;
        this.samplers = samplers;
        this.skins = skins;
        this.animations = animations;
    }
}

class $Mesh {
    constructor(name, primitives) {
        this.name = name;
        this.primitives = primitives;
    }
}

class $Primitive {
    constructor(material, indices, positions, normals, textcoord, joints, weights) {
        this.material = material;
        this.indices = indices;
        this.positions = positions;
        this.normals = normals;
        this.textcoord = textcoord;
        this.joints = joints;
        this.weights = weights;
    }
}
class $BufferData {
    constructor(data, count, type, target, min, max) {
        this.data = data;
        this.count = count;
        this.type = type;
        this.target = target;
        this.min = min;
        this.max = max;
    }
    initBuffer(gl) {
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl[this.target], this.buffer);
        gl.bufferData(gl[this.target], this.data, gl.DYNAMIC_DRAW);
    }
}

class $Armature {
    constructor(name, skinJoints, joint, jointMatrix) {
        this.name = name;
        this.skinJoints = skinJoints;
        this.joint = joint;
        this.jointMatrix = jointMatrix;
    }
}

class $Joint {
    constructor(name, nodeIndex, T, R, S, InverseBindMatrix, parent, jointIndex) {
        this.name = name;
        this.index = nodeIndex;
        this.children = [];
        this.T = T || new Array(3).fill(0.0);
        this.R = R || Array(0, 0, 0, 1);
        this.S = S || new Array(3).fill(1.0);
        this.InverseBindMatrix = InverseBindMatrix;
        this.parent = parent;
        this.jointIndex = jointIndex;
        this.createTRS_Matrix();
    }
    addChild(joint) {
        this.children.push(joint);
    }
    createTRS_Matrix() {
        const mat = glMatrix.mat4.create();
        glMatrix.mat4.fromRotationTranslationScale(mat, this.R, this.T, this.S);
        this.local_TRS = mat;
        this.global_TRS = glMatrix.mat4.create();
    }
}
class $Animation {
    constructor(name, nodes) {
        this.name = name;
        this.nodes = nodes;
    }
}

/** Utility functions */

const FaceToOffset = function (face, E = 0) {
    const offsets = {
        "FRONT": { x: 0.5, y: 1.0 + E },
        "BACK": { x: 0.5, y: 0.0 - E },
        "LEFT": { x: 0.0 - E, y: 0.5 },
        "RIGHT": { x: 1.0 + E, y: 0.5 }
    };
    const offset = offsets[face];
    if (!offset) {
        console.error("FaceToOffset, invalid face", face);
        return null;
    }
    return new FP_Grid(offset.x, offset.y);
};

const FaceToDirection = function (face) {
    switch (face) {
        case "FRONT": return DOWN;
        case "BACK": return UP;
        case "LEFT": return LEFT;
        case "RIGHT": return RIGHT;
        default: console.error("FaceToDirection, invalid face", face);
    }
};

const DirectionToFace = function (dir) {
    if (GRID.same(dir, DOWN)) {
        return "FRONT";
    } else if (GRID.same(dir, UP)) {
        return "BACK";
    } else if (GRID.same(dir, LEFT)) {
        return "LEFT";
    } else if (GRID.same(dir, RIGHT)) {
        return "RIGHT";
    } else if (GRID.same(dir, NOWAY)) {
        return "TOP";
    } else {
        console.error("DirectionToFace, invalid direction", dir);
    }
};

/** Elements */

const ELEMENT = {
    getMinY(element) {
        let minY = Infinity;
        for (let i = 0; i < element.positions.length; i += 3) {
            if (element.positions[i + 1] < minY) {
                minY = element.positions[i + 1];
            }
        }
        return minY;
    },
    getExtremity(element, dim, type) {
        let offset = null;
        let sign = null;
        switch (dim) {
            case "x":
                offset = 0;
                break;
            case "y":
                offset = 1;
                break;
            case "z":
                offset = 2;
                break;
            default:
                throw new Error(`Wrong dimension ${dim}. x, y,z allowed.`);
        }
        switch (type) {
            case "min":
                sign = 1;
                break;
            case "max":
                sign = -1;
                break;
            default:
                throw new Error(`Wrong type ${type}. min, max allowed.`);
        }
        let extremity = sign * Infinity;
        for (let i = 0; i < element.positions.length; i += 3) {
            if (element.positions[i + offset] * sign < extremity) {
                extremity = element.positions[i + offset];
            }
        }
        return extremity;
    },
    getBoundingBox(element) {
        const max = Array(-Infinity, -Infinity, -Infinity);
        const min = Array(Infinity, Infinity, Infinity);
        for (let i = 0; i < element.positions.length; i += 3) {
            for (let j = 0; j < 3; j++) {
                if (element.positions[i + j] < min[j]) {
                    min[j] = element.positions[i + j];
                }
                if (element.positions[i + j] > max[j]) {
                    max[j] = element.positions[i + j];
                }
            }
        }
        return new BoundingBox(max, min);
    },
    getSurfaceProjection(element, scale) {
        if (!element.boundingBox) element.boundingBox = this.getBoundingBox(element);
        const BB = element.boundingBox;
        const W = (BB.max.x - BB.min.x) * scale;
        const H = (BB.max.z - BB.min.z) * scale;
        return { W: W, H: H };
    },
    FRONT_FACE: {
        positions: [0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]
    },
    BACK_FACE: {
        positions: [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,],
        vertexNormals: [0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0]
    },
    RIGHT_FACE: {
        positions: [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0],
        vertexNormals: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0]
    },
    LEFT_FACE: {
        positions: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [-1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0],
    },
    TOP_FACE: {
        positions: [0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0],
        indices: [0, 2, 1, 0, 3, 2],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0],
    },
    BOTTOM_FACE: {
        positions: [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0]
    },
    CUBE: {
        positions: [
            // Front face
            0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
            // Back face
            0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
            // Top face
            0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Bottom face
            0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Right face
            1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
            // Left face
            0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0,
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23, // left
        ],
        textureCoordinates: [
            // Front
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Back
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Top
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Bottom
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Right
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        ],
        vertexNormals: [
            // Front
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        ],
    },
    CUBE_SM: {
        positions: [
            // Front face
            0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
            // Back face
            0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
            // Top face
            0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Bottom face
            0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Right face
            1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
            // Left face
            0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0,
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23, // left
        ],
        textureCoordinates: [
            // Front
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Back
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Top
            0.0, 0.0, 0.05, 0.0, 0.05, 0.05, 0.0, 0.05,
            // Bottom
            0.0, 0.0, 0.05, 0.0, 0.5, 0.05, 0.0, 0.05,
            // Right
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        ],
        vertexNormals: [
            // Front
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        ],
    },
    CUBE_CENTERED: {
        positions: [
            // Front face
            -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

            // Back face
            -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

            // Top face
            -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

            // Right face
            1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

            // Left face
            -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23, // left
        ],
        textureCoordinates: [
            // Front
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Back
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Top
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Bottom
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Right
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        ],
        vertexNormals: [
            // Front
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        ],
    },
    BAR: {
        positions: [
            // Front face
            -1.0, -0.5, 0.5, 1.0, -0.5, 0.5, 0.8, 0.5, 0.4, -0.8, 0.5, 0.4,

            // Back face
            -1.0, -0.5, -0.5, -0.8, 0.5, -0.4, 0.8, 0.5, -0.4, 1.0, -0.5, -0.5,

            // Top face
            -0.8, 0.5, -0.4, -0.8, 0.5, 0.4, 0.8, 0.5, 0.4, 0.8, 0.5, -0.4,

            // Bottom face
            -1.0, -0.5, -0.5, 1.0, -0.5, -0.5, 1.0, -0.5, 0.5, -1.0, -0.5, 0.5,

            // Right face
            1.0, -0.5, -0.5, 0.8, 0.5, -0.4, 0.8, 0.5, 0.4, 1.0, -0.5, 0.5,

            // Left face
            -1.0, -0.5, -0.5, -1.0, -0.5, 0.5, -0.8, 0.5, 0.4, -0.8, 0.5, -0.4,
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23, // left
        ],
        textureCoordinates: [
            // Front
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Back
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Top
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Bottom
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Right
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        ],
        vertexNormals: [
            // Front
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        ],
    },
};

const UNIFORM = {
    spherical_locations: null,
    spherical_directions: null,
    i_jointMat: null,
    INI: {
        MAX_N_PARTICLES: 50000,
        SPHERE_R: 0.20,
        MIN_VELOCITY_FACTOR: 0.01,
        MAX_VELOCITY_FACTOR: 0.6,
        MAX_JOINTS: 256,                //compare to model vShader
    },
    setup() {
        this.spherical_distributed(this.INI.MAX_N_PARTICLES, this.INI.SPHERE_R);
        if (WebGL.VERBOSE) console.log(`%cUNIFORM created ${this.INI.MAX_N_PARTICLES} spherical particles.`, WebGL.CSS);
    },
    spherical_distributed(N, R) {
        console.time("particles");
        this.spherical_directions = new Float32Array(N * 3);
        this.spherical_locations = new Float32Array(N * 3);

        for (let c = 0; c < N; c++) {
            let vector = glMatrix.vec3.create();
            for (let v = 0; v < 3; v++) {
                let coord = RNDF(-1, 1);
                vector[v] = coord;
            }
            glMatrix.vec3.normalize(vector, vector);
            let velocity = glMatrix.vec3.create();
            glMatrix.vec3.scale(velocity, vector, RNDF(this.INI.MIN_VELOCITY_FACTOR, this.INI.MAX_VELOCITY_FACTOR));
            let location = glMatrix.vec3.create();
            glMatrix.vec3.scale(location, vector, RNDF(0.001, R));
            let idx = c * 3;
            this.spherical_directions[idx] = velocity[0];
            this.spherical_directions[idx + 1] = velocity[1];
            this.spherical_directions[idx + 2] = velocity[2];
            this.spherical_locations[idx] = location[0];
            this.spherical_locations[idx + 1] = location[1];
            this.spherical_locations[idx + 2] = location[2];
        }
        console.timeEnd("particles");
    },
};

/** gltf to gl */
const GLTF_GL_MAP = {
    magFilter: "TEXTURE_MAG_FILTER",
    minFilter: "TEXTURE_MIN_FILTER"
};

/** GL constants */
const GL_DATA_LENGTH = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,
};

const GL_CONSTANT = {
    0: 'NONE',
    1: 'ONE',
    2: 'LINE_LOOP',
    3: 'LINE_STRIP',
    4: 'TRIANGLES',
    5: 'TRIANGLE_STRIP',
    6: 'TRIANGLE_FAN',
    256: 'DEPTH_BUFFER_BIT',
    512: 'NEVER',
    513: 'LESS',
    514: 'EQUAL',
    515: 'LEQUAL',
    516: 'GREATER',
    517: 'NOTEQUAL',
    518: 'GEQUAL',
    519: 'ALWAYS',
    768: 'SRC_COLOR',
    769: 'ONE_MINUS_SRC_COLOR',
    770: 'SRC_ALPHA',
    771: 'ONE_MINUS_SRC_ALPHA',
    772: 'DST_ALPHA',
    773: 'ONE_MINUS_DST_ALPHA',
    774: 'DST_COLOR',
    775: 'ONE_MINUS_DST_COLOR',
    776: 'SRC_ALPHA_SATURATE',
    1024: 'STENCIL_BUFFER_BIT',
    1028: 'FRONT',
    1029: 'BACK',
    1032: 'FRONT_AND_BACK',
    1280: 'INVALID_ENUM',
    1281: 'INVALID_VALUE',
    1282: 'INVALID_OPERATION',
    1285: 'OUT_OF_MEMORY',
    1286: 'INVALID_FRAMEBUFFER_OPERATION',
    2304: 'CW',
    2305: 'CCW',
    2849: 'LINE_WIDTH',
    2884: 'CULL_FACE',
    2885: 'CULL_FACE_MODE',
    2886: 'FRONT_FACE',
    2928: 'DEPTH_RANGE',
    2929: 'DEPTH_TEST',
    2930: 'DEPTH_WRITEMASK',
    2931: 'DEPTH_CLEAR_VALUE',
    2932: 'DEPTH_FUNC',
    2960: 'STENCIL_TEST',
    2961: 'STENCIL_CLEAR_VALUE',
    2962: 'STENCIL_FUNC',
    2963: 'STENCIL_VALUE_MASK',
    2964: 'STENCIL_FAIL',
    2965: 'STENCIL_PASS_DEPTH_FAIL',
    2966: 'STENCIL_PASS_DEPTH_PASS',
    2967: 'STENCIL_REF',
    2968: 'STENCIL_WRITEMASK',
    2978: 'VIEWPORT',
    3024: 'DITHER',
    3042: 'BLEND',
    3088: 'SCISSOR_BOX',
    3089: 'SCISSOR_TEST',
    3106: 'COLOR_CLEAR_VALUE',
    3107: 'COLOR_WRITEMASK',
    3317: 'UNPACK_ALIGNMENT',
    3333: 'PACK_ALIGNMENT',
    3379: 'MAX_TEXTURE_SIZE',
    3386: 'MAX_VIEWPORT_DIMS',
    3408: 'SUBPIXEL_BITS',
    3410: 'RED_BITS',
    3411: 'GREEN_BITS',
    3412: 'BLUE_BITS',
    3413: 'ALPHA_BITS',
    3414: 'DEPTH_BITS',
    3415: 'STENCIL_BITS',
    3553: 'TEXTURE_2D',
    4352: 'DONT_CARE',
    4353: 'FASTEST',
    4354: 'NICEST',
    5120: 'BYTE',
    5121: 'UNSIGNED_BYTE',
    5122: 'SHORT',
    5123: 'UNSIGNED_SHORT',
    5124: 'INT',
    5125: 'UNSIGNED_INT',
    5126: 'FLOAT',
    5386: 'INVERT',
    5890: 'TEXTURE',
    6401: 'STENCIL_INDEX',
    6402: 'DEPTH_COMPONENT',
    6406: 'ALPHA',
    6407: 'RGB',
    6408: 'RGBA',
    6409: 'LUMINANCE',
    6410: 'LUMINANCE_ALPHA',
    7680: 'KEEP',
    7681: 'REPLACE',
    7682: 'INCR',
    7683: 'DECR',
    7936: 'VENDOR',
    7937: 'RENDERER',
    7938: 'VERSION',
    9728: 'NEAREST',
    9729: 'LINEAR',
    9984: 'NEAREST_MIPMAP_NEAREST',
    9985: 'LINEAR_MIPMAP_NEAREST',
    9986: 'NEAREST_MIPMAP_LINEAR',
    9987: 'LINEAR_MIPMAP_LINEAR',
    10240: 'TEXTURE_MAG_FILTER',
    10241: 'TEXTURE_MIN_FILTER',
    10242: 'TEXTURE_WRAP_S',
    10243: 'TEXTURE_WRAP_T',
    10497: 'REPEAT',
    10752: 'POLYGON_OFFSET_UNITS',
    16384: 'COLOR_BUFFER_BIT',
    32769: 'CONSTANT_COLOR',
    32770: 'ONE_MINUS_CONSTANT_COLOR',
    32771: 'CONSTANT_ALPHA',
    32772: 'ONE_MINUS_CONSTANT_ALPHA',
    32773: 'BLEND_COLOR',
    32774: 'FUNC_ADD',
    32777: 'BLEND_EQUATION_RGB',
    32778: 'FUNC_SUBTRACT',
    32779: 'FUNC_REVERSE_SUBTRACT',
    32819: 'UNSIGNED_SHORT_4_4_4_4',
    32820: 'UNSIGNED_SHORT_5_5_5_1',
    32823: 'POLYGON_OFFSET_FILL',
    32824: 'POLYGON_OFFSET_FACTOR',
    32854: 'RGBA4',
    32855: 'RGB5_A1',
    32873: 'TEXTURE_BINDING_2D',
    32926: 'SAMPLE_ALPHA_TO_COVERAGE',
    32928: 'SAMPLE_COVERAGE',
    32936: 'SAMPLE_BUFFERS',
    32937: 'SAMPLES',
    32938: 'SAMPLE_COVERAGE_VALUE',
    32939: 'SAMPLE_COVERAGE_INVERT',
    32968: 'BLEND_DST_RGB',
    32969: 'BLEND_SRC_RGB',
    32970: 'BLEND_DST_ALPHA',
    32971: 'BLEND_SRC_ALPHA',
    33071: 'CLAMP_TO_EDGE',
    33170: 'GENERATE_MIPMAP_HINT',
    33189: 'DEPTH_COMPONENT16',
    33306: 'DEPTH_STENCIL_ATTACHMENT',
    33635: 'UNSIGNED_SHORT_5_6_5',
    33648: 'MIRRORED_REPEAT',
    33901: 'ALIASED_POINT_SIZE_RANGE',
    33902: 'ALIASED_LINE_WIDTH_RANGE',
    33984: 'TEXTURE0',
    33985: 'TEXTURE1',
    33986: 'TEXTURE2',
    33987: 'TEXTURE3',
    33988: 'TEXTURE4',
    33989: 'TEXTURE5',
    33990: 'TEXTURE6',
    33991: 'TEXTURE7',
    33992: 'TEXTURE8',
    33993: 'TEXTURE9',
    33994: 'TEXTURE10',
    33995: 'TEXTURE11',
    33996: 'TEXTURE12',
    33997: 'TEXTURE13',
    33998: 'TEXTURE14',
    33999: 'TEXTURE15',
    34000: 'TEXTURE16',
    34001: 'TEXTURE17',
    34002: 'TEXTURE18',
    34003: 'TEXTURE19',
    34004: 'TEXTURE20',
    34005: 'TEXTURE21',
    34006: 'TEXTURE22',
    34007: 'TEXTURE23',
    34008: 'TEXTURE24',
    34009: 'TEXTURE25',
    34010: 'TEXTURE26',
    34011: 'TEXTURE27',
    34012: 'TEXTURE28',
    34013: 'TEXTURE29',
    34014: 'TEXTURE30',
    34015: 'TEXTURE31',
    34016: 'ACTIVE_TEXTURE',
    34024: 'MAX_RENDERBUFFER_SIZE',
    34041: 'DEPTH_STENCIL',
    34055: 'INCR_WRAP',
    34056: 'DECR_WRAP',
    34067: 'TEXTURE_CUBE_MAP',
    34068: 'TEXTURE_BINDING_CUBE_MAP',
    34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
    34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
    34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
    34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
    34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
    34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
    34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
    34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
    34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
    34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
    34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
    34342: 'CURRENT_VERTEX_ATTRIB',
    34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
    34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
    34467: 'COMPRESSED_TEXTURE_FORMATS',
    34660: 'BUFFER_SIZE',
    34661: 'BUFFER_USAGE',
    34816: 'STENCIL_BACK_FUNC',
    34817: 'STENCIL_BACK_FAIL',
    34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
    34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
    34877: 'BLEND_EQUATION_ALPHA',
    34921: 'MAX_VERTEX_ATTRIBS',
    34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
    34930: 'MAX_TEXTURE_IMAGE_UNITS',
    34962: 'ARRAY_BUFFER',
    34963: 'ELEMENT_ARRAY_BUFFER',
    34964: 'ARRAY_BUFFER_BINDING',
    34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
    34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
    35040: 'STREAM_DRAW',
    35044: 'STATIC_DRAW',
    35048: 'DYNAMIC_DRAW',
    35632: 'FRAGMENT_SHADER',
    35633: 'VERTEX_SHADER',
    35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
    35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
    35663: 'SHADER_TYPE',
    35664: 'FLOAT_VEC2',
    35665: 'FLOAT_VEC3',
    35666: 'FLOAT_VEC4',
    35667: 'INT_VEC2',
    35668: 'INT_VEC3',
    35669: 'INT_VEC4',
    35670: 'BOOL',
    35671: 'BOOL_VEC2',
    35672: 'BOOL_VEC3',
    35673: 'BOOL_VEC4',
    35674: 'FLOAT_MAT2',
    35675: 'FLOAT_MAT3',
    35676: 'FLOAT_MAT4',
    35678: 'SAMPLER_2D',
    35680: 'SAMPLER_CUBE',
    35712: 'DELETE_STATUS',
    35713: 'COMPILE_STATUS',
    35714: 'LINK_STATUS',
    35715: 'VALIDATE_STATUS',
    35716: 'INFO_LOG_LENGTH',
    35717: 'ATTACHED_SHADERS',
    35718: 'ACTIVE_UNIFORMS',
    35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
    35720: 'SHADER_SOURCE_LENGTH',
    35721: 'ACTIVE_ATTRIBUTES',
    35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
    35724: 'SHADING_LANGUAGE_VERSION',
    35725: 'CURRENT_PROGRAM',
    36003: 'STENCIL_BACK_REF',
    36004: 'STENCIL_BACK_VALUE_MASK',
    36005: 'STENCIL_BACK_WRITEMASK',
    36006: 'FRAMEBUFFER_BINDING',
    36007: 'RENDERBUFFER_BINDING',
    36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
    36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
    36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
    36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
    36053: 'FRAMEBUFFER_COMPLETE',
    36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
    36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
    36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
    36061: 'FRAMEBUFFER_UNSUPPORTED',
    36064: 'COLOR_ATTACHMENT0',
    36096: 'DEPTH_ATTACHMENT',
    36128: 'STENCIL_ATTACHMENT',
    36160: 'FRAMEBUFFER',
    36161: 'RENDERBUFFER',
    36162: 'RENDERBUFFER_WIDTH',
    36163: 'RENDERBUFFER_HEIGHT',
    36164: 'RENDERBUFFER_INTERNAL_FORMAT',
    36168: 'STENCIL_INDEX8',
    36176: 'RENDERBUFFER_RED_SIZE',
    36177: 'RENDERBUFFER_GREEN_SIZE',
    36178: 'RENDERBUFFER_BLUE_SIZE',
    36179: 'RENDERBUFFER_ALPHA_SIZE',
    36180: 'RENDERBUFFER_DEPTH_SIZE',
    36181: 'RENDERBUFFER_STENCIL_SIZE',
    36194: 'RGB565',
    36336: 'LOW_FLOAT',
    36337: 'MEDIUM_FLOAT',
    36338: 'HIGH_FLOAT',
    36339: 'LOW_INT',
    36340: 'MEDIUM_INT',
    36341: 'HIGH_INT',
    36346: 'SHADER_COMPILER',
    36347: 'MAX_VERTEX_UNIFORM_VECTORS',
    36348: 'MAX_VARYING_VECTORS',
    36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
    37440: 'UNPACK_FLIP_Y_WEBGL',
    37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
    37442: 'CONTEXT_LOST_WEBGL',
    37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
    37444: 'BROWSER_DEFAULT_WEBGL'
};

//END
console.log(`%cWebGL ${WebGL.VERSION} loaded.`, WebGL.CSS);