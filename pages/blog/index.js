
import RootLayout from '@/components/layouts/RootLayout';
import BlogShowcases from '@/components/BlogShowcases';
import Footer from '@/components/Footer';

import { getPostDetails } from '@/lib/get-posts'

export default function Blog({ posts }) {
  return (
    <RootLayout>
      <main>
        <BlogShowcases posts={posts}/>
        <Footer /> 
      </main>
    </RootLayout>
  )
}

export async function getStaticProps() {
  const posts = await getPostDetails()
  return {
      props: {
          posts,
      }
  }
}
