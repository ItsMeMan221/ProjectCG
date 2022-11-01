uniform sampler2D Texture;
uniform vec3 instColor;
varying vec2 vertexUV; 
varying vec3 vertexNormal; 

void main() {
    float intentsity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)); 
    vec3 atmosphere = instColor * pow(intentsity, 1.5);
    csm_DiffuseColor = vec4(atmosphere + texture2D(Texture, vertexUV).xyz, 1.0);
}