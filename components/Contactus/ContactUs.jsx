"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  LIMITS,
  validateContactField,
  validateContactForm,
} from "@/lib/validation/contactForm";
import {
  CONTACT_MESSAGES,
  ContactSubmitError,
  TURNSTILE_SITE_KEY,
  submitDreamfoxContactUs,
} from "@/lib/contact/dreamfoxContactApi";
import { useTurnstile } from "./useTurnstile";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
  website: "", // honeypot, see the hidden field in the form
};

const SUCCESS_MESSAGE = "Thanks for reaching out! Your message has been sent.";
const TURNSTILE_REQUIRED =
  "Please complete the security check above the button, then try again.";
// After a 429, keep the button disabled for a while to stop repeat clicks.
const RATE_LIMIT_COOLDOWN_MS = 30_000;

const inputClass = (hasError, extra = "") =>
  `relative w-full bg-white/10 backdrop-blur-2xl border rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/15 transition-all duration-300 group-hover:bg-white/12 shadow-lg ${
    hasError
      ? "border-red-400/70 focus:border-red-400"
      : "border-white/20 focus:border-white/40"
  } ${extra}`;

// Visual marker for required fields. Screen readers already announce
// "required" from the input's `required` attribute, so this is hidden from them.
function RequiredMark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-lg leading-none font-semibold text-[#E7308F]"
    >
      *
    </span>
  );
}

function FieldError({ name, message }) {
  if (!message) return null;
  return (
    <p id={`contact-${name}-error`} className="mt-2 px-2 text-sm text-red-300">
      {message}
    </p>
  );
}

export default function ContactUs() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const leftSideRef = useRef(null);
  const cooldownTimerRef = useRef(null);

  const turnstile = useTurnstile(TURNSTILE_SITE_KEY);

  // Check if we're on client side
  useEffect(() => {
    setIsClient(true);
    return () => clearTimeout(cooldownTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Only run animations on client

    // Entrance animations
    if (leftSideRef.current && formRef.current) {
      gsap.fromTo(
        leftSideRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        formRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [isClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Re-check as they type only once a field has been visited, so errors
    // don't appear before the visitor has finished typing.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: formData[name],
    onChange: handleInputChange,
    onBlur: handleBlur,
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const showSuccess = () => {
    setSubmitStatus({ type: "success", message: SUCCESS_MESSAGE });
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});

    // Success animation - only run on client
    if (isClient && formRef.current) {
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  const startCooldown = () => {
    setIsCoolingDown(true);
    clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(
      () => setIsCoolingDown(false),
      RATE_LIMIT_COOLDOWN_MS
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isCoolingDown) return;
    setSubmitStatus(null);

    const form = e.currentTarget;
    const { data, errors: validationErrors, isValid } = validateContactForm(formData);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(INITIAL_FORM).map((key) => [key, true])));
    if (!isValid) {
      const firstInvalid = Object.keys(validationErrors)[0];
      form.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    // Honeypot: the "website" field is hidden from people, so only bots fill
    // it. Show success so they have no signal to adapt to, but send nothing.
    if (formData.website) {
      showSuccess();
      return;
    }

    const turnstileToken = turnstile.getToken();
    if (!turnstileToken) {
      setSubmitStatus({ type: "error", message: TURNSTILE_REQUIRED });
      return;
    }

    // Submit animation - only run on client
    if (isClient && formRef.current) {
      gsap.to(formRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    setIsSubmitting(true);
    try {
      // No automatic retry: if the network result is uncertain, a retry could
      // create a duplicate submission.
      await submitDreamfoxContactUs(data, turnstileToken);
      showSuccess();
    } catch (error) {
      if (!(error instanceof ContactSubmitError)) {
        console.error("Contact form submission failed:", error);
      }
      const fieldErrors = error.fieldErrors || {};
      const invalidFields = Object.keys(fieldErrors);
      if (invalidFields.length) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        form.elements.namedItem(invalidFields[0])?.focus();
      }
      if (error.status === 429) startCooldown();
      // Entered values are kept so the visitor can retry.
      setSubmitStatus({
        type: "error",
        message: error instanceof ContactSubmitError ? error.message : CONTACT_MESSAGES.generic,
      });
    } finally {
      // Turnstile tokens are single-use: get a fresh one for the next attempt.
      turnstile.reset();
      setIsSubmitting(false);
    }
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Improved gradient glow - positioned above content area only */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#DC6263]/40 via-[#D2448D]/30 to-transparent opacity-60 blur-[120px] rounded-full"></div>

      {/* Secondary focused glow */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#DC6263]/30 via-[#D2448D]/20 to-transparent opacity-40 blur-[80px] rounded-full"></div>

      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-7">
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-[200px] font-bold text-white select-none">
          CONTACT US
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-0 lg:gap-10 max-w-7xl mx-auto px-6 py-32 sm:py-44 xl:py-24 relative z-10 min-h-screen">
        {/* Left Side - Contact Info */}
        <div ref={leftSideRef} className="flex-1 max-w-lg">
          {/* Enhanced Header Badge */}
          <div className="hidden sm:inline-flex items-center space-x-3 text-white mb-8 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg">
            <div className="w-4 h-4 bg-gradient-to-r from-[#DC6263] to-[#D2448D] rounded-full animate-pulse shadow-md"></div>
            <span className="text-sm font-medium tracking-wide">Contact</span>
          </div>

          <h1 className="text-60 font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text ">
            Get in touch
          </h1>

          <p className="hidden sm:block text-xl text-gray-300 mb-6 sm:mb-12 leading-relaxed">
            Have questions or ready to transform your business with AI
            automation? <br />
            <span className="text-transparent bg-gradient-to-r from-[#DC6263] to-[#D2448D] bg-clip-text font-semibold">
              Let's create something amazing together.
            </span>
          </p>

          {/* Enhanced Glassmorphism Contact Cards */}
          <div className="hidden sm:block space-y-4">
            {/* Email Card */}

            {/* Phone Card */}

            {/* Location Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/50 to-[#DC6263]/50 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 hover:bg-white/15 transition-all duration-500 cursor-pointer shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#DC6263] to-[#D2448D] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Our location
                      </h3>
                      <p className="text-gray-300">
                        Virtuos Corporation, Suite 203, 2880 Zanker Road, San
                        Jose CA 95134 USA
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/20">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Glassmorphism Form */}
        <div
          ref={formRef}
          className="sm:flex-1 w-full sm:max-w-2xl sm:ml-12 h-full flex items-center"
        >
          <div className="relative w-full">
            {/* Form outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#DC6263]/30 via-[#D2448D]/40 to-[#DC6263]/30 rounded-3xl blur-xl opacity-50"></div>

            {/* Main form container */}
            <div className="relative bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot: hidden from people and screen readers. Bots that
                    fill every field are silently dropped in handleSubmit. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px overflow-hidden"
                >
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                <p className="px-2 text-sm text-gray-300">
                  Fields marked <span className="text-[#E7308F] font-semibold">*</span> are required.
                </p>

                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="text"
                        placeholder="First Name"
                        autoComplete="given-name"
                        maxLength={LIMITS.nameMax}
                        required
                        {...fieldProps("firstName")}
                        className={inputClass(errors.firstName, "pr-12")}
                      />
                      <RequiredMark />
                    </div>
                    <FieldError name="firstName" message={errors.firstName} />
                  </div>
                  <div>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        autoComplete="family-name"
                        maxLength={LIMITS.nameMax}
                        required
                        {...fieldProps("lastName")}
                        className={inputClass(errors.lastName, "pr-12")}
                      />
                      <RequiredMark />
                    </div>
                    <FieldError name="lastName" message={errors.lastName} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      autoComplete="email"
                      inputMode="email"
                      maxLength={LIMITS.emailMax}
                      required
                      {...fieldProps("email")}
                      className={inputClass(errors.email, "pr-12")}
                    />
                    <RequiredMark />
                  </div>
                  <FieldError name="email" message={errors.email} />
                </div>

                {/* Phone and Company */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="relative w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 group-hover:bg-white/12 shadow-lg"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="relative w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 group-hover:bg-white/12 shadow-lg"
                    />
                  </div>
                </div> */}

                {/* Subject */}
                <div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="text"
                      placeholder="Subject"
                      maxLength={LIMITS.subjectMax}
                      required
                      {...fieldProps("subject")}
                      className={inputClass(errors.subject, "pr-12")}
                    />
                    <RequiredMark />
                  </div>
                  <FieldError name="subject" message={errors.subject} />
                </div>

                {/* Message */}
                <div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/20 to-[#D2448D]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={5}
                      maxLength={LIMITS.messageMax}
                      {...fieldProps("message")}
                      className={inputClass(errors.message, "resize-none")}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <FieldError name="message" message={errors.message} />
                    <p className="mt-2 px-2 ml-auto text-xs text-gray-400 shrink-0">
                      {formData.message.length}/{LIMITS.messageMax}
                    </p>
                  </div>
                </div>

                {/* Cloudflare Turnstile security check */}
                <div>
                  <div ref={turnstile.containerRef} className="min-h-[65px]" />
                  {turnstile.hasError && (
                    <p className="mt-2 px-2 text-sm text-red-300">
                      The security check couldn't load. Please refresh the page and try again.
                    </p>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div
                    role={submitStatus.type === "error" ? "alert" : "status"}
                    className={`p-4 rounded-2xl border ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 border-green-500/30"
                        : "bg-red-500/20 border-red-500/30"
                    }`}
                  >
                    <p
                      className={`text-center ${
                        submitStatus.type === "success"
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isCoolingDown}
                  className="relative w-full group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DC6263] via-[#D2448D] to-[#DC6263] rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DC6263] via-[#D2448D] to-[#DC6263] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-[#DC6263] via-[#D2448D] to-[#DC6263] text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02] group-active:scale-[0.98]">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-4 w-full sm:hidden">
          {/* Email Card */}

          {/* Phone Card */}

          {/* Location Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC6263]/50 to-[#DC6263]/50 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 hover:bg-white/15 transition-all duration-500 cursor-pointer shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#DC6263] to-[#D2448D] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Our location
                    </h3>
                    <p className="text-gray-300">
                      Virtuos Corporation, Suite 203, 2880 Zanker Road, San Jose
                      CA 95134 USA
                    </p>
                  </div>
                </div>
                {/* <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating refresh button */}
      {/* <div className="fixed bottom-8 right-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#DC6263] to-[#D2448D] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
        <button className="relative w-16 h-16 bg-white/10 backdrop-blur-2xl hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20 group-hover:scale-110 shadow-2xl">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
}
