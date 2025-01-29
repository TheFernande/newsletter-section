import heroPic from "../../public/images/newsletter-section.png";
import NewsletterSection from "../components/newsletter-section";

export default function Home() {
  return (
    <main className='mx-auto my-0 flex min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#D2D6DB] p-4'>
      <NewsletterSection
        bullets={[
          "Exclusive access to new abstract images and collections",
          "Unlock special promotions only for subscribers",
          "Regular doses of artistic inspiration"
        ]}
        imageUrl={heroPic.src}
        alt='An abstract arty image'
      />
    </main>
  );
}
