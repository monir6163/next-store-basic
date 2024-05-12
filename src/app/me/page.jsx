import Profile from "@/components/Profile";
import axios from "axios";
import { cookies } from "next/headers";

async function getAddresses() {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  const { data } = await axios.get(`${process.env.API_URL}/api/address/get`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });
  return data.address;
}

const page = async () => {
  const addresses = await getAddresses();
  return <Profile addresses={addresses} />;
};

export default page;
