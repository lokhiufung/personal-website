// import matter from 'gray-matter'
import path from 'path'
import fs from 'fs/promises'
import { serialize } from 'next-mdx-remote/serialize'
// import { cache } from 'react'

// `cache` is a React 18 feature that allows you to cache a function for the lifetime of a request.
// this means getPosts() will only be called once per page build, even though we may call it multiple times
// when rendering the page.

export const getPosts = async () => {
  const posts = await fs.readdir('posts/')
  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.md')
      .map(async (file) => {
        const filePath = `posts/${file}`
        const postContent = await fs.readFile(filePath, 'utf8')
        const serialized = await serialize(postContent, {parseFrontmatter: true})
        // const { data, content } = matter(postContent)
        const frontmatter = serialized.frontmatter
        if (frontmatter.published === false) {
          return null
        }

        return { frontmatter, serialized }
      })
  )
}


export async function getPostDetails() {
  const posts = await getPosts();
  const postDetails = posts.map(post => ({
    ...post.frontmatter
  }));
  return postDetails;
}


export async function getPost(slug) {
  const posts = await getPosts()
  return posts.find((post) => post.frontmatter.slug === slug)
}

export default getPosts
