import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"

export async function GET(req: Request) {
  const supabase = createAdminClient()
  const { searchParams } = new URL(req.url)
  const societyId = searchParams.get("society_id")

  let query = supabase
    .from("events")
    .select("id, title, description, date, society_id, created_by, created_at, societies(name, slug)")
    .order("date", { ascending: false })

  if (societyId) query = query.eq("society_id", societyId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { title, description, date, society_id } = body

  if (!title || !date || !society_id) {
    return NextResponse.json({ error: "title, date, and society_id are required" }, { status: 400 })
  }

  const callerRole = session.user.role
  if (
    ["society_admin", "society_member"].includes(callerRole) &&
    society_id !== session.user.societyId
  ) {
    return NextResponse.json({ error: "Cannot create events for other societies" }, { status: 403 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("events")
    .insert({ title, description, date, society_id, created_by: session.user.email })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
