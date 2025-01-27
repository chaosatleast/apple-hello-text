export const vertexChunk1 = /*glsl*/ `
    varying vec2 v_Uv;
    varying vec3 v_Normal;

`;

export const vertexChunk2 = /*glsl*/ `
    #include <project_vertex>

    v_Uv = uv;
    v_Normal = normalize(normalMatrix * normal);

`;
