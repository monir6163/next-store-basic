import UpdateAddress from "@/components/UpdateAddress";
import axios from "axios";
import { cookies } from "next/headers";

async function getAddresses(params) {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  const { data } = await axios.get(
    `${process.env.API_URL}/api/address/update?id=${params?.id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
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
