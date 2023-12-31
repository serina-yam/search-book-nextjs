'use client'

import { Card, CardBody, Image, CardFooter, CardHeader } from '@nextui-org/react'
import { BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import AlertModal from './alertModal'
import { useAuth } from '@/hooks/authProvider'
import { deleteStock } from '@/lib/supabaseFunctions'

export default function Stock({
  id,
  industryIdentifier,
  isbn10,
  isbn13,
  title,
  author,
  thumbnail,
  publisher,
  publishedDate,
  pageCount,
  description,
}: {
  id: string
  industryIdentifier: string | null
  isbn10: string | null
  isbn13: string | null
  title: string | null
  author: string | null
  thumbnail: string | null
  publisher: string | null
  publishedDate: string | null
  pageCount: number | null
  description: string | null
}) {
  const [stock, setStock] = useState(false)
  const submitStockProcessing = useRef(false)

  const profileFromSession = useAuth()?.profileFromSession
  const userId: string = profileFromSession?.id ?? ''
  const [idState, setIdState] = useState(id)
  const [modalOpen, setModalOpen] = useState(false)

  const onDeleteStock = () => {
    if (userId === '') return
    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    if (idState == null) return
    deleteStock(userId, idState)
      .then(() => {
        setStock(false)
        submitStockProcessing.current = false
        setModalOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
        setStock(false)
        submitStockProcessing.current = false
        setModalOpen(false)
        window.location.reload()
      })
  }

  const handleDelete = () => {
    if (userId === '' || !userId || !idState) return setModalOpen(false) // 必要な情報がない場合は処理しない
    onDeleteStock()
  }

  return (
    <>
      <Card className="h-full rounded-xl bg-slate-50 py-4">
        <CardHeader className="flex justify-end pr-7">
          <button
            onClick={() => {
              setIdState(id)
              setModalOpen(true)
            }}
          >
            <BookmarkCheck color="#eb4667" />
          </button>
        </CardHeader>
        <div className="flex flex-col">
          <CardBody className="items-center overflow-visible py-2">
            <Link href={`/books/${id}`}>
              <Image alt={title} className="rounded-xl object-cover shadow-lg" src={thumbnail} height={190} />
            </Link>
          </CardBody>
          <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
            <div>{title}</div>
            <div className="text-sm">{author}</div>
          </CardFooter>
        </div>
      </Card>
      <AlertModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onDelete={handleDelete} />
    </>
  )
}
