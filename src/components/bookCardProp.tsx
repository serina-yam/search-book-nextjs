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
  industryIdentifier,
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
  industryIdentifier: string
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

  const profileFromSession = useAuth()?.profileFromSession
  const userId: number = profileFromSession?.id ?? 0
  const industryIdentifierInfo = isbn13 ? isbn13 : isbn10 ? isbn10 : industryIdentifier

  useEffect(() => {
    // データを取得する処理を行う関数
    const fetchStock = async () => {
      if (userId == null) return

      getStock(userId, id).then((stockData) => {
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
    if (userId === 0) {
      alert('ログインしてください')
      return
    }

    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    addStock(userId, id, industryIdentifierInfo)
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

  const addBookDataNonExists = async () => {
    getBook(id).then((bookData) => {
      if (!!bookData) {
        console.info('Data already exists')
        return
      }

      // データが存在しないときのみデータ登録
      const bookTitle = title
      const author = authors ? authors.join(', ') : null
      addBook(
        id,
        industryIdentifier,
        isbn10,
        isbn13,
        bookTitle,
        thumbnail,
        publisher,
        publishedDate,
        pageCount,
        description,
        author
      ).then(() => {
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
      {industryIdentifier != '' ? (
        <dl className="flex">
          <dt className="w-36">PKEY:</dt>
          <dd className="w-3/4">{industryIdentifier}</dd>
        </dl>
      ) : (
        <>
          <dl className="flex">
            <dt className="w-36">ISBN10:</dt>
            <dd className="w-3/4">{isbn10}</dd>
          </dl>
          <dl className="flex">
            <dt className="w-36">ISBN13:</dt>
            <dd className="w-3/4">{isbn13}</dd>
          </dl>
        </>
      )}
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
        <Link href={`/books/${id}`} className="ml-6 flex">
          <LinkImg />
          詳細情報
        </Link>
      </div>
    </div>
  )
}
