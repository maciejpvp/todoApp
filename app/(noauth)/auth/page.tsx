import { login, signUp } from "@/actions/auth-actions";
import { FormInput } from "@/components/Auth/FormInput";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { mode: string };
}) {
  const formMode = (await searchParams).mode;
  if (!formMode) {
    redirect("/auth?mode=login");
  }
  return (
    <div className="h-dvh w-dvw bg-[rgb(20,19,16)] flex justify-center items-center">
      <form
        action={formMode === "login" ? login : signUp}
        className="bg-stone-900 flex flex-col gap-5 p-7 rounded-md text-center text-stone-300"
      >
        <h1 className="text-2xl font-semibold">
          {formMode === "login" ? "Log In" : "Sign Up"}
        </h1>
        <div className="flex flex-col gap-3">
          <FormInput placeholder="email" required />
          <FormInput placeholder="password" required />
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
}
