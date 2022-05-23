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
            content {
              text
            }
            author {
              userImage {
                url
              }
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
