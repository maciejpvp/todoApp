"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AuthResult = {
  email?: string;
  password?: string;
};

export const signUp = async (
  _: unknown,
  formData: FormData
): Promise<AuthResult> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email) {
    return {
      email: "Email is Required",
    };
  }

  if (!password) {
    return {
      password: "Password is Required",
    };
  }

  const hashedPassword = hashUserPassword(password);
  const id = createUser(email, hashedPassword);
  const sessionCookie = await createAuthSession(`${id}`);

  const cookiesStore = await cookies();
  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/dashboard");
};

export const login = async (
  _: unknown,
  formData: FormData
): Promise<AuthResult> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email)
    return {
      email: "Email is required",
    };

  const user = getUserByEmail(email);
  if (!user)
    return {
      email: "Email or password is invalid",
    };
  const isPasswordValid = verifyPassword(user.password, password);
  if (!isPasswordValid) {
    return {
      email: "Email or password is invalid",
    };
  }
  const sessionCookie = await createAuthSession(`${user.id}`);
  const cookiesStore = await cookies();
  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/dashboard");
};

export const logout = async () => {
  await destroySession();
  redirect("/");
};

export const auth = async (mode: string, _: unknown, formData: FormData) => {
  if (mode === "login") {
    return login(_, formData);
  }
  if (mode === "signup") {
    return signUp(_, formData);
  }
};
