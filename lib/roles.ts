export const ROLES = ["superuser", "sb_admin", "society_admin", "society_member"] as const
export type Role = (typeof ROLES)[number]

export const ROLE_RANK: Record<Role, number> = {
  superuser: 4,
  sb_admin: 3,
  society_admin: 2,
  society_member: 1,
}

export const ROLE_LABELS: Record<Role, string> = {
  superuser: "Superuser",
  sb_admin: "SB Admin",
  society_admin: "Society Admin",
  society_member: "Society Member",
}

export function canManage(callerRole: string, targetRole: string): boolean {
  return (ROLE_RANK[callerRole as Role] ?? 0) > (ROLE_RANK[targetRole as Role] ?? 0)
}

export function roleLabel(role: string): string {
  return ROLE_LABELS[role as Role] ?? role
}

export function managableRoles(callerRole: string): Role[] {
  const rank = ROLE_RANK[callerRole as Role] ?? 0
  return ROLES.filter((r) => ROLE_RANK[r] < rank)
}
