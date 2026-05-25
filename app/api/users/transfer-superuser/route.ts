import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"

export async function POST(req: Request) {
  const session = await auth()

  if (session?.user?.role !== "superuser") {
    return NextResponse.json({ error: "Only the superuser can transfer this role." }, { status: 403 })
  }

  const { targetId } = await req.json()
  if (!targetId) {
    return NextResponse.json({ error: "targetId is required." }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data: target } = await supabase
    .from("users")
    .select("id, email, role")
    .eq("id", targetId)
    .single()

  if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 })
  if (target.email === session.user.email) {
    return NextResponse.json({ error: "Cannot transfer to yourself." }, { status: 400 })
  }
  if (!target.is_active) {
    return NextResponse.json({ error: "Cannot transfer to a user who has not signed in yet." }, { status: 400 })
  }

  // Promote target → superuser, demote caller → sb_admin
  await supabase.from("users").update({ role: "superuser" }).eq("id", targetId)
  await supabase.from("users").update({ role: "sb_admin" }).eq("email", session.user.email)

  return NextResponse.json({ success: true })
}
