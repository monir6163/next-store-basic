import UpdateUser from "@/components/admin/UpdateUser";
import { getCookieName } from "@/lib/Helper";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSignleUser(params) {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users/singleUser?id=${params?.id}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data;
}

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await getSignleUser(params);
  return <UpdateUser user={user?.user} id={params?.id} />;
};

export default page;
