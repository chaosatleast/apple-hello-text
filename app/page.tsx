import TextRotateSlideUp from "@/components/TextRotateSlideUp";
import ZoopTextEffect from "@/components/ZoopTextEffect";
import dynamic from "next/dynamic";

const Tree = dynamic(() => import("@/components/React3Fiber/Tree"), {
    ssr: false,
});

export default function Home() {
    return (
        <div className="min-h-svh w-screen">
            <div className="relative h-screen w-screen text-t-primary">
                <h1 className="font-antonio flex h-full w-full items-center justify-center text-[15rem] tracking-widest text-white">
                    <ZoopTextEffect>YEAR</ZoopTextEffect>
                </h1>
            </div>
            <div className="relative h-screen w-screen text-t-primary">
                <h1 className="font-antonio flex h-full w-full items-center justify-center text-[15rem] tracking-widest text-white">
                    <ZoopTextEffect>OF</ZoopTextEffect>
                </h1>
            </div>
            <div className="relative h-screen w-screen text-t-primary">
                <h1 className="font-antonio flex h-full w-full items-center justify-center text-[15rem] tracking-widest text-white">
                    <ZoopTextEffect>SNAKE</ZoopTextEffect>
                </h1>
            </div>
            <div className="relative h-screen w-screen text-t-primary">
                <h1 className="font-antonio flex h-full w-full items-center justify-center text-[15rem] tracking-widest text-white">
                    <ZoopTextEffect>2025</ZoopTextEffect>
                </h1>
            </div>
            <div className="font-zcoolKuaile relative h-screen w-screen text-[14rem] text-[#F2D16D] [text-shadow:_0_10px_0_rgb(0_0_0_/_60%)]">
                <h1 className="mx-auto flex h-full w-full max-w-6xl flex-row items-center justify-between leading-none">
                    <div className="flex flex-col pt-28">
                        <TextRotateSlideUp>蛇</TextRotateSlideUp>

                        <TextRotateSlideUp isReverse={true}>
                            来
                        </TextRotateSlideUp>
                    </div>

                    <div className="flex flex-col pt-28">
                        <TextRotateSlideUp isReverse={true}>
                            运
                        </TextRotateSlideUp>

                        <TextRotateSlideUp>转</TextRotateSlideUp>
                    </div>
                </h1>
            </div>
        </div>
    );
}
