import { useState, useMemo } from "react";
import { FileText, Upload, CheckCircle, Clock, AlertTriangle, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCollaborations } from "@/hooks/useDashboardData";

const MOCK_COLLABORATIONS = [
  { title: "MOU between MCD & GreenFurniture Ltd", status: "approved", date: "Signed: Jan 15, 2026", detail: "500 MT Reclaimed Wood supply agreement" },
  { title: "Quality Certification - MetalCorp Industries", status: "pending", date: "Submitted: Jan 20, 2026", detail: "Grade A Metal certification pending review" },
  { title: "Waste Supply Agreement - TextileWorks", status: "revision", date: "Updated: Jan 18, 2026", detail: "Quantity terms need revision" },
];

const statusConfig = {
  approved: { label: "Approved", icon: CheckCircle, class: "bg-green-500/20 text-green-400 border-green-500/30" },
  pending: { label: "Pending", icon: Clock, class: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  revision: { label: "Revision Needed", icon: AlertTriangle, class: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export function GovHub() {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const { data: liveCollaborations = [] } = useCollaborations(true);
  const collaborations = useMemo(() => {
    const fromDb = liveCollaborations.map((c) => ({
      title: c.title ?? `Request ${c.request_id.slice(0, 8)}`,
      status: c.status as "approved" | "pending" | "revision",
      date: c.updated_at.slice(0, 10),
      detail: c.detail ?? "Collaboration with government",
    }));
    return fromDb.length > 0 ? fromDb : MOCK_COLLABORATIONS;
  }, [liveCollaborations]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.match(/\.(pdf|doc|docx)$/)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file.name);
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Active Collaborations */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">
          Active Collaborations
        </h3>
        <div className="space-y-4">
          {collaborations.map((collab, index) => {
            const status = statusConfig[collab.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <div
                key={index}
                className="p-4 bg-cream/5 rounded-lg border border-cream/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-cream/60" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-cream">{collab.title}</p>
                    <p className="font-body text-sm text-cream/60">{collab.detail}</p>
                    <p className="font-body text-xs text-cream/40 mt-1">{collab.date}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.class}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="font-body text-sm">{status.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Upload */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-4">
          Document Upload & Sharing
        </h3>
        <p className="font-body text-sm text-cream/60 mb-6">
          Upload documents for government review and collaboration agreements.
        </p>
        <div className="border-2 border-dashed border-cream/20 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-cream/40 mx-auto mb-4" />
          <p className="font-body text-cream/60 mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="font-body text-xs text-cream/40 mb-4">
            Accepted formats: PDF, DOC, DOCX
          </p>
          <input
            type="file"
            className="hidden"
            id="doc-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          <label htmlFor="doc-upload" className="btn-outline-elegant cursor-pointer">
            Choose File
          </label>
        </div>

        {uploadedFile && (
          <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="font-body text-sm text-cream">{uploadedFile}</p>
              <p className="font-body text-xs text-cream/60">Uploaded successfully</p>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Updates */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-display text-xl text-cream mb-2">
              Real-time Updates
            </h3>
            <p className="font-body text-sm text-cream/60 mb-4">
              Stay informed with instant notifications on your collaborations.
            </p>
            <ul className="space-y-2">
              {[
                "No email chains needed",
                "Transparent tracking of all submissions",
                "Compliance alerts and reminders",
                "Direct communication with government departments",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-cream/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/50" />
                  <span className="font-body text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
