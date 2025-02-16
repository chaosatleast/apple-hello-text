"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AnimatedMoonIcon from "./AnimatedMoonIcon";
import AnimatedSunIcon from "./AnimatedSunIcon";
import { ThemeContext } from "./LayoutWrapper";
import LetsTalkButton from "./LetsTalkButton";
import ModeButton from "./ModeButton";
import SlideDownAnimation from "./SlideDownAnimation";
import TextWithIconStyle2 from "./TextWithIconStyle2";

type Props = {
    imageUrl: string;
};

function Header({ imageUrl }: Props) {
    const themeContext = useContext(ThemeContext);
    const router = useRouter();
    return (
        <div className="flex h-20 w-full items-center justify-center">
            <div className="relative z-10 flex h-full w-full items-center justify-between px-5">
                <div className="flex flex-row items-center space-x-5">
                    <div
                        className="relative h-12 w-12"
                        onClick={() => router.push("/")}
                    >
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt="Logo"
                                layout="fill"
                                objectFit="contain"
                                className="h-full w-full"
                            />
                        )}
                    </div>

                    <div className="hidden text-sm leading-snug text-t-tertiary md:block">
                        <SlideDownAnimation>
                            Learning is fun
                            <br /> while Painful –– FPS# 8
                        </SlideDownAnimation>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-x-3 lg:space-x-8">
                    <SlideDownAnimation>
                        <ModeButton
                            onClick={() => {
                                themeContext.setTheme(
                                    themeContext.theme === "dark"
                                        ? "light"
                                        : "dark",
                                );

                                console.log("Mode Clicked");
                            }}
                        >
                            {themeContext.theme === "dark" ? (
                                <AnimatedSunIcon />
                            ) : (
                                <AnimatedMoonIcon />
                            )}
                        </ModeButton>
                    </SlideDownAnimation>
                    <div className="hidden lg:block">
                        {" "}
                        <SlideDownAnimation>
                            <TextWithIconStyle2>PORTFOLIO</TextWithIconStyle2>
                        </SlideDownAnimation>
                    </div>
                    <div className="hidden lg:block">
                        <SlideDownAnimation>
                            <TextWithIconStyle2>BLOG</TextWithIconStyle2>
                        </SlideDownAnimation>
                    </div>
                    <SlideDownAnimation>
                        <LetsTalkButton>
                            <div className="font-semibold">LET's TALK</div>
                        </LetsTalkButton>
                    </SlideDownAnimation>
                </div>
            </div>
        </div>
    );
}

export default Header;
