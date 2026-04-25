import { ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options?: string[];
}

export const WORKSPACES = ["All workspaces", "My Bharat", "Kisan Sarathi", "Manas", "E Saras", "India Handmade"];

const WorkspaceFilter = ({ value, onChange, options = WORKSPACES }: Props) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-9 w-[180px] text-sm">
      <Building2 className="w-4 h-4 mr-1.5 text-muted-foreground" />
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
    </SelectContent>
  </Select>
);

export default WorkspaceFilter;
