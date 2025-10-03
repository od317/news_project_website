// components/news/news-resources.tsx
import { NewsResource } from "@/lib/types";

interface NewsResourcesProps {
  resources: NewsResource[];
}

export default function NewsResources({ resources }: NewsResourcesProps) {
  return (
    <section className="mt-12 p-6 bg-accent/30 rounded-xl border border-border">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <svg 
          className="w-5 h-5 text-primary" 
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
        المصادر والمراجع
      </h3>
      
      <div className="space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {resource.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {resource.link}
              </p>
            </div>
            
            <svg 
              className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}