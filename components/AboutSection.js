import React from 'react'

const SKILLS = [
    {"skill": "Python"},
    {"skill": "Trading System"},
    {"skill": "Algorithmic Trading"},
    {"skill": "Cryptocurrency Trading"},
    {"skill": "Conversational AI"},
    {"skill": "Prompt Engineering"},
]

const AboutSection = () => {
  return (
    <section id="about" className="mx-auto md:max-w-5xl">
        <div className="my-12 pb-12 md:pt-16 md:pd-48">
            <h1 className="text-center font-bold text-4xl">About Me</h1>
            <div className="flex flex-col space-y-10 items-stretch mt-5 mx-4 md:flex-row justify-center align-top md:space-x-10 md:space-y-0 md:text-left md:p-8">
                <div className="md:w-1/2">
                    {/* <h1>Paragraphs 1</h1> */}
                    <p className="text-base mt-4 mb-6">
                        Hi, my name is Fisher and I am a{" "}
                        <span className="font-bold"> Python Developer</span>,
                        <span className="font-bold"> Quant Developer</span>, and 
                        <span className="font-bold"> AI Engineer</span>.
                        I worked in an AI startup and cryptocurrency exchanges. My expertise is building speech recognition model, text-to-speech model and natural language understanding model in conversational AI and trading system
                    </p>
                    <p className="text-base mt-4 mb-6">
                        I have always believed in <span className="font-bold">agent-based AI</span>, which allows you to collaborate with it to solve tasks together.
                        Deep reinforcement learning has been the primary approach for creating interactive AI in recent years.
                        However, training AI agents using this method requires a significant amount of interaction data, which may not be practical for real-world problems.
                    </p>
                    <p className="text-base mt-4 mb-6">
                        Now, there is another potential solution: LLMs trained on massive amounts of data.
                        OpenAI&apos;s <span className="font-bold">ChatGPT</span>, with its astonishing knowledge, reasoning ability, and understanding of human language, has showcased its immense power to the world since last year.
                        Consequently, I believe it is the opportune moment to embark on building AI agents capable of seamless interaction with humans.
                    </p>
                </div>
                <div className="text-center md:w-1/2 md:text-left">
                    <h1 className="text-2xl font-bold mb-6">My Skills</h1>
                    <div className="flex flex-wrap flex-row justify-center z-10 md:justfy-start">
                        {SKILLS.map((item, idx) => {
                            return (
                                <p
                                    key={idx}
                                    className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold hover:-translate-y-1 transition-transform cursor-pointer"
                                >
                                    {item.skill}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutSection