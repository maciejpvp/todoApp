import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth?mode=login");
  return <div></div>;
}
