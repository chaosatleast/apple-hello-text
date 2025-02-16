export const vertexChunk1 = /*glsl*/ `
    varying vec2 v_Uv;
    varying vec3 v_Normal;
    varying vec3 v_Position;
    varying float v_Progress;
`;

export const vertexChunk2 = /*glsl*/ `
    #include <uv_vertex>

    v_Uv = uv;
`;

export const vertexChunk3 = /*glsl*/ `
    #include <begin_vertex>

    v_Position = transformed;

`;
