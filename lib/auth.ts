import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createAdminClient } from "./supabase"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const supabase = createAdminClient()
      const { data } = await supabase
        .from("users")
        .select("id, is_active")
        .eq("email", user.email)
        .single()

      if (!data) return false

      await supabase
        .from("users")
        .update({ is_active: true, name: user.name ?? null })
        .eq("email", user.email)

      return true
    },

    async jwt({ token, trigger }) {
      if (trigger === "signIn" && token.email) {
        const supabase = createAdminClient()
        const { data } = await supabase
          .from("users")
          .select("role, society_id")
          .eq("email", token.email)
          .single()

        if (data) {
          token.role = data.role
          token.societyId = data.society_id
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token.role) session.user.role = token.role as string
      if (token.societyId !== undefined) session.user.societyId = token.societyId as string | null
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
