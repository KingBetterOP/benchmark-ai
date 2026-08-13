import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const adminUserId =
    process.env.ADMIN_USER_ID;

  if (
    !adminUserId ||
    userId !== adminUserId
  ) {
    redirect("/");
  }

  return children;
}