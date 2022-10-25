uniform sampler2D Texture;

varying vec2 vertexUV; 
varying vec3 vertexNormal; 
uniform vec3 color;
vec3 lightColor = vec3(1.0, 1.0, 1.0);
uniform vec3 lightDirection;
void main() {
    float intentsity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 0.0)); 
    float nDotL = clamp(dot(lightDirection, vertexNormal), 0.0, 1.0);
    vec3 atmosphere = vec3(0.7, 0.7, 0.7) * pow(intentsity, 0.1);
    vec3 diffuseColor = lightColor * nDotL;
    gl_FragColor = vec4(diffuseColor / atmosphere * texture2D(Texture, vertexUV).xyz, 1.0);
}