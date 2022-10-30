uniform sampler2D Texture;

varying vec2 vertexUV; 
varying vec3 vertexNormal; 

void main() {
    float intentsity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)); 
    vec3 atmosphere = vec3(0.84,0.79,0.615) * pow(intentsity, 1.3);
    csm_DiffuseColor = vec4(atmosphere + texture2D(Texture, vertexUV).xyz, 1.0);
}