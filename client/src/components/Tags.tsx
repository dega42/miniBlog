import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Tags() {

  const [tags, setTags] = useState<Object | null>();
  const [error, setError] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/v1/article/tags`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => {
        setTags(response);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTags(null)
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <div className='box'>
      <h2>Tags</h2>
      {tags && Object.entries(tags).map(([value, index]) => (<Link to={`/blog/tag/${value}`} className="button" key={value}>{value}</Link>))}
    </div>
  )
}

export default Tags