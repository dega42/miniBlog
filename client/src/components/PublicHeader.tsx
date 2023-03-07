import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryType } from './types/CategoryTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import './PublicHeader.css';


function PublicHeader() {

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
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
    <header className={'header'}>
      <nav className={`page-navigation ${isNavExpanded ? "menu-active" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className={`social-icons ${isNavExpanded ? "menu-active" : ""}`}>
        <ul>
          <li><Link to={'/#'}><FontAwesomeIcon icon={faFacebook} /></Link></li>
          <li><Link to={'/#'}><FontAwesomeIcon icon={faTwitter} /></Link></li>
          <li><Link to={'/#'}><FontAwesomeIcon icon={faInstagram} /></Link></li>
          <li><Link to={'/#'}><FontAwesomeIcon icon={faPinterest} /></Link></li>
          <li><Link to={'/#'}><FontAwesomeIcon icon={faSkype} /></Link></li>
        </ul>
      </div>
      <div className={'brand-logo'}>
        <li><Link to="/">miniBlog</Link></li>
      </div>
      <nav className={`category-navigation ${isNavExpanded ? "menu-active" : ""}`}>
        <ul>
          {categoryList}
        </ul>
      </nav>
      <div className={'search-bar'}>
        <ul>
          <li><FontAwesomeIcon icon={faMagnifyingGlass} /></li>
          <li className={'mobileNavIcon'} onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}><FontAwesomeIcon icon={faBars} /></li>
        </ul>
      </div>
    </header>
  )
}

export default PublicHeader
