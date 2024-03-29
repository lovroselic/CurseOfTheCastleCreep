///model_vShader///
/*
* v1.0
*/
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const int MAX_JOINTS = 256;

attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
attribute vec4 aJoint;
attribute vec4 aWeight;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uScale;
uniform mat4 uTranslate;
uniform mat4 uRotateY;
uniform mat4 u_jointMat[MAX_JOINTS];

varying vec2 vTextureCoord;
varying vec3 FragPos;
varying vec3 v_normal;

void main(void) {
    mat4 skinMat = aWeight.x * u_jointMat[int(aJoint.x)] +
        aWeight.y * u_jointMat[int(aJoint.y)] +
        aWeight.z * u_jointMat[int(aJoint.z)] +
        aWeight.w * u_jointMat[int(aJoint.w)];

    vec4 position = skinMat * aVertexPosition;
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uRotateY * uScale * position;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(position); 
    v_normal = vec3(skinMat * vec4(aVertexNormal, 0.0));   
    vec4 transformedNormal = uRotateY * vec4(v_normal, 0.0); 
    v_normal = transformedNormal.xyz;
}