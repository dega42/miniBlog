import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Comments from '../../Comments/Comments'
import PublicGridLayout from '../../Layouts/PublicGridLayout'
import { ArticleType } from '../../types/ArticleTypes';

function Article() {
  const { articleSlug } = useParams();
  const [ article, setArticle ] = useState<ArticleType | null>(null); // így vagy kezdeti title='', stb. értékkel?
  const [ error, setError ] = useState<Object | null>(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:8000/api/v1/article/${articleSlug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => {
        setArticle(response.article[0]);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setArticle(null)
      })
      .finally(() => {
        setLoading(false);
      })

  }, []);

  return (
    <PublicGridLayout>
      <h1>{article?.title}</h1>
      <figure>
        <img src="https://via.placeholder.com/1024x400?text=Article+image" alt="Image" />
      </figure>
      <span>Author</span> | <span>2023.10.12</span> | <span><Link to={`/blog/tag/${article?.category.slug}`}>{article?.category.title}</Link></span> | <span>html, css, javascript</span>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, excepturi, pariatur id doloremque optio commodi sunt corrupti suscipit dolor molestiae, quidem ratione libero a ipsum eveniet cum. Illo libero harum suscipit ipsum eveniet accusantium sed voluptates esse cumque necessitatibus? In.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias nemo dolorum quidem vitae id modi officia dolorem earum quas placeat!</p>

      <Comments />
    </PublicGridLayout>
  )
}

export default Article