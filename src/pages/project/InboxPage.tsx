import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Search, Send, UserPlus, CheckCircle2, Ticket, StickyNote, ChevronLeft, X, Filter, Inbox as InboxIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { conversations as seedConvos, channels, agents, channelIcon, channelName, channelColor, type Conversation, type ChannelKey } from "@/data/inboxMockData";
import { toast } from "sonner";

const statusColors: Record<Conversation["status"], string> = {
  open: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const InboxPage = () => {
  const [convos, setConvos] = useState<Conversation[]>(seedConvos);
  const [activeId, setActiveId] = useState<string>(seedConvos[0].id);
  const [filter, setFilter] = useState<"all" | "mine" | "unassigned" | "open" | "closed">("all");
  const [channelFilter, setChannelFilter] = useState<ChannelKey | "all">("all");
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [ticketOpen, setTicketOpen] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [showThreadMobile, setShowThreadMobile] = useState(false);

  const filtered = useMemo(() => {
    return convos.filter(c => {
      if (filter === "mine" && c.assignee !== "Priya Shah") return false;
      if (filter === "unassigned" && c.assignee) return false;
      if (filter === "open" && c.status !== "open") return false;
      if (filter === "closed" && c.status !== "closed") return false;
      if (channelFilter !== "all" && c.channel !== channelFilter) return false;
      if (search && !`${c.contact} ${c.preview}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [convos, filter, channelFilter, search]);

  const active = convos.find(c => c.id === activeId) ?? convos[0];

  const sendReply = () => {
    if (!reply.trim()) return;
    setConvos(prev => prev.map(c => c.id === active.id ? {
      ...c,
      preview: reply,
      updatedAt: "now",
      messages: [...c.messages, { id: `m${c.messages.length + 1}`, direction: "out", body: reply, at: "now", author: "You" }],
    } : c));
    setReply("");
    toast.success("Reply sent");
  };

  const closeConvo = () => {
    setConvos(prev => prev.map(c => c.id === active.id ? { ...c, status: "closed" } : c));
    toast.success("Conversation closed");
  };

  const assignToMe = () => {
    setConvos(prev => prev.map(c => c.id === active.id ? { ...c, assignee: "Priya Shah" } : c));
    toast.success("Assigned to you");
  };

  const addNote = () => {
    if (!reply.trim()) return;
    setConvos(prev => prev.map(c => c.id === active.id ? {
      ...c,
      messages: [...c.messages, { id: `m${c.messages.length + 1}`, direction: "note", body: reply, at: "now", author: "You" }],
    } : c));
    setReply("");
    toast.success("Internal note added");
  };

  const ChannelIcon = channelIcon(active.channel);

  const filterCounts = useMemo(() => ({
    all: convos.length,
    mine: convos.filter(c => c.assignee === "Priya Shah").length,
    unassigned: convos.filter(c => !c.assignee).length,
    open: convos.filter(c => c.status === "open").length,
    closed: convos.filter(c => c.status === "closed").length,
  }), [convos]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-sm text-muted-foreground">All inbound conversations across channels</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "mine", "unassigned", "open", "closed"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-colors capitalize flex items-center gap-1.5",
                filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
              )}
            >
              {f === "mine" ? "Assigned to me" : f}
              <span className={cn(
                "text-[10px] px-1.5 py-0 rounded-full",
                filter === f ? "bg-primary-foreground/20" : "bg-muted"
              )}>{filterCounts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] h-[calc(100vh-200px)] min-h-[560px]">
          {/* Conversation list */}
          <div className={cn("border-r border-border flex flex-col", showThreadMobile && "hidden md:flex")}>
            <div className="p-3 border-b border-border space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…" className="pl-9 h-9" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <InboxIcon className="w-3.5 h-3.5" />
                  <span>{filtered.length} conversations</span>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                      <Filter className="w-3 h-3" />
                      {channelFilter === "all" ? "All channels" : channelName(channelFilter)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <button
                      onClick={() => setChannelFilter("all")}
                      className={cn("w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted", channelFilter === "all" && "bg-muted font-medium")}
                    >
                      All channels
                    </button>
                    {channels.map(ch => {
                      const Icon = ch.icon;
                      return (
                        <button
                          key={ch.key}
                          onClick={() => setChannelFilter(ch.key)}
                          className={cn("w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2", channelFilter === ch.key && "bg-muted font-medium")}
                        >
                          <Icon className={cn("w-3.5 h-3.5", ch.color)} />
                          {ch.name}
                        </button>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <ScrollArea className="flex-1">
              {filtered.length === 0 && (
                <p className="p-6 text-sm text-muted-foreground text-center">No conversations.</p>
              )}
              {filtered.map(c => {
                const Icon = channelIcon(c.channel);
                return (
                  <button
                    key={c.id}
                    onClick={() => { setActiveId(c.id); setShowThreadMobile(true); }}
                    className={cn(
                      "w-full text-left p-3 border-b border-border/50 hover:bg-muted/50 transition-colors flex gap-3",
                      activeId === c.id && "bg-muted"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-xs">{c.contact.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                      </Avatar>
                      <div className={cn("absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-background flex items-center justify-center border border-border")}>
                        <Icon className={cn("w-2.5 h-2.5", channelColor(c.channel))} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{c.contact}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{c.updatedAt}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {c.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        {c.ticketId && <Badge variant="outline" className="text-[10px] py-0 h-4">{c.ticketId}</Badge>}
                        {c.assignee && <span className="text-[10px] text-muted-foreground truncate">· {c.assignee}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </ScrollArea>
          </div>

          {/* Thread */}
          <div className={cn("flex flex-col bg-background", !showThreadMobile && "hidden md:flex")}>
            {/* Thread header */}
            <div className="p-3 border-b border-border flex items-center gap-3">
              <button className="md:hidden p-1" onClick={() => setShowThreadMobile(false)}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-xs">{active.contact.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{active.contact}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                  <ChannelIcon className={cn("w-3 h-3", channelColor(active.channel))} />
                  {channelName(active.channel)} · {active.contactHandle}
                </p>
              </div>
              <Badge variant="outline" className={cn("capitalize", statusColors[active.status])}>{active.status}</Badge>
              <Button size="sm" variant="ghost" onClick={() => setShowSidePanel(s => !s)} className="hidden lg:inline-flex">
                {showSidePanel ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex-1 flex min-h-0">
              {/* Messages */}
              <div className="flex-1 flex flex-col min-w-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {active.messages.map(m => (
                      <div key={m.id} className={cn(
                        "flex",
                        m.direction === "out" && "justify-end",
                        m.direction === "note" && "justify-center",
                      )}>
                        <div className={cn(
                          "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                          m.direction === "in" && "bg-muted",
                          m.direction === "out" && "bg-primary text-primary-foreground",
                          m.direction === "note" && "bg-amber-500/15 text-amber-700 border border-amber-500/30 italic text-xs",
                        )}>
                          <p>{m.body}</p>
                          <p className={cn("text-[10px] mt-1 opacity-70")}>{m.author} · {m.at}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Action bar */}
                {active.status !== "closed" ? (
                  <div className="border-t border-border p-3 space-y-2">
                    <Textarea
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      placeholder="Type your reply…"
                      className="min-h-[70px] resize-none"
                    />
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" onClick={addNote}>
                          <StickyNote className="w-3.5 h-3.5" /> Note
                        </Button>
                        <Button size="sm" variant="outline" onClick={assignToMe}>
                          <UserPlus className="w-3.5 h-3.5" /> Assign me
                        </Button>
                        <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Ticket className="w-3.5 h-3.5" /> Create Ticket
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Create Ticket</DialogTitle></DialogHeader>
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs font-medium">Subject</label>
                                <Input defaultValue={`Issue from ${active.contact}`} />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-xs font-medium">Priority</label>
                                  <Select defaultValue="medium">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-xs font-medium">Assignee</label>
                                  <Select defaultValue={agents[0]}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {agents.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <label className="text-xs font-medium">Description</label>
                                <Textarea defaultValue={active.messages.map(m => `${m.author}: ${m.body}`).join("\n")} className="min-h-[100px]" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setTicketOpen(false)}>Cancel</Button>
                              <Button onClick={() => {
                                const id = `TKT-${1000 + Math.floor(Math.random() * 999)}`;
                                setConvos(prev => prev.map(c => c.id === active.id ? { ...c, ticketId: id } : c));
                                setTicketOpen(false);
                                toast.success(`Ticket ${id} created`);
                              }}>Create</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" onClick={closeConvo}>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Close
                        </Button>
                      </div>
                      <Button size="sm" onClick={sendReply}>
                        <Send className="w-3.5 h-3.5" /> Send Reply
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-border p-4 text-center text-sm text-muted-foreground">
                    This conversation is closed.
                  </div>
                )}
              </div>

              {/* Side panel */}
              {showSidePanel && (
                <div className="hidden lg:block w-72 border-l border-border bg-muted/20 p-4 space-y-4 overflow-y-auto">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Contact</p>
                    <p className="text-sm font-medium">{active.contact}</p>
                    <p className="text-xs text-muted-foreground">{active.contactHandle}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Conversation</p>
                    <div className="text-xs space-y-1.5">
                      <div className="flex justify-between"><span className="text-muted-foreground">Channel</span><span>{channelName(active.channel)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="capitalize">{active.status}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Assignee</span><span>{active.assignee ?? "—"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span>{active.updatedAt}</span></div>
                    </div>
                  </div>
                  {active.ticketId && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Linked Ticket</p>
                      <Badge variant="outline">{active.ticketId}</Badge>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {active.tags.length === 0 && <span className="text-xs text-muted-foreground">None</span>}
                      {active.tags.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InboxPage;
