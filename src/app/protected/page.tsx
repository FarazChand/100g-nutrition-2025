import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import SignOutButton from "../../components/SignoutButton";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <SignOutButton />

      <p>Hello {session.user.email}, you're signed in!</p>
    </div>
  );
}
