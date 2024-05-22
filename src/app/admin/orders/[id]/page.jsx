import UpdateOrder from "@/components/admin/UpdateOrder";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getOrders(params) {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders/details?id=${params?.id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
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
