#version 300 es
///particle_transform_vShader///
/*
* v1.0
*/

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_time;
uniform float uVelocityFactor;
uniform vec3 uGravity;

layout(location = 0) in vec3 a_offset;
layout(location = 1) in vec3 a_velocity;
layout(location = 2) in float a_age;
layout(location = 3) in float a_ageNorm;
layout(location = 4) in float a_life;

out vec3 o_offset;
out vec3 o_velocity;
out float o_age;
out float o_ageNorm;

void main(void) {
    float age = u_time - a_age;
    o_velocity = a_velocity - uGravity;
    o_offset = a_offset + uVelocityFactor * o_velocity;
    o_age = a_age;
    o_ageNorm = age / a_life;
}