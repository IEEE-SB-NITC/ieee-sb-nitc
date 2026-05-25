import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"
import { canManage } from "@/lib/roles"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  const callerRole = session?.user?.role

  if (!callerRole || callerRole === "society_member") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = createAdminClient()
  const { data: target } = await supabase
    .from("users")
    .select("role, society_id, email")
    .eq("id", id)
    .single()

  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 })

  if (target.email === session.user.email) {
    return NextResponse.json({ error: "Cannot remove yourself" }, { status: 400 })
  }

  if (!canManage(callerRole, target.role)) {
    return NextResponse.json({ error: "Cannot remove a user at or above your role" }, { status: 403 })
  }

  if (callerRole === "society_admin" && target.society_id !== session.user.societyId) {
    return NextResponse.json({ error: "Cannot remove users from other societies" }, { status: 403 })
  }

  const { error } = await supabase.from("users").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
