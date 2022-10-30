uniform sampler2D Texture;

varying vec2 vertexUV; 
varying vec3 vertexNormal; 

void main() {
    float intentsity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)); 
    vec3 atmosphere = vec3(0.52,0.68,0.863) * pow(intentsity, 1.3);
    csm_DiffuseColor = vec4(atmosphere + texture2D(Texture, vertexUV).xyz, 1.0);
}