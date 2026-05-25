import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"

export default async function AdminLayout({ children }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen">
        {children}
      </div>
    </SessionProvider>
  )
}
