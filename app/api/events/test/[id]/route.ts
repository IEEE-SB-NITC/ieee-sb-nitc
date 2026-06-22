import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data: event } = await supabase
    .from("events")
    .select("society_id, created_by")
    .eq("id", id)
    .single()

  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 })

  const callerRole = session.user.role
  if (
    ["society_admin", "society_member"].includes(callerRole) &&
    event.society_id !== session.user.societyId
  ) {
    return NextResponse.json({ error: "Cannot delete events from other societies" }, { status: 403 })
  }

  const { error } = await supabase.from("events").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
