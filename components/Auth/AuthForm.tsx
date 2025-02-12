"use client";
import Link from "next/link";
import { FormInput } from "./FormInput";
import { auth } from "@/actions/auth-actions";
import { useActionState } from "react";

export const AuthForm = ({ formMode }: { formMode: string }) => {
  const [formState, formAction] = useActionState(auth.bind(null, formMode), {});
  return (
    <div className="h-dvh w-dvw bg-[rgb(20,19,16)] flex justify-center items-center">
      <form
        action={formAction}
        className="bg-stone-900 flex flex-col gap-5 p-7 rounded-md text-center text-stone-300"
      >
        <h1 className="text-2xl font-semibold">
          {formMode === "login" ? "Log In" : "Sign Up"}
        </h1>
        <div className="flex flex-col gap-3">
          <div>
            <FormInput placeholder="email" />
            {formState?.email && <p className="text-sm">{formState.email}</p>}
          </div>
          <div>
            <FormInput placeholder="password" />
            {formState?.password && (
              <p className="text-sm">{formState.password}</p>
            )}
          </div>
        </div>
        <button className="bg-stone-800 p-2 rounded-md font-semibold transition-all duration-100 hover:bg-stone-700 hover:scale-105">
          {formMode === "login" ? "Log In" : "Sign Up"}
        </button>
        <Link
          href={
            formMode === "signup" ? "/auth?mode=login" : "/auth?mode=signup"
          }
          className="text-stone-300"
        >
          {formMode === "signup"
            ? "Already has an account?"
            : "No account yet?"}
        </Link>
      </form>
    </div>
  );
};
