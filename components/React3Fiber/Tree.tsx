"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import { ThemeContext } from "../LayoutWrapper";
import Plane from "./Plane";
import Snake from "./Snake";

function Tree() {
    const { theme } = useContext(ThemeContext);

    const radius = theme === "dark" ? 0.1 : 0;
    const threshold = theme === "dark" ? 1 : 0;

    return (
        <>
            <Canvas gl={{ antialias: true, alpha: true }} id="three-canvas">
                <Snake />
                <Plane />

                {/* <EffectComposer enableNormalPass={false}>
                    <Bloom
                        luminanceThreshold={0}
                        mipmapBlur
                        radius={0}
                        intensity={1.5}
                    />
                </EffectComposer> */}
            </Canvas>
        </>
    );
}

export default Tree;
