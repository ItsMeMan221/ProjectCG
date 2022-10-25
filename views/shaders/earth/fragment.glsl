uniform sampler2D Texture;

varying vec2 vertexUV; 
varying vec3 vertexNormal; 

void main() {
    float intentsity = 1.07 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)); 
    vec3 atmosphere = vec3(1.0, 0.0, 0.0) * pow(intentsity, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(Texture, vertexUV).xyz, 1.0);
}