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
                    I'm a Python developer, quant developer, and AI engineer. 
                    I specialize in creating products centered around conversational AI, aiming to deliver the most engaging interactive experiences with AI. 
                    Additionally, I design trading systems and liquidity engines that establish a robust framework for algorithmic trading. 
                    By combining these skills, I ensure seamless integration of AI with human interaction in the trading field. 
                </p>
            </div>
        </div>
    </section>
  )
}

export default HeroSection