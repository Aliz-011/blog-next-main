import AboutUs from '@/components/about-us';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Sponsor from '@/components/sponsor';
import Team from '@/components/team';
import FromBlog from './_components/from-blog';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <FromBlog />
      <Sponsor />
      <Team />
      <Footer />
    </div>
  );
}
