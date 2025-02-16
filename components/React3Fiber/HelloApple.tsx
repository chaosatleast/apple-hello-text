"use client";
import { Center, OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import { fragmentChunk1, fragmentChunk2 } from "../Shaders/fragment";
import { vertexChunk1, vertexChunk2, vertexChunk3 } from "../Shaders/vertex";

function HelloApple({ progress }: { progress: number }) {
    const [vertices, setVertices] = React.useState([]);

    console.log("Progress:", progress);

    const [hLength, setHLength] = useState(2);
    const isAnimatingRef = useRef(true); // 追踪是否还在自动生长
    const textMeshRef = useRef<any>();

    useFrame(() => {
        if (
            hLength < vertices.length &&
            vertices.length > 0 &&
            isAnimatingRef.current &&
            progress == 101
        ) {
            setHLength((prev) =>
                Math.min(prev + Math.random() * 8 + 4, vertices.length),
            );
        }
    });

    useEffect(() => {
        if (progress > 0 && progress <= 100 && vertices.length > 0) {
            isAnimatingRef.current = false; // 停止自动生长
            setHLength(Math.floor((progress / 100) * vertices.length));
        }
    }, [progress, vertices.length]);

    useEffect(() => {
        const fetchPoints = async () => {
            const response = await fetch("./hello-apple-5.json");
            const data = await response.json();
            console.log("Data:", data.vertices);
            setVertices(data.vertices);
        };

        fetchPoints();
    }, []);

    const helloTextGeometry = useMemo(() => {
        if (!vertices.length || hLength <= 0) return;

        const nPoint = vertices
            .slice(0, hLength)
            .map(({ x, y, z }) => new THREE.Vector3(x, y, z));

        if (nPoint.length < 2) return; // Prevent curve errors with too few points

        const curve = new THREE.CatmullRomCurve3(
            nPoint,
            false,
            "catmullrom",
            0.4,
        );

        const curveMesh = new THREE.TubeGeometry(curve, 1000, 0.3, 10, false);

        // Sphere at the start
        const sphereGeometry1 = new THREE.SphereGeometry(0.3, 32, 32);
        sphereGeometry1.translate(...curve.points[0].toArray());

        // Sphere at the end
        const lastPoint = curve.points[curve.points.length - 1];
        const sphereGeometry2 = new THREE.SphereGeometry(0.3, 32, 32);
        sphereGeometry2.translate(...lastPoint.toArray());

        // Assign UVs
        const assignUV = (geometry: THREE.BufferGeometry, value: number) => {
            const uv = new Float32Array(geometry.attributes.position.count * 2);
            for (let i = 0; i < uv.length; i += 2) uv[i] = value;
            geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
        };

        assignUV(sphereGeometry1, 0.0);
        assignUV(sphereGeometry2, 1.0);

        // Merge geometries
        const mesh = BufferGeometryUtils.mergeGeometries(
            [curveMesh, sphereGeometry1, sphereGeometry2],
            // [curveMesh],
            true,
        );
        return { curve, mesh };
    }, [vertices, hLength]);

    const { viewport, size } = useThree();

    const camera = useMemo(() => {
        const baseWidth = 1440; // 基准宽度
        const zoom = Math.min(50, (size.width / baseWidth) * 50);
        return {
            position: new THREE.Vector3(0, 0, 100),
            zoom,
        };
    }, [size.width]);

    const uniformsRef = useRef({
        currentCurveLength: { value: 2 },
        totalCurveLength: { value: 1000 },
    });

    useEffect(() => {
        if (uniformsRef.current) {
            uniformsRef.current.currentCurveLength.value = hLength;
            uniformsRef.current.totalCurveLength.value = vertices.length;
        }
    }, [hLength, vertices]);

    return (
        <>
            <OrthographicCamera
                makeDefault
                position={camera.position}
                zoom={camera.zoom}
                resolution={2048}
            />

            <motion.spotLight
                position={[0, 0, 80]}
                intensity={200}
                angle={Math.PI}
                penumbra={0.1}
                color={"#f4f5f7"}
            ></motion.spotLight>
            <motion.spotLight
                position={[-30, 0, 75]}
                intensity={1000}
                angle={Math.PI}
                penumbra={0.8}
                color={"#fff"}
            ></motion.spotLight>
            <motion.spotLight
                position={[30, 0, 75]}
                intensity={800}
                angle={Math.PI}
                penumbra={0.8}
                color={"#fff"}
            ></motion.spotLight>
            <motion.spotLight
                position={[0, 20, 75]}
                intensity={800}
                angle={Math.PI}
                penumbra={0.8}
                color={"#fff"}
            ></motion.spotLight>
            <motion.spotLight
                position={[0, -20, 75]}
                intensity={800}
                angle={Math.PI}
                penumbra={0.8}
                color={"#fff"}
            ></motion.spotLight>
            <Center>
                {helloTextGeometry?.mesh && (
                    <mesh
                        position={[-5, -0.5, 70]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={1}
                        receiveShadow
                        castShadow
                        ref={textMeshRef}
                    >
                        <bufferGeometry {...helloTextGeometry?.mesh} />

                        <meshStandardMaterial
                            roughness={1}
                            metalness={0}
                            onBeforeCompile={(shader) => {
                                shader.uniforms = {
                                    ...shader.uniforms,
                                    ...uniformsRef.current,
                                };
                                shader.vertexShader =
                                    vertexChunk1 + shader.vertexShader;
                                shader.vertexShader =
                                    shader.vertexShader.replace(
                                        "#include <uv_vertex>",
                                        vertexChunk2,
                                    );

                                shader.vertexShader =
                                    shader.vertexShader.replace(
                                        "#include <begin_vertex>",
                                        vertexChunk3,
                                    );
                                shader.fragmentShader =
                                    fragmentChunk1 + shader.fragmentShader;

                                shader.fragmentShader =
                                    shader.fragmentShader.replace(
                                        `#include <opaque_fragment>`, // 修改不透明材质的输出
                                        fragmentChunk2,
                                    );
                            }}
                        />

                        {/* <meshBasicMaterial color={"#0000ff"} wireframe /> */}
                    </mesh>
                )}
            </Center>
        </>
    );
}

export default HelloApple;
