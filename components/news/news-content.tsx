// components/news/news-content.tsx
import { NewsArticle } from "@/lib/types";
import NewsResources from "./news-resources";

interface NewsContentProps {
  article: NewsArticle;
}

export default function NewsContent({ article }: NewsContentProps) {
  return (
    <article className="bg-card rounded-2xl border border-border p-6 md:p-8">
      {/* Share Buttons */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">محتوى الخبر</h2>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline">
        {article.body ? (
          <div 
            className="leading-8 text-foreground/90 text-lg space-y-6"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        ) : (
          <div className="leading-8 text-foreground/90 text-lg space-y-6">
            <p>
              {article.excerpt}
            </p>
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
            </p>
            <p>
              إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
            </p>
            <p>
              ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.
            </p>
          </div>
        )}
      </div>

      {/* Resources Section */}
      {article.resources && article.resources.length > 0 && (
        <NewsResources resources={article.resources} />
      )}

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>تم النشر في: {new Date(article.published_at).toLocaleDateString('ar-EG')}</span>
            <span>آخر تحديث: {new Date(article.updated_at || article.created_at).toLocaleDateString('ar-EG')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>الكلمات المفتاحية:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-accent rounded-full text-xs">أخبار</span>
              <span className="px-2 py-1 bg-accent rounded-full text-xs">تحديث</span>
              <span className="px-2 py-1 bg-accent rounded-full text-xs">معلومات</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}