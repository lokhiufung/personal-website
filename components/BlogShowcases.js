import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
  // Dummy data
  { id: 4, thumbnail: '/thumbnails/cash-macanaya-X9Cemmq4YjM-unsplash.jpg', imageSrc: 'https://unsplash.com/photos/X9Cemmq4YjM', title: 'Human and machine work together: Two important intelligent applications', description: 'What could be the most important field of research in artificial intelligence? Natural language understanding may be the one. Advances in natural language understanding can potentially boost up the productivity and knowledge acquisition for humans.', date: 'Feb 1, 2022', link: 'https://medium.com/data-driven-fiction/human-and-machine-work-together-two-important-intelligent-applications-9e22a1f651a' },
  { id: 3, thumbnail: '/thumbnails/complementary-learning-system-2.png', title: 'What Learning Systems do Intelligent Agents Need? Reviews from DeepMind 2', description: 'We know that there are 2 learning systems. But why do we need 2 separate learning systems? In this article, we will explain the role of the hippocampus to the slow integration of new experiences through replay. This provides insight for us to tackle the problem we called ‘catastrophic forgetting’ in training an artificial neural network. The quick adaption and slow integration of new experiences mechanism suggested in CLS may also provide insights on designing the architectures of an intelligent agent.', date: 'Jan 26, 2020', link: 'https://medium.com/analytics-vidhya/what-learning-systems-do-intelligent-agents-need-reviews-from-deepmind-8ec901de9d70' },
  { id: 2, thumbnail: '/thumbnails/timon-studler-ABGaVhJxwDQ-unsplash.jpg', imageSrc: 'https://unsplash.com/photos/ABGaVhJxwDQ', title: 'What Learning Systems do Intelligent Agents Need? Reviews from DeepMind 1', description: 'Memory is the data or information retrieved when an intelligent agent needs it.The ability to retrieve and store memory is one of the features of intelligent agents. With the theoy of Complemnetary Learning Systems (CLS), an intelligent agent implements 2 learning systems— one in the neocortex for slow learning, one in the hippocampus for fast learning. Learning in an deep artificial neural netowrk can be considered as slow learning in the neocortex. Training a deep neural network is data-inefficient, even a deep neural network is poweful. A Release from DeepMind reviewed CLS and proposed that there may be insight from this theory to address this problem.', date: 'Dec 30, 2019', link: 'https://medium.com/analytics-vidhya/what-learning-systems-do-intelligent-agents-need-reviews-from-deepmind-81c486050660' },
  { id: 1, thumbnail: '/thumbnails/google-deepmind-LaKwLAmcnBc-unsplash.jpg', imageSrc: 'https://unsplash.com/photos/LaKwLAmcnBc', title: 'Understand artificial neural networks with biological analogy', description: 'Artificial neural network (deep learning may be a fancier name!) is probably the most popular machine learning model now. You can always hear the words “deep learning” from everywhere. This is a biologically inspired model and it is good to understand this model with some biology!', date: 'Nov 19, 2019', link: 'https://medium.com/@fisherlok/understand-artificial-neural-networks-with-biological-analogy-18a4d76081eb' },
  // More blogs...
]

const truncatedDescription = (description, maxLength) => {
    return description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
}


function BlogShowcases() {
    return (
        <section id='blog' className="mx-auto md:max-w-5xl">
            <div className="md:pt-40 sm:pt-40">
                <div className="py-8">
                    <h1 className="font-bold text-center text-4xl mt-6 md:text-7xl md:mt-0">Blog</h1>
                </div>
                <div className="grid grid-cols-1 sm:mx-8 md:mx-8 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                    <Link key={post.id} href={post.link ? post.link : `/posts/${post.id}`} target="_blank">
                        <div className="group h-full block p-4 border border-gray-200 dark:border-neutral-800 shadow-xl rounded-lg hover:border-gray-300 transition ease-in-out duration-150 cursor-pointer">
                            <div className="w-full h-64 relative mb-4">
                                <Image src={post.thumbnail} layout="fill" objectFit="cover" className="rounded-lg shadow-xl hover:opacity-70" alt="post thumbnail" />
                            </div>
                            <h1 className="font-bold py-4">{post.title}</h1>
                            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                            <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-gray-600">{truncatedDescription(post.description, 200)}</p>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </section>
    )
  }
  
  export default BlogShowcases