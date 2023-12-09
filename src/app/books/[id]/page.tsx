'use client'

import { Image } from '@nextui-org/react'
import { BookmarkPlus, BookmarkCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Layout from '@/app/layout'
import { Loader } from '@/components/loader'
import NavigationBar from '@/components/navigationBar'
import { useAuth } from '@/hooks/authProvider'
import { searchBookById } from '@/lib/fetchGoogle'
import { Tables } from '@/lib/supabase'
import { addBook, addStock, deleteStock, getBook, getStock } from '@/lib/supabaseFunctions'
import utilStyles from '@/styles/utils.module.css'

export default function BookPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Tables<'book'>>()
  const id = params.id;
  const submitProcessing = useRef(false)

  const [stock, setStock] = useState(false)
  const submitStockProcessing = useRef(false)
  const [loadingStock, setLoadingStock] = useState(false)

  const profileFromGithub = useAuth()?.profileFromGithub
  const userId: number = profileFromGithub?.id ?? 0;

  useEffect(() => {
    const fetchBook = async () => {
      getBook(id).then((bookData) => {
        if (bookData) {
          setBook(bookData)
        } else {
          searchBookById(id)
            .then((result) => {
              if (result) {
                const isbn = result.volumeInfo.industryIdentifiers[0]?.identifier ? result.volumeInfo.industryIdentifiers[0]?.identifier : result.volumeInfo.industryIdentifiers[1]?.identifier
                
                // 1回だけ登録するようにする
                if (submitProcessing.current) return
                submitProcessing.current = true
                addBook(result.id, isbn, result.volumeInfo.title, result.volumeInfo.imageLinks?.thumbnail, result.volumeInfo.publisher, result.volumeInfo.publishedDate, result.volumeInfo.pageCount, result.volumeInfo.description)
                
                const newBook = {
                  id: id,
                  description: result.volumeInfo.description,
                  isbn: isbn,
                  name: result.volumeInfo.title,
                  page: result.volumeInfo.pageCount,
                  published_date: result.volumeInfo.publishedDate,
                  publisher: result.volumeInfo.publisher,
                  thumbnail: result.volumeInfo.imageLinks?.thumbnail,
                  created_at: '',
              };
                
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
    if (userId === 0) {
      alert('ログインしてください')
      return
    }

    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    const isbn = book?.isbn;
    if (isbn == null) return
    addStock(userId, id, isbn)
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
    if (userId === 0) {
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
        <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="flex w-full justify-center sm:w-1/3">
              <Image
                alt={book?.name}
                className="rounded-xl object-cover shadow-lg"
                src={book?.thumbnail}
                width={200}
              />
            </div>
            <div>
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
                <dt className="w-32">ISBN</dt>
                <dd>{book?.isbn}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-32">出版社</dt>
                <dd>{book?.publisher}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-32">発売日</dt>
                <dd>{book?.published_date}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-32">ページ数</dt>
                <dd>{book?.page == null || book?.page === 0 ? '' : book?.page}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-12">
            {book?.description}
          </div>
        </div>
      </div>
    </Layout>
  )
}

