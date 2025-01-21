"use client";
import { motion } from "framer-motion";

export default function AnimatedDocumentIcon() {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="50" // Adjust size here
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            whileHover={{ scale: 1.1 }} // Slightly enlarge on hover
            whileTap={{ scale: 0.9 }} // Shrink on tap
        >
            {/* Outer file path */}
            <motion.path
                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            {/* File fold path */}
            <motion.path
                d="M14 2v4a2 2 0 0 0 2 2h4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
        </motion.svg>
    );
}
