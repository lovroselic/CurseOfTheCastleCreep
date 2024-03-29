#version 300 es
///particle_render_fShader///
/*
* v1.0
*/

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uSampler;
uniform int uRounded;

in vec2 v_uv;
in float v_age;

out vec4 outColor;

float random(float seed);

void main(void) {
    float a = 1.0;

    if(uRounded == 1) {
        vec2 delta = v_uv - vec2(0.5, 0.5);
        float lenSqr = abs(dot(delta, delta));
        a = smoothstep(0.25, 0.23, lenSqr);
    }

    a -= v_age * v_age;
    if(a < 0.1) {
        discard;
    }

    float r = random(v_age);
    float F = 4.0;
    float L = max(r * (1.0 / F), 0.0); // 0.25
    float H = min((r / F) + (1.0 - 1.0 / F), 1.0); // 0.25 + 0.75
    vec2 texture_uv = vec2((1.0 - v_uv.x) * L + v_uv.x * H, (1.0 - v_uv.y) * L + v_uv.y * H);

    vec4 texelColor = texture(uSampler, texture_uv);
    outColor = vec4(texelColor.rgb, a);
}

float random(float seed) {
    vec2 st = gl_FragCoord.xy * seed;
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(st.xy, vec2(a, b));
    float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}