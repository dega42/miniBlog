import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticlePreview from '../../ArticlePreview';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import PublicGridLayout from '../../Layouts/PublicGridLayout';
import { ArticleType } from '../../types/ArticleTypes';
function Articles() {

  const { categorySlug, tagSlug } = useParams();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [error, setError] = useState<null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let fetchUrl: string = "";
    if (categorySlug) {
      fetchUrl = `http://localhost:8000/api/v1/article/category/${categorySlug}`;
    } else if (tagSlug) {
      fetchUrl = `http://localhost:8000/api/v1/article/tag/${tagSlug}`;
    }

    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => {
        setArticles(response.articles);
        setIsLoading(false)
        console.log(response.articles);
        
        // if (response.article.length < 1) setError({message: 'Out of articles'})
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        setArticles([])
      })
    // .finally(() => {
    //   setIsLoading(false);
    // })

  }, [categorySlug, tagSlug]);

  const articleList = articles.map(article => {
    return (
      <ArticlePreview
        id={article._id}
        key={article._id}
        title={article.title}
        slug={article.slug}
        content={article.content}
        category={article.category}
        tags={article.tags}
      />
    );
  })

  return (
    <PublicGridLayout>
      <h1>Articles</h1>
      {isLoading ? <LoadingSpinner /> : articleList}
    </PublicGridLayout>
  )
}

export default Articles