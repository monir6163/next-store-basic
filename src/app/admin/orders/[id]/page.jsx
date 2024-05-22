import UpdateOrder from "@/components/admin/UpdateOrder";
import { getCookieName } from "@/lib/Helper";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getOrders(params) {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders/details?id=${params?.id}`,
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
  const orders = await getOrders(params);
  return <UpdateOrder orders={orders} id={params?.id} />;
};

export default page;
