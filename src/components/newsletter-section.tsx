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
        `h-fit w-full rounded px-5 py-3 text-base font-medium shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.03)] outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 md:px-6 md:py-4 md:text-lg ${
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
            } pointer-events-auto flex w-full max-w-md items-center rounded-lg border border-green-200 bg-green-50 shadow-lg`}
          >
            <div className='w-0 flex-1 p-4'>
              <div className='flex items-start'>
                <div className='ml-3 flex-1'>
                  <p className='text-sm font-medium text-green-800'>Success</p>
                  <p className='mt-1 text-sm text-green-600'>
                    Subscription successful! Please check your email to confirm.
                  </p>
                </div>
              </div>
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
      <Toaster />
      <div className='flex size-full flex-col justify-start rounded bg-white align-middle shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:rounded-md md:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] lg:py-[9px] lg:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]'>
        <section className='flex h-fit w-full flex-col py-16 lg:py-0'>
          <div className='mx-auto flex h-fit w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-4 md:gap-8 lg:flex-row lg:p-24'>
            <div className='flex h-fit w-full flex-col justify-start gap-8 align-middle md:gap-16 lg:max-w-[488px]'>
              <div className='flex h-fit w-full flex-col gap-8 md:gap-16'>
                <h1 className='md:text-5 h-fit w-full text-3xl font-semibold text-neutral-900 md:text-5xl lg:text-6xl'>
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
                className='flex w-full max-w-[458px] flex-col gap-4 lg:max-w-[383px]'
              >
                <div className='flex flex-col gap-2'>
                  <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-4'
                    aria-describedby={error ? "error-message" : undefined}
                  />
                  {error && (
                    <p
                      id='error-message'
                      className='text-sm text-red-600'
                    >
                      {error}
                    </p>
                  )}
                </div>
                <span className='text-base text-neutral-600'>
                  We only send you the best! No spam.
                </span>

                <Button
                  type='submit'
                  variant='primary'
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>

            <div className='relative h-[264px] w-[311px] rounded-lg md:h-[526px] md:w-[704px] lg:w-[696px]'>
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
