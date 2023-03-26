import { Link } from "react-router-dom"
import { ArticleType } from "./types/ArticleTypes"


function ArticePreview(props: {
    id: string,
    key: string,
    title: string,
    slug: string,
    content: string,
    category: {
        title: string,
        slug: string
    },
    tags: Array<string>
}) {

    return (
        <div>
            <h3><Link to={`/blog/${props.category.slug}/${props.slug}`}>{props.title}</Link></h3>
            <span>Author</span> | <span>2023.02.02</span> | {props.tags.map((tag) => tag).join(', ')}
            <figure>
                <img src="https://via.placeholder.com/800x400?text=stock+photo" alt="Image" />
            </figure>

            <p>{props.content}</p>
            <Link to={`/blog/${props.category.slug}/${props.slug}`} className="button">Read more...</Link>
        </div>
    )
}

export default ArticePreview