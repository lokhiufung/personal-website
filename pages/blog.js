
import RootLayout from '@/components/layouts/RootLayout';
import BlogShowcases from '@/components/BlogShowcases';
import Footer from '@/components/Footer';


export default function Blog() {
  return (
    <RootLayout>
      <main>
        <BlogShowcases/>
        <Footer /> 
      </main>
    </RootLayout>
  )
}