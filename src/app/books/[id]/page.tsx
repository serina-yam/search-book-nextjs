'use client'

import { Image } from '@nextui-org/react'
import { BookmarkPlus, BookmarkCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Layout from '@/app/layout'
import { Loader } from '@/components/loader'
import NavigationBar from '@/components/navigationBar'
import { useAuth } from '@/hooks/authProvider'
import { removeHTMLTags, searchBookById } from '@/lib/fetchGoogle'
import { Tables } from '@/lib/supabase'
import { addBook, addStock, deleteStock, getBook, getStock } from '@/lib/supabaseFunctions'
import utilStyles from '@/styles/utils.module.css'

export default function BookPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [book, setBook] = useState<Tables<'book'>>()
  const id = params.id
  const submitProcessing = useRef(false)

  const [stock, setStock] = useState(false)
  const submitStockProcessing = useRef(false)
  const [loadingStock, setLoadingStock] = useState(false)

  const profileFromSession = useAuth()?.profileFromSession
  const userId: string = profileFromSession?.id ?? ''

  useEffect(() => {
    const fetchBook = async () => {
      getBook(id).then((bookData) => {
        if (bookData) {
          setBook(bookData)
        } else {
          searchBookById(id)
            .then((result) => {
              if (result) {
                // 1回だけ登録するようにする
                if (submitProcessing.current) return
                submitProcessing.current = true

                const industryIdentifier =
                  result.volumeInfo.industryIdentifiers &&
                  result.volumeInfo.industryIdentifiers.length > 0 &&
                  result.volumeInfo.industryIdentifiers[0].identifier.includes('PKEY')
                    ? result.volumeInfo.industryIdentifiers[0].identifier.replace('PKEY:', '')
                    : null
                const isbn13 =
                  result.volumeInfo.industryIdentifiers &&
                  result.volumeInfo.industryIdentifiers.length > 0 &&
                  !result.volumeInfo.industryIdentifiers[0].identifier.includes('PKEY')
                    ? result.volumeInfo.industryIdentifiers[1].identifier
                    : null
                const isbn10 =
                  result.volumeInfo.industryIdentifiers && result.volumeInfo.industryIdentifiers.length > 0
                    ? result.volumeInfo.industryIdentifiers[0].identifier
                    : null
                addBook(
                  result.id,
                  industryIdentifier,
                  isbn13,
                  isbn10,
                  result.volumeInfo.title,
                  result.volumeInfo.imageLinks?.thumbnail,
                  result.volumeInfo.publisher,
                  result.volumeInfo.publishedDate,
                  result.volumeInfo.pageCount,
                  removeHTMLTags(result.volumeInfo.description),
                  result.volumeInfo.author
                )

                const newBook = {
                  id: id,
                  description:
                    result.volumeInfo.description != 'undefined' ? removeHTMLTags(result.volumeInfo.description) : '',
                  industryIdentifier: industryIdentifier,
                  isbn13: isbn13,
                  isbn10: isbn10,
                  name: result.volumeInfo.title,
                  page: result.volumeInfo.pageCount,
                  published_date: result.volumeInfo.publishedDate,
                  publisher: result.volumeInfo.publisher,
                  thumbnail: result.volumeInfo.imageLinks?.thumbnail,
                  author: result.volumeInfo.author,
                  created_at: '',
                }

                setBook(newBook)
              }
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
    }

    const fetchStock = async () => {
      getStock(userId, id).then((stockData) => {
        if (stockData == null || stockData?.length == 0) {
          setStock(false)
        } else {
          setStock(true)
        }
      })
    }

    fetchBook()
    fetchStock()
  }, [id, userId])

  const onAddStock = () => {
    if (userId === '') {
      router.push('/login')
      return
    }

    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    const industryIdentifier = book?.isbn13 ? book?.isbn13 : book?.isbn10 ? book?.isbn10 : book?.industryIdentifier
    if (industryIdentifier == null) return
    addStock(userId, id, industryIdentifier)
      .then(() => {
        setStock(true)
        setLoadingStock(false)
        submitStockProcessing.current = false
      })
      .catch((error) => {
        console.error(error)
        setStock(false)
        setLoadingStock(false)
        submitStockProcessing.current = false
      })
  }

  const onDeleteStock = () => {
    if (userId === '') {
      alert('ログインしてください')
      return
    }

    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    deleteStock(userId, id)
      .then(() => {
        setStock(false)
        setLoadingStock(false)
        submitStockProcessing.current = false
      })
      .catch((error) => {
        console.error(error)
        setStock(false)
        setLoadingStock(false)
        submitStockProcessing.current = false
      })
  }

  return (
    <Layout>
      <NavigationBar />
      <div className="mt-12 h-full rounded-xl bg-slate-50 p-12">
        <div className={`sm:${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="flex w-full justify-center sm:w-1/3">
              <Image alt={book?.name} className="rounded-xl object-cover shadow-lg" src={book?.thumbnail} width={200} />
            </div>
            <div className="mt-6 sm:mt-0">
              {loadingStock ? (
                <button>
                  <Loader />
                </button>
              ) : stock ? (
                <button onClick={onDeleteStock} className="flex">
                  <BookmarkCheck color="#eb4667" />
                  <div>削除する</div>
                </button>
              ) : (
                <button onClick={onAddStock} className="flex">
                  <BookmarkPlus color="#bdbdbd" />
                  <div>ストックする</div>
                </button>
              )}
              <h2>{book?.name}</h2>
              <dl className="flex">
                <dt className="w-auto sm:w-32">著者:</dt>
                <dd>{book?.author}</dd>
              </dl>
              {book?.industryIdentifier != null ? (
                <dl className="flex">
                  <dt className="w-auto sm:w-32">PKEY:</dt>
                  <dd className="w-auto sm:w-3/4">{book?.industryIdentifier}</dd>
                </dl>
              ) : (
                <>
                  <dl className="flex">
                    <dt className="w-auto sm:w-32">ISBN10:</dt>
                    <dd className="w-auto sm:w-3/4">{book?.isbn10}</dd>
                  </dl>
                  <dl className="flex">
                    <dt className="w-auto sm:w-32">ISBN13:</dt>
                    <dd className="w-auto sm:w-3/4">{book?.isbn13}</dd>
                  </dl>
                </>
              )}
              <dl className="flex">
                <dt className="w-auto sm:w-32">出版社:</dt>
                <dd>{book?.publisher}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-auto sm:w-32">発売日:</dt>
                <dd>{book?.published_date}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-auto sm:w-32">ページ数:</dt>
                <dd>{book?.page == null || book?.page === 0 ? '' : book?.page}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-12">
            <pre className="whitespace-pre-wrap">{book?.description}</pre>
          </div>
        </div>
      </div>
    </Layout>
  )
}
