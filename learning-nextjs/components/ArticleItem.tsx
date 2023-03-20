import React from 'react'
import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'

interface IProps{
    article: any
}

const ArticleItem = ({article}: IProps) => {
  return (
  <Link href={`/article/${article.id}`}>
    <div className={articleStyles.card}>
      <h3>{article.title} &rarr;</h3>
      <p>{article.excerpt}</p>
    </div>
  </Link>
  )
}

export default ArticleItem