import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { CategoryType } from '../../types/CategoryTypes';

function Categories() {

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
  const addCategoryFetch = async (e: any) => {
    try {
      // const response = await fetch('http://localhost:8000/api/v1/category');
      // const data = await response.json();
      console.log(e.target.category.value);

    } catch (error) {
      console.error(error);
    }
  };
  const categoryList = categories.map(category => {
    return (
      <li key={category._id}>
        {category.title} <small>{category.slug}</small>
      </li>
    );
  })
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addCategoryFetch(e)
    console.log(e.target.category.value);

  }
  return (
    <AdminLayout>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">New category</label>
        <input type="text" id='category' />
        <input type="submit" value='Add' />
      </form>
      <ul>
        {categoryList}
      </ul>
    </AdminLayout>
  )
}

export default Categories