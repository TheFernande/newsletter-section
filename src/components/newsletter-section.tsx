"use client";

import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import IconCheckFill from "./icons/icon-check-fill";

interface HeroSectionProps {
  bullets: string[];
  imageUrl: string;
  alt: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, children, className, ...rest }) => {
  return (
    <button
      className={
        `h-fit w-full rounded px-[14px] py-[10px] text-sm font-medium shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.03)] outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 ${
          variant === "primary"
            ? "bg-indigo-700 text-white hover:bg-indigo-900 focus:shadow-[0px_0px_3px_4px_rgba(68,76,231,0.12)]"
            : "bg-white text-neutral-900 hover:bg-neutral-50 focus:shadow-[0px_0px_3px_4px_rgba(68,76,231,0.12)]"
        }` +
        " " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

const NewsletterSection: React.FC<HeroSectionProps> = ({ bullets, imageUrl, alt }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    // Client-side validation
    if (!trimmedEmail) {
      setError("Email address is required.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: trimmedEmail })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again later.");
      }

      // Show success toast
      toast.custom(
        t => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-[343px] flex-row items-center rounded-full bg-green-50 md:w-[499px]`}
          >
            <div className='flex items-center gap-3 py-1 pl-1 pr-[10px]'>
              <p className='rounded-full bg-white px-[10px] py-[2px] text-sm font-medium text-green-700'>
                Success
              </p>
              <p className='text-sm font-medium text-green-700'>
                Subscription successful! Please check your email to confirm.
              </p>
            </div>
          </div>
        ),
        {
          duration: 5000,
          position: "top-center"
        }
      );

      setEmail("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to subscribe. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
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
      <div className='flex size-full flex-col justify-start rounded bg-white align-middle shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:rounded-md md:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] lg:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]'>
        <section className='flex w-full flex-col py-8 md:py-16 lg:px-16 lg:py-24'>
          <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-4 px-4 md:gap-8 lg:flex-row'>
            <div className='flex w-full flex-col justify-start gap-12 md:gap-16 lg:max-w-[592px]'>
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
              <Image
                src={imageUrl}
                alt={alt}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NewsletterSection;
