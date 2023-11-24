/* eslint-disable no-console */
'use client'

import { Link as LinkImg, BookmarkPlus, BookmarkCheck, Heart, HeartOff } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Loader } from './loader'
import { addBook, addLike, addStock, deleteLike, deleteStock, getBook, getLike, getStock } from '@/lib/supabaseFunctions'

export default function BookCardProp({
  id,
  title,
  isbn10,
  isbn13,
  description,
  publishedDate,
  averageRating,
  authors,
  infoLink,
  pageCount,
  thumbnail,
  previewLink,
  price,
  publisher,
  availability,
}: {
  id: string
  title: string
  isbn10: string
  isbn13: string
  previewLink: string
  cover_image?: string
  description: string
  publishedDate: string
  averageRating: number
  authors: string[]
  infoLink: string
  pageCount: number
  thumbnail: string
  language?: string
  price?: number
  publisher?: string
  availability?: string
}) {
  const [stock, setStock] = useState(false)
  const submitStockProcessing = useRef(false)
  const [loadingStock, setLoadingStock] = useState(false)

  const [like, setLike] = useState(false)
  const submitLikeProcessing = useRef(false)
  const [loadingLike, setLoadingLike] = useState(false)

  const userId = 64587946
  const isbn = isbn13 ? isbn13 : isbn10

  useEffect(() => {
    // データを取得する処理を行う関数
    const fetchStock = async () => {
      getStock(userId, isbn)
        .then((stockData) => {
          if (stockData?.length !== 0) {
            setStock(true)
          }
        })
    };

    const fetchLike = async () => {
      getLike(userId, isbn)
        .then((likeData) => {
          if (likeData?.length !== 0) {
            setLike(true)
          }
        })
    };

    fetchStock();
    fetchLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onAddStock = () => {
    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    setLoadingStock(true)
    addStock(userId, isbn)
      .then(() => {
        setStock(true)

        // book情報なければ登録
        addBookDataNonExists();

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

  const onAddLike = () => {
    // 連続送信中止
    if (submitLikeProcessing.current) return
    submitLikeProcessing.current = true

    setLoadingLike(true)
    addLike(userId, isbn)
      .then(() => {
        setLike(true)

        // book情報なければ登録
        addBookDataNonExists();

        setLoadingLike(false)
        submitLikeProcessing.current = false
      })
      .catch((error) => {
        console.error(error)
        setLike(false)
        setLoadingLike(false)
        submitLikeProcessing.current = false
      })
  }

  const onDeleteLike = () => {
    // 連続送信中止
    if (submitLikeProcessing.current) return
    submitLikeProcessing.current = true

    setLoadingLike(true)
    deleteLike(userId, isbn)
      .then(() => {
        setLike(false)
        setLoadingLike(false)
        submitLikeProcessing.current = false
      })
      .catch((error) => {
        console.error(error)
        setLike(false)
        setLoadingLike(false)
        submitLikeProcessing.current = false
      })
  }

  const addBookDataNonExists = async () => {
    
    getBook(isbn)
    .then((bookData) => {
      if (!!bookData) {
        console.info('Data already exists');
        return;
      }
      
      // データが存在しないときのみデータ登録
      const bookTitle = title
      addBook(isbn, bookTitle, thumbnail)
        .then(() => {
          console.log('added book');
        })
    })
  };

  return (
    <div className="rounded-xl bg-zinc-700 px-5 py-7 text-white">
      <dl className="flex">
        <dt className="w-36">タイトル:</dt>
        <dd className="w-3/4">{title}</dd>
      </dl>
      {/* <dl className="flex">
          <dt className="w-36">サブタイトル:</dt>
          <dd className="w-3/4">{subtitle}</dd>
        </dl> */}
      <dl className="flex">
        <dt className="w-36">著者:</dt>
        <dd className="w-3/4">{authors}</dd>
      </dl>
      <dl className="flex">
        <dt className="w-36">出版社:</dt>
        <dd className="w-3/4">{publisher}</dd>
      </dl>
      {/* <dl className="flex">
          <dt className="w-36">あらすじ:</dt>
          <dd className="w-3/4">{description}</dd>
        </dl> */}
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

      <div>
        {loadingStock ? (
          <button>
            <Loader />
          </button>
        ) : stock ? (
          <button onClick={onDeleteStock}>
            <BookmarkCheck />
            削除
          </button>
        ) : (
          <button onClick={onAddStock}>
            <BookmarkPlus />
            追加
          </button>
        )}

        
          {loadingLike ? (
            <button><Loader /></button>
          ) : (
            like ? (
              <button onClick={onDeleteLike}><Heart /></button>
          ) : (
            <button onClick={onAddLike}><HeartOff /></button>
          )
        )}
      </div>
      <Link href={`/books/${isbn10}`} className="flex">
        <LinkImg />
        詳細情報
      </Link>
    </div>
  )
}
