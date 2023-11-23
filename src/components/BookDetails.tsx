import { Card, CardBody, Image, CardFooter } from '@nextui-org/react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import BookCardInfo from './BookCardProp'

export default function BookDetails({
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
  shelfCount,
  likeCount
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
  shelfCount?: number
  likeCount?: number
}) {
  if (description) {
    if (description.length >= 200) {
      description = description.slice(0, 195) + '...'
    }
  }
  return (
    <>
      <Popover placement="bottom" backdrop="opaque" className="max-w-lg">
        <PopoverTrigger>
          <Card className="h-full cursor-pointer rounded-xl bg-slate-50	 py-4">
            <CardBody className="items-center overflow-visible py-2">
              <Image alt={title} className="rounded-xl object-cover shadow-lg" src={thumbnail} width={128} />
            </CardBody>
            <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
              <div className="font-bold uppercase">{title}</div>
            </CardFooter>
          </Card>
        </PopoverTrigger>
        <PopoverContent>
          <BookCardInfo
            key={id}
            id={id}
            title={title}
            isbn10={isbn10}
            isbn13={isbn13}
            previewLink={previewLink}
            cover_image={thumbnail}
            description={description}
            publishedDate={publishedDate}
            averageRating={averageRating}
            authors={authors}
            infoLink={infoLink}
            pageCount={pageCount}
            thumbnail={thumbnail}
            price={price}
            publisher={publisher}
            availability={availability}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
