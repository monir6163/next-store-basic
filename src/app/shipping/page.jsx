import Shipping from "@/components/Shipping";
import { getCookieName } from "@/lib/Helper";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getAddresses() {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const { data } = await axios.get(`${process.env.API_URL}/api/address/get`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });
  return data.address;
}

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const addresses = await getAddresses();
  return <Shipping addresses={addresses} />;
};

export default page;
