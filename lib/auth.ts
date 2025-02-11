"use server";
import { Lucia, Cookie } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";

// export type CookieType = {
//   name: string;
//   value: string;
//   attributes: {
//     httpOnly: boolean;
//     secure: boolean;
//     sameSite: "lax" | "strict" | "none";
//     path: string;
//     maxAge: number;
//   };
// };

export type VerifyAuthResult = {
  user: {
    id: string;
  } | null;
  session: {
    id: string;
    userId: string;
    fresh: boolean;
    expiresAt: Date;
  } | null;
};

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const createAuthSession = async (userId: string): Promise<Cookie> => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  console.log("123", sessionCookie);
  return sessionCookie;
};

export const verifyAuth = async (): Promise<VerifyAuthResult> => {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }
  const sessionId = sessionCookie.value;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("Error verifying auth session:", error);
  }
  console.log(result);
  return result;
};

export const destroySession = async (): Promise<{ error?: string }> => {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {};
};
