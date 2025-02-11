"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!emailRegex.test(email)) {
    console.error("Invalid email format");
  }

  if (!passwordRegex.test(password)) {
    console.error(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
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
};

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email) return;

  const user = getUserByEmail(email);
  if (!user) return;
  const isPasswordValid = verifyPassword(user.password, password);
  if (!isPasswordValid) {
    return;
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
