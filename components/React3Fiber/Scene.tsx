"use client";
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import { ThemeContext } from "../LayoutWrapper";
import HelloApple from "./HelloApple";

function Scene({ progress }: { progress: number }) {
    return (
        <>
            <Canvas gl={{ antialias: true, alpha: true }} id="three-canvas">
                <HelloApple progress={progress} />
            </Canvas>
        </>
    );
}

export default Scene;
