'use client'

import { Link as LinkImg, BookmarkPlus, BookmarkCheck, Heart, HeartOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { addLike, addStock } from '@/lib/supabaseFunctions'

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
  const [like, setLike] = useState(false)

  const onAddStock = () => {
    if (stock) {
      addStock(id, isbn13)
      setStock(true)
    } else {
      // TODO delete
    }
  }

  const onAddLike = () => {
    if (like) {
      addLike(id, isbn13)
      setLike(true)
    } else {
      // TODO delete
    }
  }

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
        <button onClick={onAddStock}>{stock ? <BookmarkCheck /> : <BookmarkPlus />}</button>
        <button onClick={onAddLike}>{like ? <Heart /> : <HeartOff />}</button>
      </div>
      <Link href={`/books/${isbn10}`} className="flex">
        <LinkImg />
        詳細情報
      </Link>
    </div>
  )
}
