import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryType } from './types/CategoryTypes';

function PublicHeader() {

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/v1/category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => {
        setCategories(response.categories);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setCategories([])
      })
      .finally(() => {
        setLoading(false);
      })

  }, []);


  const categoryList = categories.map(category => {
    return (
      <li key={category._id}>
        <Link to={`/blog/category/${category.slug}`}>{category.title}</Link>

      </li>
    );
  })

  return (
    <header>
      <div className='container'>
        <div className="topbar">
          <nav>
            <ul role='menu'>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/about'}>About</Link></li>
              <li><Link to={'/contact'}>Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className='navbar'>
          <nav>
            <ul role='menu'>
              {categoryList}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default PublicHeader

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
