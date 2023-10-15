// "use client"
import NavBar from '@/components/NavBar'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <NavBar/>
      {children}
    </ThemeProvider>
  )
}
