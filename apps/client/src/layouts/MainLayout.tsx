import Navbar from './Navbar'
import Footer from './Footer'

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <Navbar />
        <section className='flex flex-col gap-40'>
            {children}
        </section>
      <Footer />
    </main>
  )
}

export default MainLayout;
