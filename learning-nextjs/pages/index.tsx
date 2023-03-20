import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ArticleList from '@/components/ArticleList'

const inter = Inter({ subsets: ['latin'] })

export default function Home({articles}: any) {
  return (
    <>
      <div>
         <ArticleList articles={articles}/>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json()

  return {
    props: {
      articles
    }
  }
}