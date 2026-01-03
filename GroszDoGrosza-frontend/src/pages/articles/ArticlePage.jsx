import { useParams } from "react-router-dom";
import { articlesMap } from "./articlesMap";

export function ArticlePage() {

  const { slug } = useParams();
  const article = articlesMap[slug];

  if (!article) {
    return <Navigate to="/articles" replace />
  }

  const ArticleComponent = article.component;

  return (
    <article className="article-page">
      <ArticleComponent />
    </article>
  )
}