import Users from "@/components/admin/Users";
import { getCookieName } from "@/lib/Helper";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import queryString from "query-string";

async function getUsers(searchParams) {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const urlParams = {
    page: searchParams.page || 1,
  };
  const searchQuery = queryString.stringify(urlParams);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users/getUsers?${searchQuery}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data;
}

const page = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const users = await getUsers(searchParams);
  return <Users users={users} />;
};

export default page;
