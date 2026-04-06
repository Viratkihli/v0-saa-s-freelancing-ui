"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface Contact {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  role: string
  lastMessage: string
  lastMessageTime: string
  unreadCount?: number
}

interface ChatListProps {
  contacts: Contact[]
  selectedId?: string
  onSelectContact: (contact: Contact) => void
}

export function ChatList({ contacts, selectedId, onSelectContact }: ChatListProps) {
  const statusColors = {
    online: "bg-success",
    offline: "bg-muted-foreground",
    away: "bg-warning",
  }

  return (
    <GlassCard className="h-[600px] flex flex-col p-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-9" />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={cn(
              "w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left",
              selectedId === contact.id && "bg-muted/50"
            )}
          >
            <div className="relative shrink-0">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {contact.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                  statusColors[contact.status]
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground truncate">{contact.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{contact.lastMessageTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                {contact.unreadCount && contact.unreadCount > 0 && (
                  <Badge className="ml-2 shrink-0 h-5 w-5 p-0 flex items-center justify-center gradient-primary text-xs">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  )
}
