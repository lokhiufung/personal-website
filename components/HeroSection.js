import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section id="home" className="mx-auto md:max-w-5xl">
        <div className="flex flex-col text-center items-center mx-4 justify-center my-10 py-16 md:flex-row md:space-x-4 md:text-left sm:py-32 md:py-52 md:ml-8">
            <div className="md:w-1/2 md:mt-2">
                <Image className="rounded-full" src="/me.jpeg" alt="" width={300} height={300}/>
            </div>
            <div className="md:mt-2 md:w-3/5">
                <h1 className="font-bold text-4xl mt-6 md:text-7xl md:mt-0">Hi! I am Fisher Lok</h1>
                <p className="text-lg mt-4 mb-6">
                    I&apos;m a Python developer, quant developer, and AI engineer. 
                    I specialize in creating products centered around <span className="font-bold">conversational AI</span>, aiming to deliver the most engaging interactive experiences with AI. 
                    Additionally, I design and build <span className="font-bold">trading systems</span> and <span className="font-bold">liquidity engines</span> that establish a robust framework for algorithmic trading. 
                    Combining these skills, I want to build products that seamlessly integrate interactive AI in the trading field.
                </p>
                <p className="text-lg mt-4 mb-6">
                    I am working on a new project right now! Please check out <a className="underline text-blue-500" target="_blank" href="https://www.pfund.ai/">pfund.ai</a> to know more about how to make the best use of interactive <span className="font-bold">LLMs</span> for financial trading. Let&apos;s join the rise of <span className="font-bold">agent-based AI</span>!
                </p>
                <p className="text-lg mt-4 mb-6">
                    Please also check out my <a className="underline text-blue-500" target="_blank" href="https://medium.com/@alchemistHK">medium</a>!
                </p>
            </div>
        </div>
    </section>
  )
}

export default HeroSection