import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "fieldnotes_session";
const SESSION_LABEL = "fieldnotes-prototype-playground-session-v1";

export function hasAuthConfiguration() {
  return Boolean(process.env.SITE_PASSWORD && process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32);
}

export function createSessionToken() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must contain at least 32 characters");
  return createHmac("sha256", secret).update(SESSION_LABEL).digest("base64url");
}

export function isValidSession(token: string | undefined) {
  if (!token || !hasAuthConfiguration()) return false;
  const expected = Buffer.from(createSessionToken());
  const actual = Buffer.from(token);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function isValidPassword(candidate: string) {
  const configured = process.env.SITE_PASSWORD;
  if (!configured) return false;
  const expected = Buffer.from(configured);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}
