"use client"
import React from "react"
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai"
import { Link } from "react-scroll"

const Footer = () => {
    return (
        <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
            <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0"></hr>
            <div className="mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
                <div className="flex flex-row items-center justify-center space-x-1 text-neutral-500 dark:text-neutral-100">
                    <Link href="/">
                        <a className="hover:underline">© 2023 Fisher Lok</a>
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-center space-x-4 mb-1">
                    <a href="http://github.com/lokhiufung" rel="noreferrer" target="_blank">
                        <AiOutlineGithub
                            className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
                            size={30}
                        />
                    </a>
                    <a href="www.linkedin.com/in/lokhiufung" rel="noreferrer" target="_blank">
                        <AiOutlineLinkedin
                            className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
                            size={30}
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;