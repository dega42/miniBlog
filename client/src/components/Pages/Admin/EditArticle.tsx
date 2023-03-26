import { createRef, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import AdminLayout from '../../Layouts/AdminLayout'
import { ArticleType } from "../../types/ArticleTypes";
import { CategoryType } from '../../types/CategoryTypes';

function EditArticle() {
    const [isChecked, setIsChecked] = useState(false)
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [article, setArticle] = useState<ArticleType>({
        _id: '',
        title: '',
        slug: '',
        content: '',
        category: {
          title: '',
          slug: '',
        },
        tags: [],
        published: false,
      });
    
    const refSlug = createRef<HTMLInputElement>();
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
                setArticle({
                    _id: '',
                    title: '',
                    slug: '',
                    content: '',
                    category: {
                      title: '',
                      slug: '',
                    },
                    tags: [],
                    published: false,
                  })
            })
    }, [])

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(e.target.title.value, e.target.category.value);
    }

    const handleTitleChange = (e: any) => {
        if (refSlug.current) {
            refSlug.current.value = slugify(e.target.value);
        }
    }
    const categoryOptions = () => {
        return categories.map((option, index) => {
            return (
                <option
                key={index}
                value={option.slug}
                
                >{option.title}</option>
            );
        });
    };
    return (
        <AdminLayout>
            <h1>Edit {articleSlug}</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="slug"
                        id="title"
                        onChange={handleTitleChange}
                        
                        value={article!.title}
                        //value={article.category.slug}
                    />
                </p>
                <p>
                    <label htmlFor="slug">Slug</label>
                    <input type="text" name="slug" id="slug" readOnly disabled value={''} ref={refSlug} />
                </p>
                <p>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={article.category.slug}>
                        {categoryOptions()}
                    </select>
                </p>
                <p>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" placeholder="Content..."></textarea>
                </p>
                <p>
                    <label htmlFor="tags">Tags</label>
                    <input type="text" id="tags" />
                </p>

                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={checkHandler}
                />
                <label htmlFor="checkbox">Publication at specified time</label>

                <p>
                    <label htmlFor="idtl">Published date</label>
                    <input type="datetime-local" id="idtl" value="1970-01-01T00:00" disabled={!isChecked} />
                </p>
                <p>
                    <button>Preview</button>
                    <button type="submit">Save</button>
                    <button type="submit">Save & Publish</button>
                </p>
            </form>
        </AdminLayout>
    )
}

export default EditArticle