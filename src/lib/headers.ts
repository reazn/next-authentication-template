import { headers } from "next/headers"

export const getIp = () => {
  const forwardedFor = headers().get("x-forwarded-for");
  const ip = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return ip || null;
}

export const getUserAgent = () => {
  return headers().get("User-Agent") || null;
}