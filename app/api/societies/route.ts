import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("societies")
    .select("id, name, slug")
    .order("name")

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
