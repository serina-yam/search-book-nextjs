'use client'

import { Link } from "lucide-react"
import { addLike, addStock, getData } from "@/lib/supabaseFunctions";


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

  const onGetData = () => {
    getData('account');
  }
  
  const onAddStock = () => {
    addStock(id, isbn13);
  };

  const onAddLike = () => {
    addLike(id, isbn13);
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
        <button onClick={onGetData}>データ取得</button>
        <button onClick={onAddStock}>ストックする</button>
        <button onClick={onAddLike}>いいねする</button>
      </div>
      <Link href={`/books/${isbn10}`}>詳細情報</Link>
    </div>
  )
}
