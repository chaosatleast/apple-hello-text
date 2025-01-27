"use client";
import {
    Center,
    Environment,
    OrthographicCamera,
    SpotLight,
    useMatcapTexture,
    useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Snake() {
    const [vertices, setVertices] = React.useState([]);
    const [matcap] = useMatcapTexture("A27216_E9D036_D0AB24_DCB927");

    const uniforms = useRef({
        u_BodyColor: { value: new THREE.Color(0x0d0d0d) },
        u_LineColor: { value: new THREE.Color(0xffd700) },
    });
    useEffect(() => {
        const fetchPoints = async () => {
            const response = await fetch("./snake_curve.json");
            const data = await response.json();
            console.log("Data:", data.vertices);
            setVertices(data.vertices);
        };

        fetchPoints();
    }, []);

    const textures = useTexture({
        front: "./hcny_1.png",
        back: "./hcny_2.png",
    });

    const snakeTexture = useTexture("./snake_normal2.jpg", (texture) => {
        console.log("Texture:", texture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(80, 1);
        texture.anisotropy = 16;
        texture.needsUpdate = true;
    });

    const snakeMaterialRef = React.useRef<any>();

    const snakeGeometry = useMemo(() => {
        if (!vertices.length) return;
        const nPoint = vertices.map(
            ({ x, y, z }: { x: number; y: number; z: number }) => {
                return new THREE.Vector3(x, y, z);
            },
        );
        console.log("nPoint:", nPoint);

        const curve = new THREE.CatmullRomCurve3(nPoint);
        curve.curveType = "catmullrom";
        curve.tension = 0.5;
        curve.closed = true;
        const snakeMesh = new THREE.TubeGeometry(curve, 2000, 1.25, 20, false);

        return { curve, snakeMesh, textures };
    }, [vertices]);

    const { viewport } = useThree();

    const cameraRef = useRef<any>({
        position: new THREE.Vector3(0, 0, 100),
        zoom: 50,
    });

    const [scrollPosition, setScrollPosition] = useState(0);

    // Update scroll position on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const normalizedScroll = scrollY / maxScroll;
            setScrollPosition(normalizedScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame(({ clock }) => {
        if (snakeMaterialRef.current) {
            const time = clock.getElapsedTime();

            // snakeMaterialRef.current.map.offset.x = (time * 0.05) % 1; // Adjust speed with 0.1
            snakeMaterialRef.current.normalMap.offset.x = (time * 0.09) % 1;
        }

        if (cameraRef.current) {
            // Smoothly interpolate camera zoom and position based on scroll
            const zoomValue = 50 - scrollPosition * 38; // Zoom from 40 to 10
            cameraRef.current.zoom = THREE.MathUtils.lerp(
                cameraRef.current.zoom,
                zoomValue,
                0.1,
            );
            cameraRef.current.updateProjectionMatrix(); // Update camera matrix
        }
    });

    return (
        <>
            <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={cameraRef.current.position}
                zoom={cameraRef.current.zoom}
                resolution={2048}
            />

            <motion.directionalLight
                position={[0, 0, 50]}
                intensity={5}
                scale={1}
                color={"#ecc5c0"}
            ></motion.directionalLight>
            <motion.directionalLight
                position={[0, 50, 0]}
                intensity={1}
                scale={10}
                color={"#ecc5c0"}
            ></motion.directionalLight>
            <motion.directionalLight
                position={[0, -50, 0]}
                intensity={1}
                scale={10}
                color={"#ecc5c0"}
            ></motion.directionalLight>
            <motion.directionalLight
                position={[-50, 0, 0]}
                intensity={10}
                scale={1}
                color={"#ecc5c0"}
            ></motion.directionalLight>
            <motion.directionalLight
                position={[50, 0, 0]}
                intensity={10}
                scale={1}
                color={"#ecc5c0"}
            ></motion.directionalLight>

            <Center>
                {snakeGeometry?.snakeMesh && (
                    <mesh
                        position={[-2.5, 0, 70]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        receiveShadow
                        castShadow
                    >
                        <bufferGeometry {...snakeGeometry?.snakeMesh} />

                        <meshPhysicalMaterial
                            ref={snakeMaterialRef}
                            color="#73020C" // 柔和金色
                            roughness={0.5} // 表面光滑
                            metalness={1.0} // 金属感
                            clearcoat={0.2} // 提升高光层次
                            clearcoatRoughness={0.5} // 柔化高光
                            normalMap={snakeTexture} // 使用法线贴图
                            envMapIntensity={1.2} // 环境反射强度
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}
                {/* 
                {snakeGeometry?.finalPoints && (
                    <Line
                        points={snakeGeometry.finalPoints}
                        color="hotpink"
                        position={[0, 0, 5]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <lineBasicMaterial color="hotpink" />
                    </Line>
                )} */}
            </Center>
        </>
    );
}

export default Snake;
