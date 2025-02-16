export const fragmentChunk1 = /*glsl*/ `
    varying vec2 v_Uv;
    varying vec3 v_Normal;
    varying vec3 v_Position;
    varying float v_Progress;
    uniform float totalCurveLength;
    uniform float currentCurveLength;

    struct ColorStop {
        float position;
        vec3 color;
    };
    
    vec3 ColorRamp(ColorStop[6] colors, float factor){

        int index = 0;
        for(int i = 0; i < colors.length() ; i++) {
            ColorStop currentColor = colors[i];
            ColorStop nextColor = colors[i + 1];

            bool isInBetween = factor >= currentColor.position && factor < nextColor.position;
            
            index = isInBetween ? i : index;
        }

        ColorStop currentColor = colors[index];
        ColorStop nextColor = colors[index + 1];

        float range = nextColor.position - currentColor.position;
        float lerpFactor = (factor - currentColor.position) / range;
        
        return mix(currentColor.color, nextColor.color, lerpFactor);
    }

`;

export const fragmentChunk2 = /*glsl*/ `
    #include <opaque_fragment>

    ColorStop[6] colors = ColorStop[6](
        ColorStop(0.0, vec3(0.011, 0.478, 0.572)),  // Teal (#037A92)
        ColorStop(0.25, vec3(0.675, 0.820, 0.369)),  // Green (#ACD15E)
        ColorStop(0.35, vec3(0.980, 0.835, 0.000)),  // Yellow (#FAD500)
        ColorStop(0.6, vec3(0.956, 0.325, 0.262)),  // Red (#F45343)
        ColorStop(0.8, vec3(0.569, 0.454, 0.710)),  // Purple (#9174B5)
        ColorStop(1.01, vec3(0.290, 0.478, 0.804))   // Blue (#6C9DE2)
    );


    float progressFactor = currentCurveLength / totalCurveLength;
    
    float progress = clamp((v_Uv.x) * progressFactor, 0.0, 1.0);

    vec3 finalColor = ColorRamp(colors,progress);

    gl_FragColor = vec4( pow( finalColor, vec3(2.5))  / outgoingLight, 1.0);
`;
