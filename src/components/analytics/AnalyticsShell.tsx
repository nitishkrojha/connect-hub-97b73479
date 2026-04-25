import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar } from "lucide-react";

interface AnalyticsShellProps {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
}

const AnalyticsShell = ({ title, subtitle, rightSlot, children }: AnalyticsShellProps) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {rightSlot}
        <Select defaultValue="7d">
          <SelectTrigger className="h-9 w-[150px] text-sm">
            <Calendar className="w-4 h-4 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9">
          <Download className="w-4 h-4 mr-1.5" /> Export
        </Button>
      </div>
    </div>
    {children}
  </div>
);

export default AnalyticsShell;
