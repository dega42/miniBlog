export type ArticleType = {
    _id: string,
    title: string,
    slug: string,
    content: string,
    category: {
      title: string,
      slug: string
    },
    tags: Array<string>,
    published: boolean,
  }