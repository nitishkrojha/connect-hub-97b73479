import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
    <Card className="shadow-card">
      <CardContent className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4">
          <Construction className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          This module is under development. Check back soon for updates.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default PlaceholderPage;
