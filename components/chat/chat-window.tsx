"use client"

import { useState, useRef, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Image,
  FileText,
  Smile
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  sender: "me" | "other"
  timestamp: string
  status?: "sent" | "delivered" | "read"
}

interface ChatWindowProps {
  contact: {
    name: string
    avatar?: string
    status: "online" | "offline" | "away"
    role: string
  }
  messages: Message[]
  onSendMessage?: (message: string) => void
}

export function ChatWindow({ contact, messages: initialMessages, onSendMessage }: ChatWindowProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages([...messages, message])
    setNewMessage("")
    onSendMessage?.(newMessage)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const statusColors = {
    online: "bg-success",
    offline: "bg-muted-foreground",
    away: "bg-warning",
  }

  return (
    <GlassCard className="flex flex-col h-[600px] p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
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
          <div>
            <h3 className="font-semibold text-foreground">{contact.name}</h3>
            <p className="text-xs text-muted-foreground">{contact.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Video className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Search in Chat</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2",
                message.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <div
                className={cn(
                  "flex items-center gap-1 mt-1 text-xs",
                  message.sender === "me" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                )}
              >
                <span>{message.timestamp}</span>
                {message.sender === "me" && message.status && (
                  <span className="text-xs">
                    {message.status === "read" ? "Read" : message.status === "delivered" ? "Delivered" : "Sent"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Paperclip className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Image className="w-4 h-4 mr-2" />
                Image
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
            <Smile className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            className="h-9 w-9 shrink-0 gradient-primary"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
