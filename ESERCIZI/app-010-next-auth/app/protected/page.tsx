import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Area Riservata</h1>
      <p className="mt-4">Ciao {session.user?.name}!</p>
    </div>
  );
}
