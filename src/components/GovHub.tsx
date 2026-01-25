import { useState } from "react";
import { FileText, Upload, CheckCircle2, Clock, AlertTriangle, Bell, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

const collaborations = [
  {
    title: "MOU between MCD & GreenFurniture Ltd",
    description: "Wood waste supply agreement for furniture manufacturing",
    status: "approved",
    date: "Signed: Jan 15, 2026",
  },
  {
    title: "Quality Certification - MetalCorp Industries",
    description: "Quality standards verification for metal scrap processing",
    status: "pending",
    date: "Submitted: Jan 20, 2026",
  },
  {
    title: "Waste Supply Agreement - TextileWorks",
    description: "Textile waste recycling partnership documentation",
    status: "revision",
    date: "Review by: Jan 25, 2026",
  },
];

export function GovHub() {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="badge-approved flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> APPROVED</span>;
      case "pending":
        return <span className="badge-pending flex items-center gap-1"><Clock className="w-3 h-3" /> PENDING</span>;
      case "revision":
        return <span className="badge-revision flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> REVISION NEEDED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="tab-content-enter space-y-8">
      {/* Active Collaborations */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Active Collaborations</h2>
        </div>

        <div className="space-y-4">
          {collaborations.map((collab, index) => (
            <div
              key={index}
              className="p-5 bg-gradient-card rounded-xl border border-border card-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-foreground">{collab.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{collab.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{collab.date}</p>
                </div>
                {getStatusBadge(collab.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Upload className="w-5 h-5 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Document Upload & Sharing</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="docUpload">Upload Document</Label>
            <div className="mt-2 flex flex-col sm:flex-row gap-4">
              <Input
                id="docUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="form-input flex-1"
                onChange={handleFileUpload}
              />
              <Button className="btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          {uploadedFile && (
            <div className="p-4 bg-success/10 rounded-xl border border-success/30 animate-scale-in">
              <p className="flex items-center gap-2 text-success font-medium">
                <CheckCircle2 className="w-5 h-5" />
                File uploaded successfully!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>File:</strong> {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground italic">
            Note: Documents are securely stored and shared with relevant government departments.
          </p>
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Real-time Updates</h2>
        </div>

        <div className="p-6 bg-accent rounded-xl border border-border">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Instant Notifications Enabled
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg">
              <p className="font-medium text-foreground">📧 No Email Chains</p>
              <p className="text-sm text-muted-foreground mt-1">Direct communication with government officials</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
              <p className="font-medium text-foreground">🔍 Transparent Tracking</p>
              <p className="text-sm text-muted-foreground mt-1">Real-time status updates on all applications</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
              <p className="font-medium text-foreground">⚠️ Compliance Alerts</p>
              <p className="text-sm text-muted-foreground mt-1">Automated reminders for deadlines & renewals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
