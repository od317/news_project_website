// components/investigations/investigation-header.tsx
import { Investigation } from "@/lib/types";
import Link from "next/link";

interface InvestigationHeaderProps {
  investigation: Investigation;
}

export default function InvestigationHeader({
  investigation,
}: InvestigationHeaderProps) {
  console.log(investigation);
  const formattedDate = new Date(investigation.published_at).toLocaleDateString(
    "ar-EG",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
  );

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="/investigations"
            className="hover:text-foreground transition-colors"
          >
            التحقيقات
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">تفاصيل التحقيق</span>
        </nav>

        {/* Investigation Meta */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            تحقيق حصري
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {investigation.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {investigation.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span>{investigation.total_pages} صفحة</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
