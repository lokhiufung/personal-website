import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsGithub, BsArrowUpRightSqaure } from "react-icons/bs";

const projects = [
    {
        name: "Using Reinforcement learning algorithms to solve Atari games",
        description: "Implementation of deep reinforcement learning algorithms for solving openai's gym environments.",
        image: "/project-rl.gif",
        github: "https://github.com/lokhiufung/DRL-implementations/tree/master",
        link: "",
    },
    {
        name: "Playing Gomoku in terminal!",
        description: "A fun project: Write a gomoku game from scratch!",
        image: "/project-gomoku.gif",
        github: "https://github.com/lokhiufung/gomoku",
        link: "",
    }
]


const ProjectSection = () => {
  return (
    <section id="project" className="mx-auto md:max-w-5xl">
        <h1 className="text-center font-bold text-4xl">
            Projects
        </h1>
        <div className="flex flex-col space-y-20 mx-4">
            {projects.map((project, idx) => {
                return (
                    <div key={idx}>
                        <div className="flex flex-col md:flex-row md:space-x-12">
                            <div className="mt-8 md:w-1/2">
                                <Link href={project.github} target="_blank">
                                    <Image
                                        src={project.image}
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        className="rounded-xl shadow-xl hover:opacity-70"
                                    />
                                </Link>
                            </div>
                            <div className="mt-8 mr-8 md:w-1/2">
                                <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
                                <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
                                    {project.description}
                                </p>
                                <div className="flex flex-row align-bottom space-x-4">
                                    <Link href={project.github} target="_blank">
                                        <BsGithub
                                            size={30}
                                            className="hover:-translate-y-1 transition-transform cursor-pointer"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default ProjectSection