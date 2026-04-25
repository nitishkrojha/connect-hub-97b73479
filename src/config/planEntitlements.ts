/**
 * Single source of truth for plan-based feature gating.
 * Used by sidebar visibility, route guards, and inline lock badges.
 */

export type Plan = "starter" | "growth" | "enterprise";

export const PLAN_LABELS: Record<Plan, string> = {
  starter: "Starter",
  growth: "Growth",
  enterprise: "Enterprise",
};

export const PLAN_TAGLINES: Record<Plan, string> = {
  starter: "For small teams getting started",
  growth: "For growing CX & marketing teams",
  enterprise: "For high-volume brands with AI",
};

export interface PlanEntitlements {
  // Send
  sendChannels: ("SMS" | "WhatsApp" | "Email" | "RCS")[];
  contactSyncApi: boolean;
  dicSelfConfig: boolean; // false = trial-only DIC config
  // Inbox
  inboxChannels: ("Email" | "WebChat" | "Webhook" | "WhatsApp" | "Instagram" | "Facebook" | "Telegram")[];
  // Voice
  voiceDashboard: boolean; // free for all
  clickToCall: boolean;
  voiceBroadcast: boolean;
  ivrStudio: boolean; // false on Starter (event-webhook view only)
  inboundCalls: boolean;
  // AI
  aiAgent: boolean;
  // Settings
  sso: boolean;
  auditLogs: boolean;
}

export const PLAN_ENTITLEMENTS: Record<Plan, PlanEntitlements> = {
  starter: {
    sendChannels: ["SMS", "Email", "RCS"],
    contactSyncApi: false,
    dicSelfConfig: false,
    inboxChannels: ["Email", "WebChat", "Webhook"],
    voiceDashboard: true,
    clickToCall: true, // metered
    voiceBroadcast: true, // metered
    ivrStudio: false,
    inboundCalls: false,
    aiAgent: false,
    sso: false,
    auditLogs: false,
  },
  growth: {
    sendChannels: ["SMS", "WhatsApp", "Email", "RCS"],
    contactSyncApi: true,
    dicSelfConfig: true,
    inboxChannels: ["Email", "WebChat", "Webhook", "WhatsApp", "Instagram", "Facebook", "Telegram"],
    voiceDashboard: true,
    clickToCall: true,
    voiceBroadcast: true,
    ivrStudio: true,
    inboundCalls: true,
    aiAgent: false,
    sso: false,
    auditLogs: true,
  },
  enterprise: {
    sendChannels: ["SMS", "WhatsApp", "Email", "RCS"],
    contactSyncApi: true,
    dicSelfConfig: true,
    inboxChannels: ["Email", "WebChat", "Webhook", "WhatsApp", "Instagram", "Facebook", "Telegram"],
    voiceDashboard: true,
    clickToCall: true,
    voiceBroadcast: true,
    ivrStudio: true,
    inboundCalls: true,
    aiAgent: true,
    sso: true,
    auditLogs: true,
  },
};

export type FeatureKey =
  | "send.whatsapp"
  | "send.contactSyncApi"
  | "send.dicSelfConfig"
  | "inbox.whatsapp"
  | "inbox.social"
  | "voice.ivrStudio"
  | "voice.broadcast"
  | "voice.clickToCall"
  | "voice.inbound"
  | "ai.agent"
  | "settings.sso"
  | "settings.audit";

export const FEATURE_REQUIRES: Record<FeatureKey, Plan> = {
  "send.whatsapp": "growth",
  "send.contactSyncApi": "growth",
  "send.dicSelfConfig": "growth",
  "inbox.whatsapp": "growth",
  "inbox.social": "growth",
  "voice.ivrStudio": "growth",
  "voice.broadcast": "starter",
  "voice.clickToCall": "starter",
  "voice.inbound": "growth",
  "ai.agent": "enterprise",
  "settings.sso": "enterprise",
  "settings.audit": "growth",
};

const PLAN_RANK: Record<Plan, number> = { starter: 0, growth: 1, enterprise: 2 };

export const planMeets = (current: Plan, required: Plan) =>
  PLAN_RANK[current] >= PLAN_RANK[required];
