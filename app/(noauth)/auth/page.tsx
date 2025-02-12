import { AuthForm } from "@/components/Auth/AuthForm";
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
  return <AuthForm formMode={formMode} />;
}
