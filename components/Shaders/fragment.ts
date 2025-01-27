export const fragmentChunk1 = /*glsl*/ `
    varying vec2 v_Uv;
    varying vec3 v_Normal;

    uniform vec3 u_BodyColor;
    uniform vec3 u_LineColor;

`;

export const fragmentChunk2 = /*glsl*/ `
    #include <opaque_fragment>

       // 从法线贴图采样法线
                vec3 normalTex = texture2D(normalMap, v_Uv).rgb * 2.0 - 1.0;

                // 增强法线强度
                vec3 enhancedNormal = normalize(normalTex * 2.0);

                // 计算凸凹面强度 (法线的 Z 分量)
                float intensity = enhancedNormal.z;

    // 插值凸面和凹面颜色
    vec3 finalColor = mix(u_BodyColor, u_LineColor, smoothstep(0.0, -0.2, intensity));

    gl_FragColor = vec4(finalColor / outgoingLight, 1.0);
`;
