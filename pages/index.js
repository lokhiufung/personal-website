import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectSection from '@/components/ProjectSection';
import Footer from '@/components/Footer';
import RootLayout from '@/components/layouts/RootLayout';


export default function Home() {
  return (
    <RootLayout>
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <Footer />
      </main>
    </RootLayout>
  )
}
