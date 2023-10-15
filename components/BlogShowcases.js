import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const truncatedDescription = (description, maxLength) => {
    return description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
}

export default function BlogShowcases({ posts }) {
    
    return (
        <section id='blog' className="mx-auto md:max-w-5xl">
            <div className="md:pt-40 sm:pt-40">
                <div className="py-8">
                    <h1 className="font-bold text-center text-4xl mt-6 md:text-7xl md:mt-0">Blog</h1>
                </div>
                <div className="grid grid-cols-1 sm:mx-8 md:mx-8 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                    <Link key={post.id} href={post.link ? post.link : `/blog/${post.slug}`} target="_blank">
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
  

