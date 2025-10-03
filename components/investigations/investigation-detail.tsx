// components/investigations/investigation-detail.tsx
import { Investigation } from "@/lib/types";
import InvestigationsHeader from "./investigations-header";
import InvestigationPages from "./investigation-pages";

interface InvestigationDetailProps {
  investigation: Investigation;
  relatedInvestigations?: Investigation[];
}

export default function InvestigationDetail({
  investigation,
}: InvestigationDetailProps) {
  return (
    <>
      {/* Investigation Header */}
      <InvestigationsHeader investigation={investigation} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <InvestigationPages investigation={investigation} />
          </div>
        </div>
      </div>
    </>
  );
}
