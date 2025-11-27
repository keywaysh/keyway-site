import { Footer } from '@/app/components/Footer'
import { Header } from '@/app/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
