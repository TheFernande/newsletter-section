"use client";

import ToastSubsSuccess from "@/components/toast-subs-success";
import { validateEmail } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useSubscribeToNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const subscribeToNewsletter = async (email: string) => {
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
        t => (<ToastSubsSuccess visible={t.visible} />),
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

  return { email, setEmail, isLoading, setIsLoading, error, setError, subscribeToNewsletter };
};

export default useSubscribeToNewsletter;