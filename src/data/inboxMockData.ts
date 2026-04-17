import { Mail, MessageCircle, Facebook, Instagram, Twitter, Send, Bot, Webhook, LucideIcon } from "lucide-react";

export type ChannelKey = "email" | "whatsapp" | "facebook" | "instagram" | "twitter" | "telegram" | "chatbot" | "webhook";

export interface ChannelMeta {
  key: ChannelKey;
  name: string;
  icon: LucideIcon;
  color: string; // tailwind class for chip
  connected: boolean;
  lastSync?: string;
  messagesToday?: number;
  webhookUrl?: string;
  config?: Record<string, string>;
}

export const channels: ChannelMeta[] = [
  { key: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "text-channel-whatsapp", connected: true, lastSync: "2 min ago", messagesToday: 142, webhookUrl: "https://api.dic.notify/webhooks/wa/abc123", config: { number: "+91 80123 45678" } },
  { key: "email", name: "Email", icon: Mail, color: "text-blue-500", connected: true, lastSync: "5 min ago", messagesToday: 38, webhookUrl: "https://api.dic.notify/webhooks/email/xyz", config: { imap: "imap.gmail.com", smtp: "smtp.gmail.com" } },
  { key: "facebook", name: "Facebook Messenger", icon: Facebook, color: "text-blue-600", connected: true, lastSync: "12 min ago", messagesToday: 27, webhookUrl: "https://api.dic.notify/webhooks/fb/page1", config: { pageId: "1029384756" } },
  { key: "instagram", name: "Instagram DM", icon: Instagram, color: "text-pink-500", connected: false },
  { key: "twitter", name: "X / Twitter DM", icon: Twitter, color: "text-foreground", connected: false },
  { key: "telegram", name: "Telegram", icon: Send, color: "text-sky-500", connected: true, lastSync: "1 min ago", messagesToday: 19, webhookUrl: "https://api.dic.notify/webhooks/tg/bot", config: { botToken: "••••••••6789" } },
  { key: "chatbot", name: "Web Chatbot", icon: Bot, color: "text-purple-500", connected: true, lastSync: "just now", messagesToday: 86, webhookUrl: "https://api.dic.notify/webhooks/chat/widget", config: { widgetId: "wgt_8821" } },
  { key: "webhook", name: "Custom Webhook", icon: Webhook, color: "text-orange-500", connected: false },
];

export interface InboxMessage {
  id: string;
  direction: "in" | "out" | "note";
  body: string;
  at: string;
  author: string;
}

export interface Conversation {
  id: string;
  contact: string;
  contactHandle: string;
  channel: ChannelKey;
  status: "open" | "pending" | "closed";
  unread: boolean;
  assignee?: string;
  preview: string;
  updatedAt: string;
  tags: string[];
  ticketId?: string;
  messages: InboxMessage[];
}

export const agents = ["Priya Shah", "Arjun Mehta", "Neha Iyer", "Rohit Khanna"];

export const conversations: Conversation[] = [
  {
    id: "c1", contact: "Aarav Sharma", contactHandle: "+91 98201 23456", channel: "whatsapp", status: "open", unread: true,
    assignee: "Priya Shah", preview: "Hi, I haven't received the OTP for my recharge…", updatedAt: "2m", tags: ["billing", "vip"],
    messages: [
      { id: "m1", direction: "in", body: "Hi, I haven't received the OTP for my recharge.", at: "10:32", author: "Aarav Sharma" },
      { id: "m2", direction: "in", body: "Can you please check? Order #DIC-88291", at: "10:33", author: "Aarav Sharma" },
    ],
  },
  {
    id: "c2", contact: "Meera Krishnan", contactHandle: "meera@acme.in", channel: "email", status: "open", unread: true,
    preview: "Subject: Quotation for bulk SMS — 500k credits", updatedAt: "14m", tags: ["sales"],
    messages: [
      { id: "m1", direction: "in", body: "Hello team, requesting a quotation for 500k SMS credits monthly.", at: "10:18", author: "Meera Krishnan" },
    ],
  },
  {
    id: "c3", contact: "Rahul Verma", contactHandle: "@rahulv", channel: "facebook", status: "pending", unread: false,
    assignee: "Arjun Mehta", preview: "Thanks, waiting for the agent reply.", updatedAt: "1h", tags: ["support"],
    ticketId: "TKT-1042",
    messages: [
      { id: "m1", direction: "in", body: "My campaign isn't going out since morning.", at: "09:10", author: "Rahul Verma" },
      { id: "m2", direction: "out", body: "Looking into this, will update shortly.", at: "09:14", author: "Arjun Mehta" },
      { id: "m3", direction: "in", body: "Thanks, waiting for the agent reply.", at: "09:15", author: "Rahul Verma" },
    ],
  },
  {
    id: "c4", contact: "Web Visitor #8821", contactHandle: "anonymous", channel: "chatbot", status: "open", unread: true,
    preview: "Need pricing for IVRS plan", updatedAt: "3m", tags: ["pricing"],
    messages: [
      { id: "m1", direction: "in", body: "Need pricing for IVRS plan", at: "10:34", author: "Web Visitor" },
    ],
  },
  {
    id: "c5", contact: "Sanjay Patel", contactHandle: "+91 99876 54321", channel: "telegram", status: "open", unread: false,
    assignee: "Neha Iyer", preview: "Got the report, thanks!", updatedAt: "22m",  tags: [],
    messages: [
      { id: "m1", direction: "in", body: "Can you send the weekly report?", at: "09:55", author: "Sanjay Patel" },
      { id: "m2", direction: "out", body: "Sent over email.", at: "10:02", author: "Neha Iyer" },
      { id: "m3", direction: "in", body: "Got the report, thanks!", at: "10:12", author: "Sanjay Patel" },
    ],
  },
  {
    id: "c6", contact: "Divya Nair", contactHandle: "@divyan", channel: "instagram", status: "closed", unread: false,
    assignee: "Rohit Khanna", preview: "Resolved — thanks!", updatedAt: "Yesterday",  tags: ["resolved"],
    ticketId: "TKT-1031",
    messages: [
      { id: "m1", direction: "in", body: "DM about the offer banner", at: "Yesterday", author: "Divya Nair" },
      { id: "m2", direction: "out", body: "Shared the link, please check.", at: "Yesterday", author: "Rohit Khanna" },
      { id: "m3", direction: "in", body: "Resolved — thanks!", at: "Yesterday", author: "Divya Nair" },
    ],
  },
  {
    id: "c7", contact: "Karthik R", contactHandle: "karthik@startup.io", channel: "email", status: "open", unread: false,
    preview: "Re: API integration help", updatedAt: "2h", tags: ["dev"],
    messages: [
      { id: "m1", direction: "in", body: "We're integrating your send API but getting 401.", at: "08:40", author: "Karthik R" },
    ],
  },
  {
    id: "c8", contact: "Anita Joshi", contactHandle: "+91 90011 22334", channel: "whatsapp", status: "open", unread: true,
    preview: "When will my campaign DLR be ready?", updatedAt: "5m", tags: ["dlr"],
    messages: [
      { id: "m1", direction: "in", body: "When will my campaign DLR be ready?", at: "10:30", author: "Anita Joshi" },
    ],
  },
];

export const channelIcon = (key: ChannelKey) => channels.find(c => c.key === key)!.icon;
export const channelName = (key: ChannelKey) => channels.find(c => c.key === key)!.name;
export const channelColor = (key: ChannelKey) => channels.find(c => c.key === key)!.color;
