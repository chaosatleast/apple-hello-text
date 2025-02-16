"use client";

import Scene from "@/components/React3Fiber/Scene";
import TextRotateSlideUp from "@/components/TextRotateSlideUp";
import { useState } from "react";

export default function Home() {
    // 预定义渐变颜色 (stop 代表解锁进度)
    const colorStops = [
        { stop: 0.0, color: "#037A92" }, // Teal
        { stop: 0.25, color: "#ACD15E" }, // Green
        { stop: 0.35, color: "#FAD500" }, // Yellow
        { stop: 0.6, color: "#F45343" }, // Red
        { stop: 0.8, color: "#9174B5" }, // Purple
        { stop: 1.0, color: "#6C9DE2" }, // Blue
    ];

    // 计算动态 `linear-gradient`
    function getDynamicGradient(progress: number) {
        const normalizedProgress = progress / 100;

        const activeColors = colorStops.filter(
            (stop) => stop.stop <= normalizedProgress,
        );

        const gradientStops = activeColors.map(
            (stop) =>
                `${stop.color} ${(stop.stop / normalizedProgress) * 100}%`,
        );
        return `linear-gradient(90deg, ${gradientStops.join(", ")})`;
    }
    const [progress, setProgress] = useState(101);
    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setProgress(parseInt(e.target.value));
    };
    return (
        <div className="flex min-h-[calc(100vh_-_100px)] w-screen flex-col justify-center">
            <div className="h-[50vh] w-full">
                <Scene progress={progress} />
            </div>

            <div className="">
                <TextRotateSlideUp>
                    <div className="flex h-20 w-full justify-center pt-5">
                        <div className="mx-auto flex h-full w-full max-w-3xl">
                            <div className="group/pointer relative h-full w-full">
                                {/* Range Input (Hidden but Functional) */}
                                <input
                                    className="thumb-visible absolute z-20 h-4 w-full appearance-none rounded-full bg-transparent"
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={progress}
                                    onChange={(e) => {
                                        handleRangeChange(e);
                                    }}
                                />
                                {/* Progress Bar */}
                                <div className="absolute flex h-4 w-full flex-row items-center overflow-hidden rounded-full">
                                    {/* Filled Progress (RED when value >= 80) */}
                                    <div
                                        className={`absolute h-full bg-transparent`}
                                        style={{
                                            width: `${progress}%`,
                                            background:
                                                getDynamicGradient(progress), // 动态渐变
                                        }}
                                    ></div>
                                    {/* Remaining Track */}
                                    <div className="h-full w-full rounded-full bg-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TextRotateSlideUp>
            </div>
        </div>
    );
}
