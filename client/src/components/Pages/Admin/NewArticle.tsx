import { createRef, useEffect, useState } from "react"
import slugify from 'react-slugify';

import AdminLayout from '../../Layouts/AdminLayout'
import { CategoryType } from "../../types/CategoryTypes";

interface TagType {
  value: string
  label: string
}

function NewArticle() {

  const refSlug = createRef<HTMLInputElement>();

  const [isChecked, setIsChecked] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [error, setError] = useState<any>(null);

  const [tags, setTags] = useState<TagType[]>([]);

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
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/article/tags');
        const data = await response.json();
        // const tags = Object.keys(data).map((key) => {
        //   return key

        // })
        const tags = [
          { value: 'css', label: 'CSS' },
          { value: 'html', label: 'HTML' },
          { value: 'js', label: 'JS' }
        ]


        //setTags(tags)
        // setTags(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();

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
        <option key={index} value={option.slug}>{option.title}</option>
      );
    });
  };


  return (
    <AdminLayout>
      <h1>New article</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="slug" id="title" onChange={handleTitleChange} />
        </p>
        <p>
          <label htmlFor="slug">Slug</label>
          <input type="text" name="slug" id="slug" readOnly disabled value={''} ref={refSlug} />
        </p>
        <p>
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
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

export default NewArticle