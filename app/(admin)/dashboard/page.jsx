"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { managableRoles, roleLabel, ROLE_RANK } from "@/lib/roles"
import EventsManager from "@/components/Admin/Events/EventsManager";
import GalleryManager from "@/components/Admin/Gallery/GalleryManager";
import styles from "./dashboard.module.css"

// ─── Users Tab ────────────────────────────────────────────────────────────────

function TransferModal({ users, onClose, onTransferred }) {
  const [targetId, setTargetId] = useState("")
  const [confirm, setConfirm] = useState("")
  const [transferring, setTransferring] = useState(false)
  const [error, setError] = useState("")

  const eligibleUsers = users.filter((u) => u.is_active && u.role !== "superuser")

  async function handleTransfer() {
    if (confirm !== "TRANSFER") return
    setTransferring(true)
    setError("")
    const res = await fetch("/api/users/transfer-superuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      setTransferring(false)
    } else {
      onTransferred()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Transfer Superuser Role</h3>
        <p className="text-sm text-slate-500 mb-6">
          This is irreversible. You will be demoted to SB Admin. The selected user becomes the new Superuser.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Transfer to</label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a user</option>
              {eligibleUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name ?? u.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">
              Type <span className="font-mono font-bold text-red-600">TRANSFER</span> to confirm
            </label>
            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="TRANSFER"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-2">
            <button
              onClick={onClose}
              className="text-sm text-slate-500 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleTransfer}
              disabled={confirm !== "TRANSFER" || !targetId || transferring}
              className="text-sm bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 disabled:opacity-40 cursor-pointer"
            >
              {transferring ? "Transferring…" : "Transfer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersSection({ session }) {
  const [users, setUsers] = useState([])
  const [societies, setSocieties] = useState([])
  const isSocietyAdmin = session.user.role === "society_admin"
  const [form, setForm] = useState({ email: "", name: "", role: "", society_id: "" })

  useEffect(() => {
    if (isSocietyAdmin && session.user.societyId) {
      setForm((f) => ({ ...f, society_id: session.user.societyId }))
    }
  }, [isSocietyAdmin, session.user.societyId])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [showTransfer, setShowTransfer] = useState(false)

  const callerRole = session.user.role
  const allowedRoles = managableRoles(callerRole)

  const loadUsers = useCallback(async () => {
    const res = await fetch("/api/users")
    if (res.ok) setUsers(await res.json())
  }, [])

  useEffect(() => {
    loadUsers()
    fetch("/api/societies").then((r) => r.json()).then(setSocieties)
  }, [loadUsers])

  async function handleAdd(e) {
    e.preventDefault()
    setError("")
    setSaving(true)
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        name: form.name || null,
        society_id: isSocietyAdmin ? session.user.societyId : form.society_id,
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      setForm({ email: "", name: "", role: "", society_id: "" })
      await loadUsers()
    }
    setSaving(false)
  }

  async function handleRemove(id) {
    if (!confirm("Remove this user from the allowlist?")) return
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error)
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== id))
    }
  }

  const needsSociety = ["society_admin", "society_member"].includes(form.role)
  const callerIsSocietyAdmin = callerRole === "society_admin"

  return (
    <section className={styles.sectionCard}>
      {showTransfer && (
        <TransferModal
          users={users}
          onClose={() => setShowTransfer(false)}
          onTransferred={() => signOut({ callbackUrl: "/login" })}
        />
      )}

      <div className={styles.sectionHeader}>
        <h2>Manage Users</h2>
        {session.user.role === "superuser" && (
          <button
            onClick={() => setShowTransfer(true)}
            className="text-sm text-red-600 border border-red-300 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Transfer Superuser Role
          </button>
        )}
      </div>
      <p className={styles.description}>Add or remove members from the access allowlist.</p>

      {/* Add user form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-medium">Name <span className="text-slate-400">(optional)</span></label>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-44"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-medium">Email</label>
          <input
            type="email"
            required
            placeholder="user@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-52"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-medium">Role</label>
          <select
            required
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value, society_id: "" }))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select role</option>
            {allowedRoles.map((r) => (
              <option key={r} value={r}>{roleLabel(r)}</option>
            ))}
          </select>
        </div>
        {needsSociety && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Society</label>
            {callerIsSocietyAdmin ? (
              <div className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-600">
                {societies.find((s) => s.id === session.user.societyId)?.name ?? "Your society"}
              </div>
            ) : (
              <select
                required
                value={form.society_id}
                onChange={(e) => setForm((f) => ({ ...f, society_id: e.target.value }))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select society</option>
                {societies.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Adding…" : "Add User"}
        </button>
      </form>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm">
          {error}
        </div>
      )}

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Email</th>
              <th className="pb-2 font-medium">Role</th>
              <th className="pb-2 font-medium">Society</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = u.email === session.user.email
              const canDel =
                !isSelf &&
                (ROLE_RANK[callerRole] ?? 0) > (ROLE_RANK[u.role] ?? 0)
              return (
                <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 pr-4 text-slate-500">{u.name ?? "—"}</td>
                <td className="py-2 pr-4">{u.email}</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block bg-blue-50 text-blue-700 rounded px-2 py-0.5 text-xs font-medium">
                      {roleLabel(u.role)}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-slate-500">
                    {u.societies?.name ?? "—"}
                  </td>
                  <td className="py-2 pr-4">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${u.is_active ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                      {u.is_active ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    {canDel && (
                      <button
                        onClick={() => handleRemove(u.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400 text-sm">
                  No users in the allowlist yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── Events Tab ───────────────────────────────────────────────────────────────

function EventsSection({ session }) {
  const [events, setEvents] = useState([])
  const [societies, setSocieties] = useState([])
  const [form, setForm] = useState({ title: "", description: "", date: "", society_id: "" })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const callerRole = session.user.role
  const isScopedToSociety = ["society_admin", "society_member"].includes(callerRole)

  const loadEvents = useCallback(async () => {
    const url = isScopedToSociety
      ? `/api/events?society_id=${session.user.societyId}`
      : "/api/events"
    const res = await fetch(url)
    if (res.ok) setEvents(await res.json())
  }, [isScopedToSociety, session.user.societyId])

  useEffect(() => {
    loadEvents()
    if (!isScopedToSociety) {
      fetch("/api/societies").then((r) => r.json()).then(setSocieties)
    }
  }, [loadEvents, isScopedToSociety])

  async function handleAdd(e) {
    e.preventDefault()
    setError("")
    setSaving(true)
    const payload = {
      ...form,
      society_id: isScopedToSociety ? session.user.societyId : form.society_id,
    }
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      setForm({ title: "", description: "", date: "", society_id: "" })
      await loadEvents()
    }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!confirm("Delete this event?")) return
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error)
    } else {
      setEvents((prev) => prev.filter((ev) => ev.id !== id))
    }
  }

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2>Events Management</h2>
      </div>
      <p className={styles.description}>Add and manage upcoming events.</p>

      {/* Add event form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-medium">Title</label>
          <input
            required
            type="text"
            placeholder="Event title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-medium">Date</label>
          <input
            required
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {!isScopedToSociety && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Society</label>
            <select
              required
              value={form.society_id}
              onChange={(e) => setForm((f) => ({ ...f, society_id: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select society</option>
              {societies.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-col gap-1 flex-1 min-w-48">
          <label className="text-xs text-slate-500 font-medium">Description (optional)</label>
          <input
            type="text"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Adding…" : "Add Event"}
        </button>
      </form>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Society</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Added by</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 pr-4 font-medium">{ev.title}</td>
                <td className="py-2 pr-4 text-slate-500">{ev.societies?.name ?? "—"}</td>
                <td className="py-2 pr-4 text-slate-500">
                  {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="py-2 pr-4 text-slate-400 text-xs">{ev.created_by}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400 text-sm">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Events")

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading…
      </div>
    )
  }

  const role = session.user.role
  const canManageUsers = ["superuser", "sb_admin", "society_admin"].includes(role)
  const isTopAdmin = ["superuser", "sb_admin"].includes(role)

  const sections = [
    "Events",
    ...(isTopAdmin ? ["Legacies", "Gallery", "Blog"] : []),
    ...(canManageUsers ? ["Users"] : []),
  ]

  if (!sections.includes(activeSection)) setActiveSection(sections[0])

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            {session.user.name} &middot;{" "}
            <span className="text-blue-600 font-medium">{roleLabel(role)}</span>
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Section selector */}
      <div className={styles.selectorContainer}>
        {sections.map((section) => (
          <button
            key={section}
            className={`${styles.selectorButton} ${activeSection === section ? styles.activeButton : ""}`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        {activeSection === "Events" && <EventsSection session={session} />}

        {activeSection === "Users" && canManageUsers && (
          <UsersSection session={session} />}
        {activeSection === "Events" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Events Management</h2>
            </div>
            <p className={styles.description}>
              Add, delete, and manage upcoming events.
            </p>
            <EventsManager />
          </section>
        )}

        {activeSection === "Legacies" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}><h2>Legacies Management</h2></div>
            <p className={styles.description}>Maintain achievements, milestones, and legacy content.</p>
            <div className={styles.workspace}>Legacies management workspace</div>
          </section>
        )}

        {activeSection === "Gallery" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Gallery Management</h2>
            </div>

            <p className={styles.description}>
              Upload and manage public gallery images.
            </p>
            <GalleryManager />
          </section>
        )}

        {activeSection === "Blog" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}><h2>Blog Management</h2></div>
            <p className={styles.description}>Create, edit, and publish blog articles.</p>
            <div className={styles.workspace}>Blog management workspace</div>
          </section>
        )}
      </div>
    </div>
  )
}
