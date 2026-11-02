import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import "./admin.css"

export default async function AdminLayout({ children }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      {/*
        admin-scope: contains Tailwind's scoped preflight reset so it does NOT
        bleed into the public site when the user navigates admin → home via
        Next.js client-side navigation (CSS chunks stay loaded in the SPA).
      */}
      <div className="admin-scope min-h-screen">
        {children}
      </div>
    </SessionProvider>
  )
}
