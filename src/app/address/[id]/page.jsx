import UpdateAddress from "@/components/UpdateAddress";
import { getCookieName } from "@/lib/Helper";
import axios from "axios";
import { cookies } from "next/headers";

async function getAddresses(params) {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/address/update?id=${params?.id}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data.address;
}

const page = async ({ params }) => {
  const addresses = await getAddresses(params);
  return <UpdateAddress id={params?.id} addresses={addresses} />;
};

export default page;
