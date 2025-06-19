import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const enableAuth = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = session.user || { name: "Guest", email: "guest@example.com" };
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
};

export default enableAuth
  ? (req, res) => NextAuth(req, res, authOptions)
  : (req, res) => {
      res.status(404).json({ error: "Authentication is disabled" });
    };
