"use client"

import { useState } from "react"
import { ChatList } from "@/components/chat/chat-list"
import { ChatWindow } from "@/components/chat/chat-window"
import { GlassCard } from "@/components/ui/glass-card"
import { MessageSquare } from "lucide-react"

// Mock data
const contacts = [
  {
    id: "1",
    name: "Sarah Chen",
    status: "online" as const,
    role: "Full-Stack Developer",
    lastMessage: "I&apos;ve pushed the latest changes to the repo",
    lastMessageTime: "2m ago",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    status: "online" as const,
    role: "Mobile Developer",
    lastMessage: "The app build is ready for testing",
    lastMessageTime: "1h ago",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    status: "away" as const,
    role: "UI/UX Designer",
    lastMessage: "Here are the final mockups",
    lastMessageTime: "3h ago",
  },
  {
    id: "4",
    name: "David Park",
    status: "offline" as const,
    role: "Backend Developer",
    lastMessage: "API integration is complete",
    lastMessageTime: "1d ago",
  },
]

const mockMessages = {
  "1": [
    { id: "1", content: "Hi! How is the project going?", sender: "me" as const, timestamp: "10:30 AM", status: "read" as const },
    { id: "2", content: "Going great! I&apos;ve completed the payment integration", sender: "other" as const, timestamp: "10:32 AM" },
    { id: "3", content: "That&apos;s awesome! Can you show me a demo?", sender: "me" as const, timestamp: "10:33 AM", status: "read" as const },
    { id: "4", content: "Sure! Let me set up a quick call", sender: "other" as const, timestamp: "10:35 AM" },
    { id: "5", content: "I&apos;ve pushed the latest changes to the repo", sender: "other" as const, timestamp: "10:40 AM" },
  ],
  "2": [
    { id: "1", content: "How is the mobile app coming along?", sender: "me" as const, timestamp: "9:00 AM", status: "read" as const },
    { id: "2", content: "Almost done with the iOS version!", sender: "other" as const, timestamp: "9:15 AM" },
    { id: "3", content: "The app build is ready for testing", sender: "other" as const, timestamp: "11:00 AM" },
  ],
  "3": [
    { id: "1", content: "Can you send over the design files?", sender: "me" as const, timestamp: "Yesterday", status: "read" as const },
    { id: "2", content: "Here are the final mockups", sender: "other" as const, timestamp: "Yesterday" },
  ],
  "4": [
    { id: "1", content: "Is the API ready?", sender: "me" as const, timestamp: "Yesterday", status: "read" as const },
    { id: "2", content: "API integration is complete", sender: "other" as const, timestamp: "Yesterday" },
  ],
}

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])

  const currentMessages = mockMessages[selectedContact.id as keyof typeof mockMessages] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Chat with your freelancers and manage conversations</p>
      </div>

      {/* Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1">
          <ChatList
            contacts={contacts}
            selectedId={selectedContact.id}
            onSelectContact={setSelectedContact}
          />
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <ChatWindow
              contact={selectedContact}
              messages={currentMessages}
            />
          ) : (
            <GlassCard className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Choose a contact from the list to start chatting
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
