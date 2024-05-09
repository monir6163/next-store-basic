import connectDB from "@/backend/config/db";
import User from "@/backend/models/user";
import bycrypt from "bcryptjs";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          connectDB();
          const { email, password } = credentials;
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid email or password");
          }
          const isMatch = await bycrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error("Invalid email or password");
          }
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ session, token, user, trigger }) {
      if (trigger === "update") {
        const getUpdate = await User.findById(session.user._id).select(
          "+password"
        );
        return { ...token, ...getUpdate };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // delete token._doc.password;
      delete token._doc.password;
      return {
        ...session,
        user: {
          ...session.user,
          ...token._doc,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
