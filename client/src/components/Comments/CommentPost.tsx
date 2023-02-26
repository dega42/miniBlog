function CommentPost() {
  return (
    <div>
        <h2>Write comment</h2>
            <form>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="comment">Comment</label>
                    <textarea name="comment" id="comment"></textarea>
                </div>
                <button type="submit">Post</button>
            </form>
    </div>
  )
}

export default CommentPost