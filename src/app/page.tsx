'use client'

import { useEffect, useRef, useState } from 'react'
import Layout from '@/app/layout'
import BookCard from '@/components/bookCard'
import NavigationBar from '@/components/navigationBar'
import SearchBar from '@/components/searchBar'
import { useAuth } from '@/hooks/authProvider'
import { searchBooksByTitle } from '@/lib/fetchGoogle'
import utilStyles from '@/styles/utils.module.css'
import BookInfo from '@/types/bookInfo'

export default function Home() {
  const [input, setInput] = useState('')
  const submitProcessing = useRef(false)
  const [books, setBooks] = useState<BookInfo[]>([])
  const [loading, setLoading] = useState(false)
  const { searchWord, setSearchWord } = useAuth();

  useEffect(() => {
    // 検索条件あればセット
    if (searchWord != '') {
      setInput(searchWord)
      setSearchWord(searchWord)
    }

  }, [searchWord, setSearchWord])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }
  
  const handleButtonClick = () => {
    // 連続送信中止
    if (submitProcessing.current) return
    submitProcessing.current = true

    setSearchWord(input); // 検索条件をセット

    setLoading(true)
    searchBooksByTitle(input)
      .then((books) => {
        if (books) {
          setLoading(false)
          setBooks(books)
          submitProcessing.current = false
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
        submitProcessing.current = false
      })
  }



  // // ヘッダの背景色変更
  // const [isVisible, setIsVisible] = useState(false)
  // const toggleVisibility = () => {
  //   window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false)
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', toggleVisibility)
  //   return () => window.removeEventListener('scroll', toggleVisibility)
  // }, [])

  return (
    <Layout>
      <NavigationBar />
      <main>
        {/* <div className={`${utilStyles.headingMd} ${isVisible ? utilStyles.stickyBg : ''} sticky top-0`}> */}
        <div className={`${utilStyles.headingMd}`}>
          <div className={utilStyles.container}>
            <h2 className="pb-2 text-center">
              <div className="flex flex-col justify-center sm:flex-row">
                <div className="whitespace-pre-wrap">Let&apos;s search for books </div>
                <div>by title</div>
              </div>
            </h2>
            <SearchBar
              input={input}
              loading={loading}
              handleInputChange={handleInputChange}
              handleButtonClick={handleButtonClick}
            />
          </div>
        </div>
        <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-4">
            {books.map((book: BookInfo) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.volumeInfo.title}
                isbn10={book.volumeInfo.industryIdentifiers[0]?.identifier}
                isbn13={book.volumeInfo.industryIdentifiers[1]?.identifier}
                description={book.volumeInfo.description}
                publishedDate={book.volumeInfo.publishedDate}
                authors={book.volumeInfo.authors}
                pageCount={book.volumeInfo.pageCount}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                publisher={book.volumeInfo.publisher}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
