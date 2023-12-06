/* eslint-disable no-console */
'use client'

import { Link as LinkImg, BookmarkPlus, BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Loader } from './loader'
import { useAuth } from '@/hooks/authProvider'
import { addBook, addStock, deleteStock, getBook, getStock } from '@/lib/supabaseFunctions'

export default function BookCardProp({
  id,
  title,
  isbn10,
  isbn13,
  description,
  publishedDate,
  authors,
  pageCount,
  thumbnail,
  publisher,
}: {
  id: string
  title: string
  isbn10: string
  isbn13: string
  description: string
  publishedDate: string
  authors: string[]
  pageCount: number
  thumbnail: string
  publisher: string
}) {
  const [stock, setStock] = useState(false)
  const submitStockProcessing = useRef(false)
  const [loadingStock, setLoadingStock] = useState(false)
  const isbn = isbn13 ? isbn13 : isbn10

  const profileFromGithub = useAuth()?.profileFromGithub
  const userId: number = profileFromGithub?.id ?? 0;

  useEffect(() => {
    // データを取得する処理を行う関数
    const fetchStock = async () => {
      if (userId == null) return
      
      getStock(userId, isbn).then((stockData) => {
        if (stockData == null || stockData?.length == 0) {
          setStock(false)
        } else {
          setStock(true)
        }
      })
    }

    fetchStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAddStock = () => {
    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    addStock(userId, isbn)
      .then(() => {
        setStock(true)

        // book情報なければ登録
        addBookDataNonExists()

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
    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    deleteStock(userId, isbn13)
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

  const addBookDataNonExists = async () => {
    getBook(isbn).then((bookData) => {
      if (!!bookData) {
        console.info('Data already exists')
        return
      }

      // データが存在しないときのみデータ登録
      const bookTitle = title
      addBook(isbn, bookTitle, thumbnail, publisher, publishedDate, pageCount, description).then(() => {
        console.log('added book')
      })
    })
  }

  return (
    <div className="rounded-xl bg-blue-950	 px-5 py-7 text-white">
      <dl className="flex">
        <dt className="w-36">タイトル:</dt>
        <dd className="w-3/4">{title}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">著者:</dt>
        <dd className="w-3/4">{authors}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">出版社:</dt>
        <dd className="w-3/4">{publisher}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">あらすじ:</dt>
        <dd className="w-3/4">{description}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">ISBN10:</dt>
        <dd className="w-3/4">{isbn10}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">ISBN13:</dt>
        <dd className="w-3/4">{isbn13}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">発売日:</dt>
        <dd className="w-3/4">{publishedDate}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">ページ数:</dt>
        <dd className="w-3/4">{pageCount}</dd>
      </dl>

      <div className="mt-6 flex">
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
      <Link href={`/books/${isbn}`} className="ml-6 flex">
        <LinkImg />
        詳細情報
      </Link>
      </div>
    </div>
  )
}
