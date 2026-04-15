import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, Phone, MessageSquare, Mail, Smartphone, CheckCircle2,
  XCircle, Clock, ArrowDownUp, Download, User, Hash,
} from "lucide-react";

interface CommRecord {
  id: number;
  channel: "SMS" | "WhatsApp" | "Email" | "RCS";
  direction: "Outbound";
  template: string;
  messagePreview: string;
  status: "Delivered" | "Failed" | "Pending" | "Read";
  senderId: string;
  provider: string;
  campaign: string | null;
  sentAt: string;
  deliveredAt: string | null;
  readAt: string | null;
}

const demoHistory: Record<string, { name: string; records: CommRecord[] }> = {
  "+919876543210": {
    name: "Rajesh Kumar",
    records: [
      { id: 1, channel: "SMS", direction: "Outbound", template: "OTP Verification", messagePreview: "Your OTP is 482910. Valid for 5 minutes. Do not share with anyone.", status: "Delivered", senderId: "MYBHRT", provider: "NIC Gateway", campaign: null, sentAt: "2025-06-09 14:32:10", deliveredAt: "2025-06-09 14:32:12", readAt: null },
      { id: 2, channel: "WhatsApp", direction: "Outbound", template: "Welcome Message", messagePreview: "Welcome to My Bharat! Your registration is successful. Explore services at mybharat.gov.in", status: "Read", senderId: "My Bharat", provider: "Meta Cloud API", campaign: "Welcome Onboarding June", sentAt: "2025-06-09 10:15:00", deliveredAt: "2025-06-09 10:15:02", readAt: "2025-06-09 10:18:30" },
      { id: 3, channel: "Email", direction: "Outbound", template: "Welcome Email", messagePreview: "Dear Rajesh, Welcome aboard! Your account has been created successfully...", status: "Delivered", senderId: "noreply@mybharat.gov.in", provider: "SES", campaign: "Welcome Onboarding June", sentAt: "2025-06-09 10:15:05", deliveredAt: "2025-06-09 10:15:08", readAt: null },
      { id: 4, channel: "SMS", direction: "Outbound", template: "Appointment Reminder", messagePreview: "Reminder: Your appointment at CSC Pune is tomorrow at 10:00 AM. Ref: APT-78421", status: "Delivered", senderId: "MYBHRT", provider: "CDAC mGov", campaign: "Appointment Reminders", sentAt: "2025-06-07 09:00:00", deliveredAt: "2025-06-07 09:00:03", readAt: null },
      { id: 5, channel: "RCS", direction: "Outbound", template: "Service Update", messagePreview: "Your Aadhaar update request has been processed. Download updated document from the portal.", status: "Delivered", senderId: "My Bharat", provider: "Jio RCS", campaign: null, sentAt: "2025-06-05 16:45:00", deliveredAt: "2025-06-05 16:45:05", readAt: null },
      { id: 6, channel: "SMS", direction: "Outbound", template: "OTP Verification", messagePreview: "Your OTP is 193847. Valid for 5 minutes. Do not share with anyone.", status: "Delivered", senderId: "MYBHRT", provider: "NIC Gateway", campaign: null, sentAt: "2025-06-03 11:20:00", deliveredAt: "2025-06-03 11:20:02", readAt: null },
      { id: 7, channel: "WhatsApp", direction: "Outbound", template: "Order Confirmation", messagePreview: "Your order #ORD-98712 has been confirmed. Expected delivery: Jun 10, 2025.", status: "Read", senderId: "My Bharat", provider: "Meta Cloud API", campaign: "Order Confirmation Q2", sentAt: "2025-06-02 14:30:00", deliveredAt: "2025-06-02 14:30:03", readAt: "2025-06-02 14:35:12" },
      { id: 8, channel: "Email", direction: "Outbound", template: "Monthly Newsletter", messagePreview: "June Newsletter: New services launched, upcoming events, and more...", status: "Delivered", senderId: "newsletter@mybharat.gov.in", provider: "SES", campaign: "Monthly Newsletter June", sentAt: "2025-06-01 08:00:00", deliveredAt: "2025-06-01 08:00:05", readAt: null },
      { id: 9, channel: "SMS", direction: "Outbound", template: "Custom", messagePreview: "Your application REF-44521 has been approved. Please visit the nearest center.", status: "Failed", senderId: "MYBHRT", provider: "NIC Gateway", campaign: null, sentAt: "2025-05-28 13:10:00", deliveredAt: null, readAt: null },
      { id: 10, channel: "WhatsApp", direction: "Outbound", template: "Feedback Request", messagePreview: "Hi Rajesh, how was your experience? Rate us 1-5. Reply STOP to opt out.", status: "Delivered", senderId: "My Bharat", provider: "Meta Cloud API", campaign: null, sentAt: "2025-05-25 17:00:00", deliveredAt: "2025-05-25 17:00:04", readAt: null },
    ],
  },
  "+919876543211": {
    name: "Priya Sharma",
    records: [
      { id: 1, channel: "SMS", direction: "Outbound", template: "OTP Verification", messagePreview: "Your OTP is 738291. Valid for 5 minutes.", status: "Delivered", senderId: "MYBHRT", provider: "CDAC mGov", campaign: null, sentAt: "2025-06-09 14:30:00", deliveredAt: "2025-06-09 14:30:02", readAt: null },
      { id: 2, channel: "Email", direction: "Outbound", template: "Invoice", messagePreview: "Invoice #INV-2025-0042 for ₹1,200 has been generated.", status: "Delivered", senderId: "noreply@mybharat.gov.in", provider: "SES", campaign: null, sentAt: "2025-06-08 10:30:00", deliveredAt: "2025-06-08 10:30:05", readAt: null },
    ],
  },
};

const channelIcon: Record<string, React.ReactNode> = {
  SMS: <MessageSquare className="w-4 h-4" />,
  WhatsApp: <Phone className="w-4 h-4" />,
  Email: <Mail className="w-4 h-4" />,
  RCS: <Smartphone className="w-4 h-4" />,
};

const channelColor: Record<string, string> = {
  SMS: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  WhatsApp: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Email: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  RCS: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  Delivered: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, className: "bg-success/10 text-success" },
  Read: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, className: "bg-info/10 text-info" },
  Failed: { icon: <XCircle className="w-3.5 h-3.5" />, className: "bg-destructive/10 text-destructive" },
  Pending: { icon: <Clock className="w-3.5 h-3.5" />, className: "bg-warning/10 text-warning" },
};

const NumberHistoryPage = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [searchedNumber, setSearchedNumber] = useState<string | null>(null);
  const [channelFilter, setChannelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = () => {
    const cleaned = searchNumber.replace(/\s/g, "");
    if (cleaned.length >= 10) {
      const match = Object.keys(demoHistory).find((k) => k.includes(cleaned.slice(-10)));
      setSearchedNumber(match || cleaned);
    }
  };

  const result = searchedNumber ? demoHistory[searchedNumber] : null;

  const filteredRecords = result?.records.filter((r) => {
    const matchChannel = channelFilter === "all" || r.channel === channelFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchChannel && matchStatus;
  }) || [];

  const summary = result
    ? {
        total: result.records.length,
        sms: result.records.filter((r) => r.channel === "SMS").length,
        whatsapp: result.records.filter((r) => r.channel === "WhatsApp").length,
        email: result.records.filter((r) => r.channel === "Email").length,
        rcs: result.records.filter((r) => r.channel === "RCS").length,
        delivered: result.records.filter((r) => r.status === "Delivered" || r.status === "Read").length,
        failed: result.records.filter((r) => r.status === "Failed").length,
      }
    : null;

  return (
    <div className="space-y-6 overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Number History Lookup</h1>
        <p className="text-muted-foreground mt-1">Search any number or email to view complete communication history</p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter mobile number or email (e.g. +919876543210)"
                className="pl-9"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="shrink-0">
              <Search className="w-4 h-4 mr-2" /> Search History
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Demo numbers: +91 98765 43210, +91 98765 43211
          </p>
        </CardContent>
      </Card>

      {/* Results */}
      {searchedNumber && !result && (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <Hash className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground">No records found</p>
            <p className="text-sm text-muted-foreground mt-1">
              No communication history found for "{searchedNumber}"
            </p>
          </CardContent>
        </Card>
      )}

      {result && summary && (
        <>
          {/* Contact Info + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{result.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{searchedNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ArrowDownUp className="w-3.5 h-3.5" />
                  <span>{summary.total} total communications</span>
                </div>
              </CardContent>
            </Card>

            {[
              { label: "SMS", count: summary.sms, color: "hsl(262, 83%, 58%)" },
              { label: "WhatsApp", count: summary.whatsapp, color: "hsl(142, 70%, 45%)" },
              { label: "Email", count: summary.email, color: "hsl(217, 91%, 50%)" },
            ].map((ch) => (
              <Card key={ch.label} className="shadow-card">
                <CardContent className="pt-5 pb-4">
                  <p className="text-xs text-muted-foreground">{ch.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{ch.count}</p>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${summary.total > 0 ? (ch.count / summary.total) * 100 : 0}%`,
                        backgroundColor: ch.color,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Delivery summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-muted-foreground">RCS</p>
                <p className="text-xl font-bold text-foreground mt-1">{summary.rcs}</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-muted-foreground">Delivered / Read</p>
                <p className="text-xl font-bold text-success mt-1">{summary.delivered}</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-muted-foreground">Failed</p>
                <p className="text-xl font-bold text-destructive mt-1">{summary.failed}</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="text-xl font-bold text-foreground mt-1">
                  {summary.total > 0 ? ((summary.delivered / summary.total) * 100).toFixed(1) : 0}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters + Table */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <CardTitle className="text-base">Communication Log</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Select value={channelFilter} onValueChange={setChannelFilter}>
                    <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="RCS">RCS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Read">Read</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="w-4 h-4 mr-1" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["#", "Channel", "Template / Campaign", "Message", "Status", "Provider", "Sent At", "Delivered At", "Read At"].map((h) => (
                        <th key={h} className="text-left font-medium text-muted-foreground p-3 text-xs whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((r, idx) => {
                      const sc = statusConfig[r.status];
                      return (
                        <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                          <td className="p-3 text-xs text-muted-foreground">{idx + 1}</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${channelColor[r.channel]}`}>
                              {channelIcon[r.channel]}
                              {r.channel}
                            </span>
                          </td>
                          <td className="p-3">
                            <p className="text-foreground text-xs font-medium">{r.template}</p>
                            {r.campaign && (
                              <p className="text-muted-foreground text-[11px] mt-0.5">Campaign: {r.campaign}</p>
                            )}
                          </td>
                          <td className="p-3 max-w-[260px]">
                            <p className="text-xs text-muted-foreground truncate" title={r.messagePreview}>
                              {r.messagePreview}
                            </p>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.className}`}>
                              {sc.icon}
                              {r.status}
                            </span>
                          </td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{r.provider}</td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{r.sentAt}</td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{r.deliveredAt || "—"}</td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{r.readAt || "—"}</td>
                        </tr>
                      );
                    })}
                    {filteredRecords.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-muted-foreground">
                          No records match the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default NumberHistoryPage;
