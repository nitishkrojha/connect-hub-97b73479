import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Send, BarChart3, FileText, Key, Server, CheckCircle, AlertTriangle, Code2 } from "lucide-react";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => (
  <div className="relative group">
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => copyToClipboard(code)}
    >
      <Copy className="w-3.5 h-3.5" />
    </Button>
    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto text-foreground leading-relaxed">
      {code}
    </pre>
  </div>
);

const EndpointCard = ({ method, path, description, children }: {
  method: "POST" | "GET" | "PUT" | "DELETE";
  path: string;
  description: string;
  children: React.ReactNode;
}) => {
  const methodColors: Record<string, string> = {
    POST: "bg-channel-whatsapp/10 text-channel-whatsapp border-channel-whatsapp/30",
    GET: "bg-primary/10 text-primary border-primary/30",
    PUT: "bg-warning/10 text-warning border-warning/30",
    DELETE: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className={`${methodColors[method]} font-mono text-xs`}>{method}</Badge>
          <code className="text-sm font-mono text-foreground">{path}</code>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

const DeveloperDocsPage = () => {
  const baseUrl = "https://api.dicnotifier.io/v1";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Developer Documentation</h1>
        <p className="text-muted-foreground mt-1">API reference for integrating DIC Notifier into your application</p>
      </div>

      {/* Quick Start */}
      <Card className="shadow-card border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Quick Start</h3>
              <p className="text-sm text-muted-foreground">All API requests require authentication. Include your API key in the header:</p>
              <CodeBlock code={`Authorization: Bearer YOUR_PROJECT_API_KEY
Content-Type: application/json
X-Project-Code: YOUR_PROJECT_CODE`} />
              <p className="text-xs text-muted-foreground">Get your API key from <strong>Configuration → General</strong> in your project dashboard.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="send">
        <TabsList className="flex-wrap">
          <TabsTrigger value="send">Send Message</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Send</TabsTrigger>
          <TabsTrigger value="status">Message Status</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="errors">Error Codes</TabsTrigger>
        </TabsList>

        {/* Send Message */}
        <TabsContent value="send" className="space-y-4 mt-4">
          <EndpointCard method="POST" path={`${baseUrl}/message/send`} description="Send a message to a single recipient via any channel (SMS, WhatsApp, Email, RCS).">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Request Body</p>
              <CodeBlock code={JSON.stringify({
                channel: "sms",
                to: "+919876543210",
                template_id: "tpl_otp_verify",
                variables: { otp: "482901", name: "Ravi Kumar" },
                sender_id: "DICNTFY",
                callback_url: "https://yourapp.com/webhook/delivery"
              }, null, 2)} />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Response (200 OK)</p>
              <CodeBlock code={JSON.stringify({
                success: true,
                message_id: "msg_a1b2c3d4e5f6",
                channel: "sms",
                status: "queued",
                credits_used: 1,
                timestamp: "2026-04-11T10:30:00Z"
              }, null, 2)} />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Supported Channels</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">sms</Badge>
                <Badge variant="outline">whatsapp</Badge>
                <Badge variant="outline">email</Badge>
                <Badge variant="outline">rcs</Badge>
              </div>
            </div>
          </EndpointCard>

          <EndpointCard method="POST" path={`${baseUrl}/message/send-email`} description="Send an email with subject, HTML body, and optional attachments.">
            <CodeBlock code={JSON.stringify({
              to: "user@example.com",
              subject: "Welcome to My Bharat",
              body_html: "<h1>Welcome {{name}}</h1><p>Thank you for registering.</p>",
              variables: { name: "Ravi Kumar" },
              from_name: "My Bharat Team",
              reply_to: "support@mybharat.gov.in",
              attachments: [
                { filename: "welcome.pdf", content_base64: "JVBERi0xLjQ..." }
              ]
            }, null, 2)} />
          </EndpointCard>
        </TabsContent>

        {/* Bulk Send */}
        <TabsContent value="bulk" className="space-y-4 mt-4">
          <EndpointCard method="POST" path={`${baseUrl}/message/bulk`} description="Send messages to multiple recipients at once. Supports up to 100,000 recipients per request.">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Request Body</p>
              <CodeBlock code={JSON.stringify({
                channel: "sms",
                template_id: "tpl_campaign_update",
                recipients: [
                  { to: "+919876543210", variables: { name: "Ravi" } },
                  { to: "+919876543211", variables: { name: "Priya" } },
                  { to: "+919876543212", variables: { name: "Amit" } }
                ],
                campaign_name: "Jan 2026 Update",
                sender_id: "DICNTFY",
                schedule_at: "2026-04-12T09:00:00Z",
                callback_url: "https://yourapp.com/webhook/bulk-delivery"
              }, null, 2)} />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Response (202 Accepted)</p>
              <CodeBlock code={JSON.stringify({
                success: true,
                campaign_id: "cmp_x7y8z9w0",
                total_recipients: 3,
                status: "processing",
                estimated_completion: "2026-04-12T09:05:00Z"
              }, null, 2)} />
            </div>
          </EndpointCard>

          <EndpointCard method="POST" path={`${baseUrl}/message/bulk-csv`} description="Upload a CSV file with recipient data for bulk messaging.">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Request (multipart/form-data)</p>
              <CodeBlock language="bash" code={`curl -X POST ${baseUrl}/message/bulk-csv \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@recipients.csv" \\
  -F "channel=sms" \\
  -F "template_id=tpl_campaign_update" \\
  -F "campaign_name=CSV Campaign" \\
  -F "mobile_column=phone" \\
  -F "name_column=full_name"`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">CSV Format</p>
              <CodeBlock code={`phone,full_name,city
+919876543210,Ravi Kumar,Bhopal
+919876543211,Priya Sharma,Indore
+919876543212,Amit Patel,Jabalpur`} />
            </div>
          </EndpointCard>
        </TabsContent>

        {/* Message Status */}
        <TabsContent value="status" className="space-y-4 mt-4">
          <EndpointCard method="GET" path={`${baseUrl}/message/:message_id`} description="Get the delivery status of a single message.">
            <CodeBlock code={JSON.stringify({
              success: true,
              message_id: "msg_a1b2c3d4e5f6",
              channel: "sms",
              to: "+919876543210",
              status: "delivered",
              delivered_at: "2026-04-11T10:30:12Z",
              credits_used: 1,
              error: null
            }, null, 2)} />
          </EndpointCard>

          <EndpointCard method="GET" path={`${baseUrl}/campaign/:campaign_id`} description="Get the status and progress of a bulk campaign.">
            <CodeBlock code={JSON.stringify({
              success: true,
              campaign_id: "cmp_x7y8z9w0",
              campaign_name: "Jan 2026 Update",
              channel: "sms",
              status: "completed",
              total: 5000,
              delivered: 4850,
              failed: 100,
              pending: 50,
              created_at: "2026-04-11T10:00:00Z",
              completed_at: "2026-04-11T10:15:00Z"
            }, null, 2)} />
          </EndpointCard>

          <EndpointCard method="POST" path={`${baseUrl}/webhook/delivery`} description="Webhook payload sent to your callback URL on delivery status change.">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Webhook Payload</p>
              <CodeBlock code={JSON.stringify({
                event: "message.delivered",
                message_id: "msg_a1b2c3d4e5f6",
                campaign_id: "cmp_x7y8z9w0",
                channel: "sms",
                to: "+919876543210",
                status: "delivered",
                timestamp: "2026-04-11T10:30:12Z",
                error_code: null
              }, null, 2)} />
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-muted-foreground">Events:</span>
              <Badge variant="outline">message.queued</Badge>
              <Badge variant="outline">message.sent</Badge>
              <Badge variant="outline">message.delivered</Badge>
              <Badge variant="outline">message.failed</Badge>
              <Badge variant="outline">message.read</Badge>
            </div>
          </EndpointCard>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4 mt-4">
          <EndpointCard method="GET" path={`${baseUrl}/reports/campaign/:campaign_id`} description="Get a detailed report for a specific campaign including delivery breakdown.">
            <CodeBlock code={JSON.stringify({
              success: true,
              campaign_id: "cmp_x7y8z9w0",
              campaign_name: "Jan 2026 Update",
              channel: "sms",
              summary: {
                total: 5000,
                delivered: 4850,
                failed: 100,
                pending: 50,
                read: 3200,
                delivery_rate: "97.0%",
                read_rate: "65.98%"
              },
              timeline: [
                { time: "10:00", sent: 1000, delivered: 980 },
                { time: "10:05", sent: 2000, delivered: 1960 },
                { time: "10:10", sent: 1500, delivered: 1450 },
                { time: "10:15", sent: 500, delivered: 460 }
              ],
              failures: [
                { to: "+919876543999", error: "INVALID_NUMBER", description: "Number not in service" },
                { to: "+919876543888", error: "DND_REGISTERED", description: "Number registered on DND" }
              ]
            }, null, 2)} />
          </EndpointCard>

          <EndpointCard method="GET" path={`${baseUrl}/reports/daily?date=2026-04-11`} description="Get aggregated daily report across all channels.">
            <CodeBlock code={JSON.stringify({
              success: true,
              date: "2026-04-11",
              channels: {
                sms: { sent: 15000, delivered: 14700, failed: 300, credits: 15000 },
                whatsapp: { sent: 8000, delivered: 7800, failed: 200, credits: 8000 },
                email: { sent: 5000, delivered: 4900, failed: 100, credits: 2500 },
                rcs: { sent: 1200, delivered: 1100, failed: 100, credits: 1200 }
              },
              total_credits_used: 26700,
              quota_remaining: { sms: 85000, whatsapp: 42000, email: 47500, rcs: 8800 }
            }, null, 2)} />
          </EndpointCard>

          <EndpointCard method="GET" path={`${baseUrl}/reports/export?campaign_id=cmp_x7y8z9w0&format=csv`} description="Export campaign report as CSV or PDF.">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Query Parameters</p>
              <div className="overflow-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted"><tr><th className="px-3 py-2 text-left text-foreground">Param</th><th className="px-3 py-2 text-left text-foreground">Type</th><th className="px-3 py-2 text-left text-foreground">Description</th></tr></thead>
                  <tbody>
                    <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-foreground">campaign_id</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">Campaign ID</td></tr>
                    <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-foreground">format</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">csv or pdf</td></tr>
                    <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-foreground">date_from</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">Start date (YYYY-MM-DD)</td></tr>
                    <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-foreground">date_to</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">End date (YYYY-MM-DD)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </EndpointCard>
        </TabsContent>

        {/* Statistics */}
        <TabsContent value="stats" className="space-y-4 mt-4">
          <EndpointCard method="GET" path={`${baseUrl}/stats/overview`} description="Get overall project statistics and usage summary.">
            <CodeBlock code={JSON.stringify({
              success: true,
              period: "2026-04-01 to 2026-04-11",
              total_messages_sent: 125000,
              total_delivered: 122500,
              total_failed: 2500,
              delivery_rate: "98.0%",
              channels: {
                sms: { sent: 60000, rate: "97.5%" },
                whatsapp: { sent: 35000, rate: "98.8%" },
                email: { sent: 20000, rate: "97.2%" },
                rcs: { sent: 10000, rate: "99.1%" }
              },
              top_campaigns: [
                { id: "cmp_x7y8z9w0", name: "Jan Update", sent: 5000, rate: "97.0%" },
                { id: "cmp_a1b2c3d4", name: "OTP Batch", sent: 45000, rate: "99.5%" }
              ],
              quota_usage: {
                sms: { used: 60000, limit: 100000, percentage: "60%" },
                whatsapp: { used: 35000, limit: 50000, percentage: "70%" }
              }
            }, null, 2)} />
          </EndpointCard>

          <EndpointCard method="GET" path={`${baseUrl}/stats/quota`} description="Check current quota usage and remaining limits.">
            <CodeBlock code={JSON.stringify({
              success: true,
              project_code: "MYBRT",
              quotas: {
                sms: { daily_limit: 10000, daily_used: 3500, daily_remaining: 6500, overall_limit: 100000, overall_used: 60000, overall_remaining: 40000 },
                whatsapp: { daily_limit: 5000, daily_used: 1200, daily_remaining: 3800, overall_limit: 50000, overall_used: 35000, overall_remaining: 15000 },
                email: { daily_limit: 5000, daily_used: 800, daily_remaining: 4200, overall_limit: 50000, overall_used: 20000, overall_remaining: 30000 },
                rcs: { daily_limit: 2000, daily_used: 300, daily_remaining: 1700, overall_limit: 10000, overall_used: 3000, overall_remaining: 7000 }
              }
            }, null, 2)} />
          </EndpointCard>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-4 mt-4">
          <EndpointCard method="GET" path={`${baseUrl}/templates`} description="List all approved message templates for your project.">
            <CodeBlock code={JSON.stringify({
              success: true,
              templates: [
                {
                  id: "tpl_otp_verify",
                  name: "OTP Verification",
                  channel: "sms",
                  body: "Your OTP is {{otp}}. Valid for 5 minutes. Do not share.",
                  variables: ["otp"],
                  status: "approved",
                  dlt_template_id: "1107161234567890"
                },
                {
                  id: "tpl_welcome_wa",
                  name: "Welcome Message",
                  channel: "whatsapp",
                  body: "Hello {{name}}! Welcome to {{project_name}}.",
                  variables: ["name", "project_name"],
                  status: "approved"
                }
              ]
            }, null, 2)} />
          </EndpointCard>

          <EndpointCard method="GET" path={`${baseUrl}/templates/:template_id`} description="Get details of a specific template.">
            <CodeBlock code={JSON.stringify({
              success: true,
              id: "tpl_otp_verify",
              name: "OTP Verification",
              channel: "sms",
              body: "Your OTP is {{otp}}. Valid for 5 minutes. Do not share.",
              variables: [
                { name: "otp", type: "string", required: true, max_length: 6 }
              ],
              status: "approved",
              created_at: "2026-01-15T10:00:00Z",
              dlt_template_id: "1107161234567890"
            }, null, 2)} />
          </EndpointCard>
        </TabsContent>

        {/* Error Codes */}
        <TabsContent value="errors" className="space-y-4 mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">HTTP Status Codes</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-foreground">Code</th>
                      <th className="px-4 py-2 text-left text-foreground">Status</th>
                      <th className="px-4 py-2 text-left text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["200", "OK", "Request processed successfully"],
                      ["202", "Accepted", "Bulk request accepted for processing"],
                      ["400", "Bad Request", "Invalid request body or missing required fields"],
                      ["401", "Unauthorized", "Invalid or missing API key"],
                      ["403", "Forbidden", "Insufficient permissions or channel not enabled"],
                      ["404", "Not Found", "Resource not found"],
                      ["429", "Too Many Requests", "Rate limit exceeded (60 req/min)"],
                      ["500", "Server Error", "Internal server error"],
                    ].map(([code, status, desc]) => (
                      <tr key={code} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-foreground font-medium">{code}</td>
                        <td className="px-4 py-2 text-foreground">{status}</td>
                        <td className="px-4 py-2 text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Delivery Error Codes</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-foreground">Error Code</th>
                      <th className="px-4 py-2 text-left text-foreground">Description</th>
                      <th className="px-4 py-2 text-left text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["INVALID_NUMBER", "Phone number is invalid or not in service", "Verify the phone number format"],
                      ["DND_REGISTERED", "Number registered on Do Not Disturb", "Remove from send list"],
                      ["TEMPLATE_MISMATCH", "Message does not match approved DLT template", "Use an approved template"],
                      ["QUOTA_EXCEEDED", "Daily or overall quota limit reached", "Wait for quota reset or request increase"],
                      ["CHANNEL_DISABLED", "Channel not enabled for this project", "Enable channel in Configuration"],
                      ["PROVIDER_ERROR", "Third-party provider returned an error", "Retry after some time"],
                      ["RATE_LIMITED", "Too many requests to the provider", "Reduce sending rate"],
                      ["EXPIRED", "Message expired before delivery", "Check recipient availability"],
                    ].map(([code, desc, action]) => (
                      <tr key={code} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-foreground font-medium">{code}</td>
                        <td className="px-4 py-2 text-muted-foreground">{desc}</td>
                        <td className="px-4 py-2 text-muted-foreground">{action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Rate Limits</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="overflow-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-foreground">Endpoint</th>
                      <th className="px-4 py-2 text-left text-foreground">Limit</th>
                      <th className="px-4 py-2 text-left text-foreground">Window</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["/message/send", "60 requests", "per minute"],
                      ["/message/bulk", "10 requests", "per minute"],
                      ["/reports/*", "30 requests", "per minute"],
                      ["/stats/*", "30 requests", "per minute"],
                      ["/templates", "60 requests", "per minute"],
                    ].map(([ep, limit, window]) => (
                      <tr key={ep} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-foreground">{ep}</td>
                        <td className="px-4 py-2 text-muted-foreground">{limit}</td>
                        <td className="px-4 py-2 text-muted-foreground">{window}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 text-xs text-muted-foreground">
                <AlertTriangle className="w-4 h-4 inline mr-1 text-warning" />
                Rate limit headers (<code className="bg-muted px-1 rounded">X-RateLimit-Remaining</code>, <code className="bg-muted px-1 rounded">X-RateLimit-Reset</code>) are included in every response.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperDocsPage;
