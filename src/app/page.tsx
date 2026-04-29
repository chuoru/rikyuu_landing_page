import Navbar from '@/components/Navbar';
import HeroPhilosophy from '@/components/HeroPhilosophy';
import Product from '@/components/Product';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroPhilosophy />
      <Product />
      <Contact />
      <Footer />
    </main>
  );
}
