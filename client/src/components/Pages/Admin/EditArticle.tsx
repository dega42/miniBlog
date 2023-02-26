import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminLayout from '../../Layouts/AdminLayout'
import { CategoryType } from '../../types/CategoryTypes';

function EditArticle() {
    const [isChecked, setIsChecked] = useState(false)
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [error, setError] = useState<any>(null);
    const { articleSlug } = useParams();
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/category')
            .then((responseCategory) => responseCategory.json())
            .then((dataCategory) => {
                setCategories(dataCategory.categories);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setCategories([]);
            })
    }, [])
    return (
        <AdminLayout>
            <h1>Edit {articleSlug}</h1>

        </AdminLayout>
    )
}

export default EditArticle