// components/investigations/investigation-pages.tsx
import { Investigation } from "@/lib/types";
import InvestigationPage from "./investigation-page"; // Import the correct component

interface InvestigationPagesProps {
  investigation: Investigation;
}

export default function InvestigationPages({ investigation }: InvestigationPagesProps) {
  if (!investigation.pages || investigation.pages.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-muted-foreground" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          لا توجد صفحات
        </h3>
        <p className="text-muted-foreground">
          لم يتم إضافة صفحات لهذا التحقيق بعد
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {investigation.pages.map((page, index) => (
        <InvestigationPage // Using the correct component
          key={page.id}
          page={page}
          pageNumber={index + 1}
          totalPages={investigation.pages!.length}
        />
      ))}
    </div>
  );
}