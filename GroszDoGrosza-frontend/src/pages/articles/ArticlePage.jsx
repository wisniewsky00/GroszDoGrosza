import { useParams } from "react-router-dom";
import { articlesMap } from "./articlesMap";
import { Link, Navigate } from "react-router-dom";
import './ArticlePage.css';

export function ArticlePage() {

  const { slug } = useParams();
  const article = articlesMap[slug];

  if (!article) {
    return <Navigate to="/articles" replace />
  }

  const ArticleComponent = article.component;

  return (
    <article className="article-page">
      <Link to="/articles" className="back-link">
        ← Wróć do artykułów
      </Link>

      <div className="article-content">
        <ArticleComponent />
      </div>
    </article>
  )
}