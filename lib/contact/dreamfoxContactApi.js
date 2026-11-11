/**
 * Dreamfox Contact Us -> Virtuos CMS public form API (POST /model-forms).
 * Contract: dreamfox-contact-us-fe-handover.md.
 *
 * The browser calls the API directly, so the config below must be NEXT_PUBLIC_*
 * and ends up in the client bundle. These are public identifiers, not secrets.
 * The Turnstile *secret* key lives only on the backend: never add it here.
 */

// Written out in full on purpose: Next.js only inlines NEXT_PUBLIC_* values
// for literal `process.env.NAME` references.
const API_BASE_URL = process.env.NEXT_PUBLIC_DREAMFOX_API_BASE_URL;
const WEBSITE_UUID = process.env.NEXT_PUBLIC_DREAMFOX_WEBSITE_UUID;
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Names of required env vars that are not set (empty when fully configured). */
export const MISSING_CONTACT_CONFIG = [
  ["NEXT_PUBLIC_DREAMFOX_API_BASE_URL", API_BASE_URL],
  ["NEXT_PUBLIC_DREAMFOX_WEBSITE_UUID", WEBSITE_UUID],
  ["NEXT_PUBLIC_TURNSTILE_SITE_KEY", TURNSTILE_SITE_KEY],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

const REQUEST_TIMEOUT_MS = 20_000;

export const CONTACT_MESSAGES = {
  generic: "We could not send your message. Please try again.",
  unavailable:
    "Our service is temporarily unavailable. Your details are still here, so please try again in a moment.",
  rateLimited: "Please wait and try again shortly.",
  network:
    "We couldn't reach our server. Please check your connection and try again.",
  invalid: "Please correct the highlighted fields.",
};

export class ContactSubmitError extends Error {
  constructor(message, { status = 0, fieldErrors = {}, cause } = {}) {
    super(message, { cause });
    this.name = "ContactSubmitError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

// API field names (and likely snake_case aliases) -> form field names.
const FORM_FIELD_BY_API_FIELD = {
  firstName: "firstName",
  first_name: "firstName",
  lastName: "lastName",
  last_name: "lastName",
  email: "email",
  work_email: "email",
  subject: "subject",
  message: "message",
};

/** Reads `detail` from an error body: a string, or a list of { loc, msg }. */
function readErrorDetail(detail) {
  if (typeof detail === "string") {
    return { message: detail.trim().slice(0, 300), fieldErrors: {} };
  }
  const fieldErrors = {};
  if (Array.isArray(detail)) {
    for (const item of detail) {
      const loc = Array.isArray(item?.loc) ? item.loc : [];
      const apiField = [...loc].reverse().find((key) => key in FORM_FIELD_BY_API_FIELD);
      const field = FORM_FIELD_BY_API_FIELD[apiField];
      if (field && typeof item.msg === "string" && !fieldErrors[field]) {
        fieldErrors[field] = item.msg;
      }
    }
  }
  return { message: "", fieldErrors };
}

const FINGERPRINT_KEY = "dreamfox_client_id";
let fallbackFingerprint;

function randomId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * A random per-session ID the API uses to rate-limit replayed submissions.
 * It holds no personal data and is not an advertising identifier. Session
 * storage keeps it from following the visitor across visits.
 */
function getClientFingerprint() {
  try {
    let id = sessionStorage.getItem(FINGERPRINT_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(FINGERPRINT_KEY, id);
    }
    return id;
  } catch {
    fallbackFingerprint ??= randomId();
    return fallbackFingerprint;
  }
}

/**
 * Submits the Contact Us form. `values` must already be cleaned and validated
 * (see validateContactForm). Resolves with the API body on 2xx, otherwise
 * throws ContactSubmitError with a visitor-safe message.
 */
export async function submitDreamfoxContactUs(values, turnstileToken) {
  if (MISSING_CONTACT_CONFIG.length) {
    console.error(
      `Contact form is not configured. Missing env: ${MISSING_CONTACT_CONFIG.join(", ")}`
    );
    throw new ContactSubmitError(CONTACT_MESSAGES.generic);
  }

  const message = values.message?.trim();
  const body = {
    modelTitle: "Contact Us",
    formType: "enquiry_contact",
    subjectName: "Dreamfox Contact Us",
    firstName: values.firstName.trim(),
    email: values.email.trim().toLowerCase(),
    guideRequested: false,
    formData: {
      lastName: values.lastName.trim(),
      subject: values.subject.trim(),
      ...(message ? { message } : {}),
      clientContext: {
        pagePath: window.location.pathname,
        pageUrl: window.location.href,
        referrer: document.referrer || undefined,
        language: navigator.language,
      },
    },
  };

  let response;
  try {
    response = await fetch(`${API_BASE_URL.replace(/\/+$/, "")}/model-forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Website-UUID": WEBSITE_UUID,
        "X-Turnstile-Token": turnstileToken,
        "X-Client-Fingerprint": getClientFingerprint(),
      },
      body: JSON.stringify(body),
      signal:
        typeof AbortSignal.timeout === "function"
          ? AbortSignal.timeout(REQUEST_TIMEOUT_MS)
          : undefined,
    });
  } catch (error) {
    // Network failure, timeout, or CORS rejection (browser hides which).
    throw new ContactSubmitError(CONTACT_MESSAGES.network, { cause: error });
  }

  const result = await response.json().catch(() => null);
  if (response.ok) return result;

  const { status } = response;
  const detail = readErrorDetail(result?.detail);

  switch (status) {
    case 400: // Missing/invalid website UUID, or Turnstile failed
      throw new ContactSubmitError(detail.message || CONTACT_MESSAGES.generic, { status });
    case 403: // Dreamfox website inactive/not registered in the CMS
      console.error(
        "Contact form: API returned 403 (Dreamfox website inactive or not registered). Notify the CMS team."
      );
      throw new ContactSubmitError(CONTACT_MESSAGES.generic, { status });
    case 422: {
      const hasFieldErrors = Object.keys(detail.fieldErrors).length > 0;
      if (!hasFieldErrors) {
        console.error("Contact form: API returned 422 without field errors", result?.detail);
      }
      throw new ContactSubmitError(
        hasFieldErrors ? CONTACT_MESSAGES.invalid : CONTACT_MESSAGES.generic,
        { status, fieldErrors: detail.fieldErrors }
      );
    }
    case 429:
      throw new ContactSubmitError(CONTACT_MESSAGES.rateLimited, { status });
    case 503:
      throw new ContactSubmitError(CONTACT_MESSAGES.unavailable, { status });
    default:
      console.error("Contact form: unexpected API status", status);
      throw new ContactSubmitError(CONTACT_MESSAGES.generic, { status });
  }
}
