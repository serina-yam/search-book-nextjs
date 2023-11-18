'use client'

import axios from 'axios'
import { useRef, useState } from 'react'
import Layout from '@/app/layout'
import BookDetails from '@/components/BookDetails'
import LoginButton from '@/components/LoginButton'
import LogoutButton from '@/components/LogoutButton'
import SearchBar from '@/components/SearchBar'
import useAuth from '@/hooks/useAuth'
import utilStyles from '@/styles/utils.module.css'
import BookInfo from '@/types/SearchResult'

export default function Home() {
  const { session: isLogin } = useAuth()
  const [input, setInput] = useState('')
  const submitProcessing = useRef(false)
  const [books, setBooks] = useState<BookInfo[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleButtonClick = () => {
    // 連続送信中止
    if (submitProcessing.current) return
    submitProcessing.current = true

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

  const searchBooksByTitle = async (title: string) => {
    try {
      if (title.length === 0) {
        return []
      }
      const response = await axios.get(`${'https://www.googleapis.com/books/v1/volumes'}?q=${title}`)
      return response.data.items
    } catch (error) {
      console.error(error)
    }
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
        <header>
        {isLogin ? (
          <>
            <h2>Githubでログアウト</h2>
            <LogoutButton />
          </>
        ) : (
          <>
            <h2>Githubでサインイン</h2>
            <LoginButton />
          </>
        )}
        </header>
      <main>
        {/* <section className={`${utilStyles.headingMd} ${isVisible ? utilStyles.stickyBg : ''} sticky top-0`}> */}
        <section className={`${utilStyles.headingMd}`}>
          <div className={utilStyles.container}>
            <h2 className="text-center">
              Let&apos;s search for books
              <br />
              by title
            </h2>
            <SearchBar
              input={input}
              loading={loading}
              handleInputChange={handleInputChange}
              handleButtonClick={handleButtonClick}
            />
          </div>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-4">
            {books.map((book: BookInfo) => (
              <BookDetails
                key={book.id}
                id={book.id}
                title={book.volumeInfo.title}
                isbn10={book.volumeInfo.industryIdentifiers[0]?.identifier}
                isbn13={book.volumeInfo.industryIdentifiers[1]?.identifier}
                previewLink={book.volumeInfo.previewLink}
                cover_image={book.volumeInfo.imageLinks?.thumbnail}
                description={book.volumeInfo.description}
                publishedDate={book.volumeInfo.publishedDate}
                averageRating={book.volumeInfo.averageRating}
                authors={book.volumeInfo.authors}
                infoLink={book.volumeInfo.infoLink}
                pageCount={book.volumeInfo.pageCount}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                language={book.volumeInfo.language}
                price={book.saleInfo.listPrice?.amount}
                publisher={book.volumeInfo.publisher}
                availability={book.saleInfo.saleability}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
