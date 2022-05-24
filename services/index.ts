import { request, gql } from 'graphql-request'

export const getPosts = async (limit: number = 10) => {
  const query = gql`
    query MyQuery($limit: Int!) {
      postsConnection(orderBy: createdAt_DESC, first: $limit) {
        edges {
          node {
            id
            createdAt
            excerpt
            title
            slug
            author {
              img
              name
              email
            }
            image {
              url
            }
          }
        }
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { limit }
  )
  return results.postsConnection.edges
}

export const getCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        name
        slug
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query
  )
  return results.categories
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      postsConnection(where: { slug: $slug }) {
        edges {
          node {
            id
            createdAt
            excerpt
            title
            content {
              raw
            }
            author {
              name
              img
              email
            }
            image {
              url
            }
          }
        }
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { slug }
  )
  return results.postsConnection.edges
}

export const getPostsByCategory = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      postsConnection(
        where: { categories_some: { slug: $slug } }
        orderBy: createdAt_DESC
      ) {
        edges {
          node {
            id
            createdAt
            excerpt
            title
            author {
              name
              img
              email
            }
            image {
              url
            }
            slug
          }
        }
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { slug }
  )
  return results.postsConnection.edges
}

export const getPostsByUser = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      postsConnection(
        where: { author: { email: $slug } }
        orderBy: createdAt_DESC
      ) {
        edges {
          node {
            id
            createdAt
            excerpt
            title
            author {
              name
              img
              email
            }
            image {
              url
            }
            slug
          }
        }
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { slug }
  )
  return results.postsConnection.edges
}

export const getCategoryBySlug = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      categories(where: { slug: $slug }) {
        name
        slug
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { slug }
  )
  return results.categories[0]
}

export const isNewUser = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      authors(where: { email: $slug }) {
        id
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { slug }
  )
  return results.authors.length === 0
}

export const addUser = async (user: any) => {
  const { name, email } = user
  const img = user.image
  const query = gql`
    mutation ($name: String!, $email: String!, $img: String!) {
      createAuthor(data: { name: $name, email: $email, img: $img }) {
        name
        email
        img
      }
      publishAuthor(where: { email: $email }) {
        id
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { name, email, img }
  )
  return results
}

export const addBlog = async (blog: any, user: any) => {
  const { email } = user
  const query = gql`
    mutation ($name: String!, $email: String!, $img: String!) {
      createPost(data: { user: $email, email: $email, img: $img }) {
        name
        email
        img
      }
      publishAuthor(where: { email: $email }) {
        id
      }
    }
  `

  const results = await request(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
    query,
    { email }
  )
  return results
}
