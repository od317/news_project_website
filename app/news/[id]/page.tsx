// app/news/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { newsService } from "@/lib/api/core";
import NewsHeader from "@/components/news/news-header";
import NewsContent from "@/components/news/news-content";

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  try {
    const article = await newsService.getNewsById(parseInt(params.id));
    console.log(article)
    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: article.image ? [article.image] : [],
        type: 'article',
        publishedTime: article.published_at,
        authors: [article.author_name],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.image ? [article.image] : [],
      },
    };
  } catch (error) {
    console.log(error)
    return {
      title: 'خبر غير موجود',
      description: 'عذراً، لم يتم العثور على الخبر المطلوب',
    };
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  let article;
  
  try {
    article = await newsService.getNewsById(parseInt(params.id));
  } catch (error) {
    console.log(error)
    notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      {/* News Header */}
      <NewsHeader article={article} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <NewsContent article={article} />
          </div>
        </div>
      </div>
    </div>
  );
}