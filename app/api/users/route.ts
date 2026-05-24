import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"
import { canManage } from "@/lib/roles"

export async function GET() {
  const session = await auth()
  if (!session?.user?.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const query = supabase
    .from("users")
    .select("id, email, name, role, society_id, is_active, created_at, societies(name, slug)")
    .order("created_at", { ascending: false })

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const session = await auth()
  const callerRole = session?.user?.role

  if (!callerRole || callerRole === "society_member") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const { email, name, role, society_id } = body

  if (!email || !role) {
    return NextResponse.json({ error: "email and role are required" }, { status: 400 })
  }

  if (!canManage(callerRole, role)) {
    return NextResponse.json({ error: "Cannot assign a role at or above your own" }, { status: 403 })
  }

  if (callerRole === "society_admin" && society_id !== session.user.societyId) {
    return NextResponse.json({ error: "Cannot add users to other societies" }, { status: 403 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("users")
    .insert({
      email,
      name: name || null,
      role,
      society_id: society_id || null,
      added_by: session.user.email,
      is_active: false,
    })
    .select()
    .single()

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "This email is already in the allowlist." }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
