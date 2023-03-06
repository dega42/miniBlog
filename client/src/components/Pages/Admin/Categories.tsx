import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { CategoryType } from '../../types/CategoryTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function Categories() {

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        fetch(`http://localhost:8000/api/v1/category`)
            .then((response) => {
                console.log(response.ok); // will be true if the response is successfull
                console.log(response.status); // the status code = 200 or code = 400 etc.
                // if (!response.ok) {
                //     throw new Error(
                //         `This is an HTTP error: The status is ${response.status}`
                //     );
                // }
                return response.json();
            })
            .then((response) => {
                setCategories(response.categories);
                setError({});
            })
            .catch((err) => {
                setError(err.message);
                setCategories([])
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleDelete = (id: string) => {
        console.log('del', id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            
        };
        fetch(`http://localhost:8000/api/v1/category/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setError(data)
                fetchCategories()
            })
    }
    const categoryList = categories.map(category => {
        return (
            <li key={category._id}>
                {category.title} <small>{category.slug}</small> <button className='icon-btn' onClick={() => handleDelete(category._id)}><FontAwesomeIcon icon={faTrash} /></button>
            </li>
        );
    })

    const handleAdd = (e: any) => {
        e.preventDefault();
        const newCategory = e.target.category.value
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newCategory, slug: newCategory })
        };
        fetch('http://localhost:8000/api/v1/category', requestOptions)
            .then(response => response.json())
            .then(data => {
                setError(data)
                fetchCategories()
                e.target.category.value = '';
                console.log(e.target.category.value);
            })
    }

    return (

        <AdminLayout>

            <h1>Categories</h1>
            {error !== null && (
                <div>{error.toString()}</div>
            )}
            <form onSubmit={handleAdd}>
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