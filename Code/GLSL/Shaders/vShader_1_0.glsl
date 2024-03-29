///vShader///
/*
* v1.0
*/
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uScale;
uniform mat4 uTranslate;
uniform mat4 uRotateY;

varying vec2 vTextureCoord;
varying vec3 FragPos;
varying vec3 v_normal;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uRotateY * uScale * aVertexPosition;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(aVertexPosition);
    vec4 transformedNormal = uRotateY * vec4(aVertexNormal, 0.0);
    v_normal = transformedNormal.xyz;
}