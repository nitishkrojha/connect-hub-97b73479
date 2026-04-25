import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, Check, X, AlertCircle, Download, FileText } from "lucide-react";

const pastUploads = [
  { file: "users_batch_1.csv", date: "Jun 8, 2025", total: 2400, valid: 2310, invalid: 62, duplicates: 28 },
  { file: "promo_list.csv", date: "Jun 5, 2025", total: 5200, valid: 4980, invalid: 140, duplicates: 80 },
  { file: "otp_numbers.csv", date: "Jun 3, 2025", total: 890, valid: 878, invalid: 8, duplicates: 4 },
];

const UploadRecipientsPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ headers: string[]; rows: string[][]; total: number; valid: number; invalid: number; duplicates: number } | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1, 8).map((l) => l.split(",").map((c) => c.trim()));
      const total = lines.length - 1;
      setPreview({
        headers,
        rows,
        total,
        valid: Math.floor(total * 0.92),
        invalid: Math.floor(total * 0.05),
        duplicates: Math.floor(total * 0.03),
      });
    };
    reader.readAsText(f);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
        <p className="text-muted-foreground mt-1">Upload CSV files with recipient data for campaigns</p>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Upload CSV File</CardTitle></CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium mb-1">Drop your CSV file here</p>
            <p className="text-xs text-muted-foreground mb-4">Supported: .csv files with headers. Max 100,000 rows.</p>
            <input type="file" accept=".csv" onChange={handleUpload} className="hidden" id="csv-upload" />
            <Button variant="outline" onClick={() => document.getElementById("csv-upload")?.click()}>Choose File</Button>
            {file && <p className="text-sm text-foreground mt-3">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
          </div>
        </CardContent>
      </Card>

      {preview && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-card"><CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground">Total Records</p>
              <p className="text-xl font-bold text-foreground mt-1">{preview.total}</p>
            </CardContent></Card>
            <Card className="shadow-card"><CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-success" />Valid</p>
              <p className="text-xl font-bold text-success mt-1">{preview.valid}</p>
            </CardContent></Card>
            <Card className="shadow-card"><CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><X className="w-3 h-3 text-destructive" />Invalid</p>
              <p className="text-xl font-bold text-destructive mt-1">{preview.invalid}</p>
            </CardContent></Card>
            <Card className="shadow-card"><CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><AlertCircle className="w-3 h-3 text-warning" />Duplicates</p>
              <p className="text-xl font-bold text-warning mt-1">{preview.duplicates}</p>
            </CardContent></Card>
          </div>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Data Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted">
                    {preview.headers.map((h) => <th key={h} className="p-3 text-left text-xs font-medium text-muted-foreground">{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {preview.rows.map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        {row.map((c, j) => <td key={j} className="p-3 text-foreground">{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={() => toast.success("Contacts imported successfully!")}>Import Valid Records</Button>
                <Button variant="outline"><Download className="w-4 h-4 mr-2" />Download Error Report</Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Past Uploads</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["File", "Date", "Total", "Valid", "Invalid", "Duplicates"].map((h) => (
                  <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {pastUploads.map((u) => (
                  <tr key={u.file} className="border-b border-border/50 last:border-0">
                    <td className="p-4 flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" /><span className="text-foreground font-medium">{u.file}</span></td>
                    <td className="p-4 text-muted-foreground">{u.date}</td>
                    <td className="p-4 text-foreground">{u.total.toLocaleString()}</td>
                    <td className="p-4 text-success">{u.valid.toLocaleString()}</td>
                    <td className="p-4 text-destructive">{u.invalid}</td>
                    <td className="p-4 text-warning">{u.duplicates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadRecipientsPage;
