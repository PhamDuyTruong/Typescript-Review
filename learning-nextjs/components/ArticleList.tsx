import React from 'react'
import articleStyles from '../styles/Article.module.css'
import ArticleItem from './ArticleItem'
interface IProps {
    articles: any
}

const ArticleList = ({articles}: IProps) => {
  return (
    <div className={articleStyles.grid}>
    {articles.map((article: any) => (
        <ArticleItem article={article} />
      ))}
    </div>
  )
}

export default ArticleList