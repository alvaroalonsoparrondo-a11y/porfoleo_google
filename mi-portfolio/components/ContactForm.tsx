'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import emailjs from "@emailjs/browser";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  dict: any;
}

export function ContactForm({ dict }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: "onBlur",
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        console.log("EmailJS not configured. Form data:", data);
        toast.error("EmailJS no està configurat correctament");
        return;
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "naguileralavalira@gmail.com",
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          reply_to: data.email,
        },
        publicKey
      );

      if (response.status === 200) {
        toast.success(dict.success, {
          description: "El teu missatge s'ha enviat correctament. Em posarem en contacte aviat!",
        });
        reset();
      } else {
        toast.error(dict.error);
      }
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast.error(dict.error, {
        description: error.text || "Ha ocorregut un error al enviar el missatge",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="border border-border rounded-2xl p-8 bg-header-bg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              {dict.name} <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder={dict.namePlaceholder}
              {...register("name", {
                required: dict.required,
                minLength: {
                  value: 2,
                  message: "El nom ha de tenir almenys 2 caràcters",
                },
              })}
              className="w-full px-4 py-3 border border-input-border bg-input-bg rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.name && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 17.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                </svg>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              {dict.email} <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder={dict.emailPlaceholder}
              {...register("email", {
                required: dict.required,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: dict.invalidEmail,
                },
              })}
              className="w-full px-4 py-3 border border-input-border bg-input-bg rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.email && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 17.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                </svg>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-foreground">
              {dict.subject} <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder={dict.subjectPlaceholder}
              {...register("subject", {
                required: dict.required,
                minLength: {
                  value: 3,
                  message: "L'assumpte ha de tenir almenys 3 caràcters",
                },
              })}
              className="w-full px-4 py-3 border border-input-border bg-input-bg rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.subject && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 17.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                </svg>
                {errors.subject.message}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-foreground">
              {dict.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              placeholder={dict.messagePlaceholder}
              rows={6}
              {...register("message", {
                required: dict.required,
                minLength: {
                  value: 10,
                  message: "El missatge ha de tenir almenys 10 caràcters",
                },
              })}
              className="w-full px-4 py-3 border border-input-border bg-input-bg rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            {errors.message && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 17.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                </svg>
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>{dict.sending}</span>
              </>
            ) : (
              <span>{dict.send}</span>
            )}
          </button>

          <p className="text-xs text-text-muted text-center">
            Usem EmailJS per enviar els teus missatges de forma segura. Les teves dades no es compartiran amb tercers.
          </p>
        </form>
      </div>
    </>
  );
}
