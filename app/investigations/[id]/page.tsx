// app/investigations/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { investigationsService } from "@/lib/api/core";
import InvestigationDetail from "@/components/investigations/investigation-detail";

interface InvestigationDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: InvestigationDetailPageProps): Promise<Metadata> {
  try {
    const investigation = await investigationsService.getInvestigationById(parseInt(params.id));
    
    return {
      title: investigation.title,
      description: investigation.description,
      openGraph: {
        title: investigation.title,
        description: investigation.description,
        type: 'article',
        publishedTime: investigation.published_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: investigation.title,
        description: investigation.description,
      },
    };
  } catch (error) {
    console.log(error)
    return {
      title: 'تحقيق غير موجود',
      description: 'عذراً، لم يتم العثور على التحقيق المطلوب',
    };
  }
}

export default async function InvestigationDetailPage({ params }: InvestigationDetailPageProps) {
  let investigation;
  
  try {
    investigation = await investigationsService.getInvestigationById(parseInt(params.id));
  } catch (error) {
    console.log(error)
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <InvestigationDetail // Using the renamed component
        investigation={investigation}
      />
    </div>
  );
}