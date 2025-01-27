"use client";

import { useThree } from "@react-three/fiber";
import React from "react";
import { vertexChunk1, vertexChunk2 } from "../Shaders/vertex";
import { fragmentChunk1, fragmentChunk2 } from "../Shaders/fragment";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function Plane() {
    const { viewport } = useThree();

    const noiseTexture = useTexture("./fabric_texture.webp", (texture) => {
        console.log("Texture:", texture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(100, 100);
        texture.anisotropy = 16;
        texture.needsUpdate = true;
    });
    return (
        <mesh position={[0, 0, 60]} receiveShadow castShadow>
            <planeGeometry
                args={[viewport.width * 40, viewport.height * 40]}
            ></planeGeometry>
            <meshBasicMaterial
                color={"#A61416"}
                onBeforeCompile={(shader) => {
                    // shader.vertexShader = vertexChunk1 + shader.vertexShader;
                    // shader.vertexShader = shader.vertexShader.replace(
                    //     "#include <project_vertex>",
                    //     vertexChunk2,
                    // );
                    // shader.fragmentShader =
                    //     fragmentChunk1 + shader.fragmentShader;
                    // shader.fragmentShader = shader.fragmentShader.replace(
                    //     `#include <opaque_fragment>`, // 修改不透明材质的输出
                    //     fragmentChunk2,
                    // );
                }}
            >
                {/* <meshStandardMaterial>
                    <gradientTexture
                        colors={["#8B0000", "#5A1A1A"]} // 渐变颜色
                        attach="map"
                    />
                </meshStandardMaterial> */}
            </meshBasicMaterial>
        </mesh>
    );
}

export default Plane;
