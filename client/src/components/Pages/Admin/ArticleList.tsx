import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../Layouts/AdminLayout'
import { ArticleType } from '../../types/ArticleTypes';

function ArticleList() {

  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [error, setError] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/v1/article`)
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
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setArticles([])
      })
      .finally(() => {
        setLoading(false);
      })

  }, []);

  // console.log(loading);
  const articleList = articles.map(article => {
    return (
      <tr key={article._id}>

        <td><Link to={`/admin/edit/${article.slug}`}>{article.title}</Link></td>
        <td>{article.published ? 'published' : ''}</td>
        <td>{article.category.title}</td>
      </tr>
    );
  })

  return (
    <AdminLayout>
      <h1>Article list</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>title</th>
            <th>published</th>
            <th>category</th>
          </tr>
        </thead>
        <tbody>
          {articleList}
        </tbody>
      </table>
    </AdminLayout>
  )
}

export default ArticleList