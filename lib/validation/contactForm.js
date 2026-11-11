/**
 * Contact form validation used by components/Contactus before submitting to
 * the CMS form API. This gives instant feedback and cleans values; the CMS
 * API remains the real gate and validates again on its side.
 */

export const LIMITS = {
  nameMax: 50,
  emailMax: 254,
  emailLocalMax: 64,
  subjectMin: 2,
  subjectMax: 150,
  messageMin: 10,
  messageMax: 2000,
  messageMaxLinks: 3,
  shortTextMax: 100,
  addressMax: 200,
  pageUrlMax: 2048,
  phoneMax: 20,
  phoneDigitsMin: 7,
  phoneDigitsMax: 15,
};

// Control characters (except tab/newline), zero-width characters and bidi
// overrides, which are used to hide or spoof content.
const CONTROL_CHARS =
  /[\u0000-\u0008\u000B-\u001F\u007F-\u009F​-‏‪-‮⁦-⁩﻿]/g;
const HTML_TAG = /<\s*\/?\s*[a-z!?][^>]*>/i;
const SCRIPT_URL = /\b(?:javascript|vbscript)\s*:|\bdata:[a-z]+\/[a-z0-9.+-]+[;,]/i;
const LINK = /\b(?:https?:\/\/|www\.)\S+/gi;
// Letters in any script, plus inner spaces, hyphens, apostrophes and periods.
const NAME = /^\p{L}(?:[\p{L}\p{M}'’. -]*[\p{L}\p{M}.])?$/u;
const EMAIL =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;
const PHONE = /^\+?[\d\s().-]+$/;
const HAS_LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;

const hasUnsafeMarkup = (value) => HTML_TAG.test(value) || SCRIPT_URL.test(value);

/** Single-line text: collapses all whitespace (incl. CR/LF, blocking header injection). */
export function cleanLine(value) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .replace(CONTROL_CHARS, "")
    .trim();
}

/** Multi-line text: keeps line breaks, normalises them and strips control characters. */
export function cleanMultiline(value) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function validateName(value, label) {
  if (!value) return `${label} is required.`;
  if (value.length > LIMITS.nameMax) {
    return `${label} must be ${LIMITS.nameMax} characters or fewer.`;
  }
  if (!NAME.test(value)) {
    return `${label} can only contain letters, spaces, hyphens, apostrophes and periods.`;
  }
  return "";
}

export function validateEmail(value) {
  if (!value) return "Email is required.";
  if (value.length > LIMITS.emailMax) return "Email address is too long.";
  const local = value.slice(0, value.lastIndexOf("@"));
  if (!EMAIL.test(value) || local.length > LIMITS.emailLocalMax) {
    return "Enter a valid email address, e.g. name@company.com.";
  }
  return "";
}

export function validateSubject(value) {
  if (!value) return "Subject is required.";
  if (value.length < LIMITS.subjectMin) {
    return `Subject must be at least ${LIMITS.subjectMin} characters.`;
  }
  if (value.length > LIMITS.subjectMax) {
    return `Subject must be ${LIMITS.subjectMax} characters or fewer.`;
  }
  if (!HAS_LETTER_OR_DIGIT.test(value)) return "Subject must contain letters or numbers.";
  if (hasUnsafeMarkup(value)) return "Subject cannot contain HTML or script content.";
  return "";
}

export function validateMessage(value, { required = false, label = "Message" } = {}) {
  if (!value) return required ? `${label} is required.` : "";
  if (value.length < LIMITS.messageMin) {
    return `${label} must be at least ${LIMITS.messageMin} characters.`;
  }
  if (value.length > LIMITS.messageMax) {
    return `${label} must be ${LIMITS.messageMax} characters or fewer.`;
  }
  if (hasUnsafeMarkup(value)) return `${label} cannot contain HTML or script content.`;
  if ((value.match(LINK) || []).length > LIMITS.messageMaxLinks) {
    return `${label} can include at most ${LIMITS.messageMaxLinks} links.`;
  }
  return "";
}

export function validateOptionalText(value, label, max = LIMITS.shortTextMax) {
  if (!value) return "";
  if (value.length > max) return `${label} must be ${max} characters or fewer.`;
  if (hasUnsafeMarkup(value)) return `${label} cannot contain HTML or script content.`;
  return "";
}

export function validatePhone(value) {
  if (!value) return "";
  const digits = value.replace(/\D/g, "").length;
  if (
    value.length > LIMITS.phoneMax ||
    !PHONE.test(value) ||
    digits < LIMITS.phoneDigitsMin ||
    digits > LIMITS.phoneDigitsMax
  ) {
    return `Enter a valid phone number (${LIMITS.phoneDigitsMin}-${LIMITS.phoneDigitsMax} digits, optional leading +).`;
  }
  return "";
}

function validatePageUrl(value) {
  if (!value) return "";
  if (value.length > LIMITS.pageUrlMax) return "Invalid page URL.";
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:" ? "" : "Invalid page URL.";
  } catch {
    return "Invalid page URL.";
  }
}

// Fields the visitor types. Invalid values block the submission.
const CONTACT_FIELDS = {
  firstName: { clean: cleanLine, validate: (v) => validateName(v, "First name") },
  lastName: { clean: cleanLine, validate: (v) => validateName(v, "Last name") },
  email: { clean: cleanLine, validate: validateEmail },
  subject: { clean: cleanLine, validate: validateSubject },
  message: { clean: cleanMultiline, validate: (v) => validateMessage(v) },
  phoneNumber: { clean: cleanLine, validate: validatePhone },
  company: { clean: cleanLine, validate: (v) => validateOptionalText(v, "Company") },
  designation: { clean: cleanLine, validate: (v) => validateOptionalText(v, "Designation") },
};

// Captured automatically (IP geolocation, current URL). Invalid values are
// dropped rather than blocking the visitor, who cannot see or fix them.
const CONTACT_METADATA = {
  country: { clean: cleanLine, validate: (v) => validateOptionalText(v, "Country") },
  city: { clean: cleanLine, validate: (v) => validateOptionalText(v, "City") },
  address: {
    clean: cleanLine,
    validate: (v) => validateOptionalText(v, "Address", LIMITS.addressMax),
  },
  pageUrl: { clean: cleanLine, validate: validatePageUrl },
};

/** Validates one visitor-entered field; returns an error message or "". */
export function validateContactField(name, value) {
  const field = CONTACT_FIELDS[name];
  return field ? field.validate(field.clean(value)) : "";
}

/**
 * Cleans and validates a contact submission. `data` holds only allow-listed
 * fields (unknown keys are discarded); `errors` maps field name to message.
 */
export function validateContactForm(raw) {
  const input = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const data = {};
  const errors = {};

  for (const [name, field] of Object.entries(CONTACT_FIELDS)) {
    data[name] = field.clean(input[name]);
    const error = field.validate(data[name]);
    if (error) errors[name] = error;
  }

  for (const [name, field] of Object.entries(CONTACT_METADATA)) {
    const value = field.clean(input[name]);
    data[name] = value && !field.validate(value) ? value : "";
  }

  return { data, errors, isValid: Object.keys(errors).length === 0 };
}
