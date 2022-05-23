import type { NextPage } from 'next'
import Header from '../components/Header'
import Link from 'next/link'

const posts = [
  {
    title: 'If you gained weight during Covid, read this',
    excerpt:
      'a) you are not alone, b) maybe that’s a good thing And, sure enough, another pair of pants didn’t fit. The pile in front of me was getting smaller and I was getting more and more confused. I was trying to pack for my first',
    img: 'https://miro.medium.com/fit/c/112/112/1*JfGLWAb9akBly3bpTG1Mig.jpeg',
  },
  {
    title: 'If you gained weight during Covid, read this',
    excerpt:
      'a) you are not alone, b) maybe that’s a good thing And, sure enough, another pair of pants didn’t fit. The pile in front of me was getting smaller and I was getting more and more confused. I was trying to pack for my first',
    img: 'https://miro.medium.com/fit/c/112/112/1*JfGLWAb9akBly3bpTG1Mig.jpeg',
  },
  {
    title: 'If you gained weight during Covid, read this',
    excerpt:
      'a) you are not alone, b) maybe that’s a good thing And, sure enough, another pair of pants didn’t fit. The pile in front of me was getting smaller and I was getting more and more confused. I was trying to pack for my first',
    img: 'https://miro.medium.com/fit/c/112/112/1*JfGLWAb9akBly3bpTG1Mig.jpeg',
  },
  {
    title: 'If you gained weight during Covid, read this',
    excerpt:
      'a) you are not alone, b) maybe that’s a good thing And, sure enough, another pair of pants didn’t fit. The pile in front of me was getting smaller and I was getting more and more confused. I was trying to pack for my first',
    img: 'https://miro.medium.com/fit/c/112/112/1*JfGLWAb9akBly3bpTG1Mig.jpeg',
  },
  {
    title: 'If you gained weight during Covid, read this',
    excerpt:
      'a) you are not alone, b) maybe that’s a good thing And, sure enough, another pair of pants didn’t fit. The pile in front of me was getting smaller and I was getting more and more confused. I was trying to pack for my first',
    img: 'https://miro.medium.com/fit/c/112/112/1*JfGLWAb9akBly3bpTG1Mig.jpeg',
  },
  {
    title: 'If you gained weight during Covid, read this',
    excerpt:
      'a) you are not alone, b) maybe that’s a good thing And, sure enough, another pair of pants didn’t fit. The pile in front of me was getting smaller and I was getting more and more confused. I was trying to pack for my first',
    img: 'https://miro.medium.com/fit/c/112/112/1*JfGLWAb9akBly3bpTG1Mig.jpeg',
  },
]

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10">
      <Header pageTitle="Главная" />
      <div className="grid grid-cols-2 gap-10 py-10">
        {posts.map(({ title, excerpt, img }) => (
          <div
            key={title}
            className="cursor-pointer rounded-lg border border-gray-300 p-4 transition hover:bg-gray-100"
          >
            <div className="flex">
              <div className="mr-4">
                <div className="text-xl font-bold">{title}</div>
                <div>{excerpt}</div>
              </div>
              <div className="min-w-fit">
                <img width="100%" className="rounded-md" src={img} />
              </div>
            </div>
            <Link href="/">
              <span className="cursor-pointer text-lg">Read more</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
