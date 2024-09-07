#pragma glslify: simplexNoise4d = require(../includes/simplexNoise4d)

varying vec3 vNormal;

void main() {
    vec3 updatedPosition = position;
    updatedPosition.x = simplexNoise4d(vec4(1.0));
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}