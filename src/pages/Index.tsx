import { WorkflowTimeline } from "@/components/dashboard/WorkflowTimeline";
import { StickyNotes } from "@/components/dashboard/StickyNotes";
import { RecordingControls } from "@/components/dashboard/RecordingControls";
import { VitalsForm } from "@/components/dashboard/VitalsForm";
import { ClinicalChecklist } from "@/components/dashboard/ClinicalChecklist";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { PathologyCards } from "@/components/dashboard/PathologyCards";
import { Stethoscope } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-5 py-3 bg-card">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Stethoscope className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">ClinicalOS</h1>
            <p className="text-[10px] text-muted-foreground font-secondary">
              AI-Assisted Clinical Encounter
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-secondary px-2.5 py-1 text-[10px] font-semibold text-muted-foreground font-secondary">
            Patient #4821
          </span>
          <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary font-secondary">
            Dr. Sarah Chen
          </span>
        </div>
      </header>

      {/* 3-Column Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - 20% */}
        <aside className="w-1/5 min-w-[200px] border-r bg-card p-4 flex flex-col gap-6 overflow-y-auto">
          <WorkflowTimeline />
          <div className="border-t pt-4">
            <StickyNotes />
          </div>
        </aside>

        {/* Center Workspace - 60% */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Section - 35% */}
          <div className="h-[35%] border-b p-5 space-y-4 overflow-y-auto">
            <RecordingControls />
            <VitalsForm />
          </div>

          {/* Bottom Section - 65% */}
          <div className="flex-1 p-5 overflow-hidden">
            <ClinicalChecklist />
          </div>
        </main>

        {/* Right Sidebar - 20% */}
        <aside className="w-1/5 min-w-[200px] border-l bg-card p-4 flex flex-col gap-6 overflow-y-auto">
          <AIInsights />
          <div className="border-t pt-4">
            <PathologyCards />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
