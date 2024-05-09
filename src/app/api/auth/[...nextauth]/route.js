import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
