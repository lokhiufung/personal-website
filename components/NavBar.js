"use client"
import React from 'react'
import { useTheme } from "next-themes";
import Link from 'next/link';
import { Link as ScrollLink } from "react-scroll/modules";
import { useState } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri"
import { IoMdMenu, IoMdClose } from "react-icons/io";

const NAV_ITEMS = [
    {
        label: "Home",
        page: "/#home",
    },
    {
        label: "About",
        page: "/#about",
    },
    {
        label: "Projects",
        page: "/#project",
    },
    {
        label: "Blog",
        page: "/blog",
    },
]
const NavBar = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [navBar, setNavBar] = useState(false);
    return (
        <header className="w-full mx-auto px-4 sm:px-20 shadow fixed top-0 z-50 bg-white dark:bg-stone-900 dark:border-stone-600 dark:border-b">
            <div className="justify-between md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-3">
                        <div className="md:py-5 md:block">
                            <h2 className="text-2xl font-bold">Fisher Lok</h2>
                        </div>
                        <div className="md:hidden">
                            <button onClick={()=>setNavBar((!navBar))}>
                                {navBar ? <IoMdClose size={30} /> : <IoMdMenu size={30}/>}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 md:justify-between pb-3 mt-8 md:flex md:items-center md:pb-0 md:mt-0 ${
                            navBar ? "block" : "hidden"
                        }`}
                    >
                        <div className="items-center justify-center md:flex md:space-x-6 space-y-4 md:space-y-0">
                            {NAV_ITEMS.map((item, idx) => {
                                // return (
                                //     <Link
                                //         className={
                                //             "block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                                //         }
                                //         href={item.page}
                                //         key={idx}
                                //     >
                                //         {item.label}
                                //     </Link>
                                // )
                                return item.page.startsWith("/") ? (
                                    <Link
                                        className={
                                            "block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                                        }
                                        href={item.page}
                                        key={idx}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    // now there is no scrolling effect 
                                    <ScrollLink
                                        key={idx}
                                        to={item.page}
                                        className={
                                            "block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                                        }
                                        activeClass="active"
                                        spy={true}
                                        smooth={true}
                                        offset={-100}
                                        duration={500}
                                        onClick={() => setNavBar(!navBar)}
                                    >
                                        {item.label}
                                    </ScrollLink>
                                )
                            })}
                        {currentTheme === "dark" ? (
                            <button 
                                onClick={()=>setTheme("light")}
                                className="bg-slate-100 p-2 rounded-xl"
                            >
                                <RiSunLine size={25} color="black"/>
                            </button>
                        ) : (
                            <button
                                onClick={()=>setTheme("dark")}
                                className="bg-slate-100 p-2 rounded-xl"
                            >
                                <RiMoonFill size={25}/>
                            </button>
                        )}
                        </div>
                        {/* <div className="md:ml-6"> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar