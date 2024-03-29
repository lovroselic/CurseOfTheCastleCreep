///fShader///
/*
* v1.0
*/
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

struct Material {
    vec3 ambientColor;
    vec3 diffuseColor;
    vec3 specularColor;
    float shininess;
};

const int N_LIGHTS = 1;                                     //replaced before compiling
float illumination;
uniform vec3 uPointLights[N_LIGHTS];
uniform vec3 uLightColors[N_LIGHTS];
uniform vec3 uLightDirections[N_LIGHTS];
uniform sampler2D uSampler;
uniform vec3 uCameraPos;
uniform Material uMaterial;

varying vec3 FragPos;
varying vec3 v_normal;
varying vec2 vTextureCoord;

//bloody hardcoded constants
const vec3 innerLightColor = vec3(0.9, 0.9, 0.81);
const float innerAmbientStrength = 0.225;
const float innerDiffuseStrength = 2.1;
const float innerSpecularStrength = 1.0;

const float PL_AmbientStrength = 2.0;
const float PL_DiffuseStrength = 5.0;
const float PL_SpecularStrength = 6.5;

vec3 CalcLight(vec3 lightPosition, vec3 FragPos, vec3 viewDir, vec3 normal, vec3 pointLightColor, float shininess, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor, float ambientStrength, float diffuseStrength, float specularStrength, int inner, vec3 lightDirection);

void main(void) {
    vec3 ambientColor = uMaterial.ambientColor;
    vec3 diffuseColor = uMaterial.diffuseColor;
    vec3 specularColor = uMaterial.specularColor;
    float shininess = uMaterial.shininess;
    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(uCameraPos - FragPos);

    vec3 innerLight = CalcLight(uCameraPos, FragPos, viewDir, norm, innerLightColor, shininess, ambientColor, diffuseColor, specularColor, innerAmbientStrength, innerDiffuseStrength, innerSpecularStrength, 1, viewDir);
    vec3 PL_output = vec3(0.0);

    for (int i = 0; i < N_LIGHTS; i++) {
        if (uPointLights[i].x < 0.0) {
            continue;
        }
        PL_output += CalcLight(uPointLights[i], FragPos, viewDir, norm, uLightColors[i], shininess, ambientColor, diffuseColor, specularColor, PL_AmbientStrength, PL_DiffuseStrength, PL_SpecularStrength, 0, uLightDirections[i]);
    }

    vec3 light = innerLight + PL_output;
    vec4 texelColor = texture2D(uSampler, vTextureCoord);
    if (texelColor.a < 0.4) {
        discard;
    }

    gl_FragColor = vec4(texelColor.rgb * light, texelColor.a);
}

vec3 CalcLight(vec3 lightPosition, vec3 FragPos, vec3 viewDir, vec3 normal, vec3 pointLightColor, float shininess, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor, float ambientStrength, float diffuseStrength, float specularStrength, int inner, vec3 lightDirection) {
    float distance = distance(lightPosition, FragPos);
    vec3 lightDir = normalize(lightPosition - FragPos);
    float attenuation = 1.0 / (1.0 + 0.1 * distance + 0.65 * (distance * distance));

    //is fragment illuminated by ligh source? omni dir is (255,255,255)
    if (inner == 0) {
        if (lightDirection.x < 2.0) {
        // considers only directional lights
        //lightDirection points away from light source, so it needs to be reversed
            illumination = dot(lightDir, normalize(-lightDirection));
        }
    } else {
        illumination = 1.0;
    }

    //ambient
    vec3 ambientLight = vec3(0.0);
    if (inner == 1) {
        ambientLight = pointLightColor * ambientStrength * ambientColor;
    } else {
        ambientLight = pointLightColor * ambientStrength * attenuation * ambientColor;
    }

    //diffuse
    float diffLight = max(dot(normal, lightDir), 0.0);
    float diffView = max(dot(normal, viewDir), 0.0);
    float diff = 0.9 * diffLight + 0.1 * diffView;
    vec3 diffuselight = pointLightColor * diff * diffuseStrength * attenuation * diffuseColor;

    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specularLight = pointLightColor * spec * specularStrength * attenuation * specularColor;

    ambientLight = clamp(ambientLight, 0.0, 1.0);
    diffuselight = clamp(diffuselight, 0.0, 1.0);
    specularLight = clamp(specularLight, 0.0, 1.0);

    if (illumination <= 0.0) {
        diffuselight = vec3(0.0, 0.0, 0.0);
    }

    return ambientLight + diffuselight + specularLight;
}