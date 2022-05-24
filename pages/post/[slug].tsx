import { GetStaticPaths } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { UserPostDetails } from '../../components'
import { getPostDetails } from '../../services'

interface IProps {
  post: {
    title: string
    excerpt: string
    image: { url: string }
    author: { img: string; name: string; email: string }
    createdAt: Date
    id: string
    slug: string
    content: {
      raw: { children: [] }
    }
  }
}

const PostPage: React.FC<IProps> = ({ post }) => {
  const getContentFragment = (
    index: number,
    text: any,
    obj: {
      bold: boolean
      italic: boolean
      underline: boolean
      title: string
      src: string
      width: number
      height: number
      children: []
      type: string
    },
    type?: string
  ) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3
            key={index}
            className="mb-4 text-xl font-semibold dark:text-gray-100"
          >
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className="mb-2">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-four':
        return (
          <h4
            key={index}
            className="text-md mb-4 font-semibold dark:text-gray-100"
          >
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        )
      case 'code-block':
        return (
          <code
            key={index}
            className="text-md mb-4 border border-black p-2 font-semibold dark:border-white dark:text-gray-100"
          >
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </code>
        )
      default:
        return modifiedText
    }
  }

  const { title, createdAt } = post
  return (
    <div className="grid pb-20">
      <div className="mb-2">
        <UserPostDetails createdAt={createdAt} author={post.author} />
      </div>
      <div className="mb-8 text-2xl font-bold dark:text-gray-100">{title}</div>
      {post.image?.url ? (
        <div className="mb-4">
          <img className="md:max-w-md lg:max-w-xl" src={post.image?.url} />
        </div>
      ) : null}
      {post.content.raw.children.map(
        (
          typeObj: {
            bold: boolean
            italic: boolean
            underline: boolean
            title: string
            src: string
            width: number
            height: number
            children: []
            type: string
          },
          index
        ) => {
          const children = typeObj.children.map((item: any, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          )

          return getContentFragment(index, children, typeObj, typeObj.type)
        }
      )}
      <Link href="/">
        <span className="cursor-pointer py-4 underline">На главную</span>
      </Link>
    </div>
  )
}

export default PostPage

interface IParams extends ParsedUrlQuery {
  slug: string
}

export async function getStaticProps(context: any) {
  const { slug } = context.params as IParams
  const data = await getPostDetails(slug)
  return { props: { post: data[0].node } }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
