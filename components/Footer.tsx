"use client";

import { motion } from "framer-motion";
import {
    ArrowUpRight,
    BookmarkIcon,
    Copyright,
    FileIcon,
    Folder,
    FolderIcon,
} from "lucide-react";
import MotionTextWithIcon from "./TextWithIcon";
import AnimatedDocumentIcon from "./AnimatedDocumentIcon";
import TextWithIconStyle3 from "./TextWithIconStyle3";

function Footer() {
    return (
        <div className="h-28 w-screen bg-background py-4">
            <div className="screen-width-footer flex h-full flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
                {/* XHS Posting */}
                <motion.div className="flex gap-x-10">
                    {/* Get in touch */}
                    <motion.div className="">
                        <div className="font-medium lg:flex lg:gap-x-10">
                            <div className="grid grid-cols-3 gap-x-6 md:gap-x-12">
                                <a
                                    rel="noreferrer"
                                    className="col-span-1 lg:hidden"
                                >
                                    <TextWithIconStyle3>
                                        <div className="social-link-text">
                                            PORTFOLIO
                                        </div>
                                    </TextWithIconStyle3>
                                </a>
                                <a
                                    rel="noreferrer"
                                    className="col-span-1 lg:hidden"
                                >
                                    <TextWithIconStyle3>
                                        <div className="social-link-text">
                                            BLOG
                                        </div>
                                    </TextWithIconStyle3>
                                </a>
                                <a rel="noreferrer" className="col-span-1">
                                    <TextWithIconStyle3>
                                        <div className="social-link-text">
                                            GITHUB
                                        </div>
                                    </TextWithIconStyle3>
                                </a>
                                <a rel="noreferrer" className="col-span-1">
                                    <TextWithIconStyle3>
                                        <div className="social-link-text">
                                            INSTAGRAM
                                        </div>
                                    </TextWithIconStyle3>
                                </a>
                                <a rel="noreferrer" className="col-span-1">
                                    <TextWithIconStyle3>
                                        <div className="social-link-text">
                                            REDNOTE
                                        </div>
                                    </TextWithIconStyle3>
                                </a>
                                <a rel="noreferrer" className="col-span-1">
                                    <TextWithIconStyle3>
                                        <div className="social-link-text">
                                            X
                                        </div>
                                    </TextWithIconStyle3>
                                </a>
                                <div className="text-t-secondary col-span-1 hidden text-nowrap text-base md:block">
                                    Get In Touch
                                </div>

                                <div className="text-t-secondary col-span-1 hidden text-nowrap text-base md:block">
                                    Frontend Developer
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Copyright */}

                <motion.div className="footer-item flex h-full w-full items-center justify-end md:col-span-4 md:justify-end md:pr-5 lg:pt-0">
                    <div className="text-t-secondary flex-wrap text-end text-sm font-medium leading-normal md:text-start">
                        <Copyright
                            strokeWidth={2}
                            size={14}
                            className="mb-1 mr-1 inline-block"
                        />
                        <span className="h-full text-wrap 2xl:text-xl">
                            Alice, @chaosatleast 2025.
                            <br />
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Footer;
