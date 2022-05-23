import { request, gql } from 'graphql-request'

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            id
            createdAt
            excerpt
            title
            slug
            author {
              userImage {
                url
              }
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
    query
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

export const getPostDetails = async (slug: any) => {
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
              userImage {
                url
              }
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

export const getPostsByCategory = async (slug: any) => {
  const query = gql`
    query MyQuery($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          node {
            id
            createdAt
            excerpt
            title
            author {
              name
              userImage {
                url
              }
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

export const getCategoryBySlug = async (slug: any) => {
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
