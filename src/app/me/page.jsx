import Profile from "@/components/Profile";
import { getCookieName } from "@/lib/Helper";
import axios from "axios";
import { cookies } from "next/headers";

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
  const addresses = await getAddresses();
  return <Profile addresses={addresses} />;
};

export default page;
