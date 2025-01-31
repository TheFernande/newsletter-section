"use client";

import Image from "next/image";
import { Toaster } from "react-hot-toast";

import IconCheckFill from "./icons/icon-check-fill";
import Button from "./gfe-button";

import heroImageMobile from "../../public/images/newsletter-section-small.png";
import heroImageTablet from "../../public/images/newsletter-section-mid.png";
import heroImageDesktop from "../../public/images/newsletter-section.png";
import useSubscribeToNewsletter from "@/hooks/use-subscribe-to-newsletter";

interface HeroSectionProps {
  bullets: string[];
  alt: string;
}


const NewsletterSection: React.FC<HeroSectionProps> = ({ bullets, alt }) => {
  const { email, setEmail, isLoading, error, subscribeToNewsletter } = useSubscribeToNewsletter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    subscribeToNewsletter(email);
  };

  return (
    <>
      <Toaster
        containerStyle={{
          top: "var(--toast-top-position)"
        }}
        position='top-center'
        toastOptions={{
          duration: 5000
        }}
      />
      <section className='flex size-full flex-col justify-start rounded bg-white align-middle shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:rounded-md md:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] lg:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] py-8 md:py-16 lg:px-16 lg:py-24'>
        <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-4 px-3 md:gap-16 lg:gap-8 md:px-4 lg:flex-row'>
          <div className='flex w-full flex-col justify-start gap-12 lg:max-w-[592px]'>
            <div className='flex w-full flex-col gap-8 md:gap-16'>
              <h1 className='text-3xl font-semibold text-neutral-900 md:text-5xl'>
                Get the finest curated abstracts delivered weekly&nbsp;to your inbox
              </h1>
              <ul className='flex flex-col items-start gap-5'>
                {bullets.map((desc, index) => (
                  <li
                    key={index}
                    className='flex flex-row gap-3 align-middle text-lg font-normal text-neutral-600'
                  >
                    <IconCheckFill />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className='flex w-full flex-col items-start gap-3 md:max-w-[704px] md:flex-row md:flex-wrap md:items-center md:gap-4 lg:max-w-[592px]'
            >
              <div className='flex w-full flex-col gap-2 md:max-w-[334px]'>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='order-1 w-full rounded-md rounded-s border border-neutral-200 bg-neutral-50 px-[14px] py-[10px] text-sm placeholder:text-neutral-500'
                  aria-describedby={error ? "error-message" : undefined}
                />
                {error && (
                  <p
                    id='error-message'
                    className='order-2 text-sm text-red-600'
                  >
                    {error}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                variant='primary'
                disabled={isLoading}
                className={
                  "order-4 mt-1 self-baseline md:order-3 md:mt-0 md:max-w-[98px]" +
                  (isLoading ? " w-full cursor-not-allowed md:max-w-fit" : "")
                }
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>

              <span className='order-3 text-base text-neutral-600 md:order-4'>
                We only send you the best! No spam.
              </span>
            </form>
          </div>

          <div className='relative h-[288px] w-[311px] rounded-lg md:h-[608px] md:w-[688px] lg:w-[592px]'>
            <div className='block md:hidden'>
              <Image
                src={heroImageMobile}
                alt={alt}
                fill
                priority
                placeholder='blur'
                blurDataURL={heroImageMobile.blurDataURL}
                sizes={heroImageMobile.width.toString()}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Tablet image */}
            <div className='hidden md:block lg:hidden'>
              <Image
                src={heroImageTablet}
                alt={alt}
                fill
                priority
                placeholder='blur'
                blurDataURL={heroImageTablet.blurDataURL}
                sizes={heroImageTablet.width.toString()}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Desktop image */}
            <div className='hidden lg:block'>
              <Image
                src={heroImageDesktop}
                alt={alt}
                fill
                priority
                placeholder='blur'
                blurDataURL={heroImageDesktop.blurDataURL}
                sizes={heroImageDesktop.width.toString()}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSection;
