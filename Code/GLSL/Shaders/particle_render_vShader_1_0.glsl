#version 300 es
///particle_render_vShader///
/*
* v1.0
*/

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

//uniform float u_time;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uExpCenter;
uniform float uScale;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec2 a_uv;
layout(location = 2) in vec3 a_offset;
layout(location = 3) in float a_ageNorm;

out vec2 v_uv;
out float v_age;

void main(void) {
    v_uv = a_uv;
    v_age = a_ageNorm;
    float ageScale = 1.0 - v_age * v_age;

    vec3 billboardedPosition = a_position;
    vec3 right = vec3(uModelViewMatrix[0][0], uModelViewMatrix[1][0], uModelViewMatrix[2][0]);
    vec3 up = vec3(uModelViewMatrix[0][1], uModelViewMatrix[1][1], uModelViewMatrix[2][1]);
    billboardedPosition = vec3(0, 0, 0) + (right * billboardedPosition.x) + (up * billboardedPosition.y);
    vec4 quadPosition = vec4((billboardedPosition * ageScale * uScale) + a_offset + uExpCenter, 1);
    gl_Position = uProjectionMatrix * uModelViewMatrix * quadPosition;
}