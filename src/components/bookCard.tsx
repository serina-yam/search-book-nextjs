import { Card, CardBody, Image, CardFooter } from '@nextui-org/react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import BookCardProp from '@/components/bookCardProp'
import { removeHTMLTags } from '@/lib/fetchGoogle'

export default function BookCard({
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
  if (description) {
    description = removeHTMLTags(description)
    if (description.length >= 200) {
      description = description.slice(0, 100) + '...'
    }
  }
  return (
    <>
      <Popover placement="bottom" backdrop="opaque" className="max-w-lg">
        <PopoverTrigger>
          <Card className="h-full cursor-pointer rounded-xl bg-slate-50 py-4">
            <CardBody className="items-center overflow-visible py-2">
              <Image alt={title} className="rounded-xl object-cover shadow-lg" src={thumbnail} width={128} />
            </CardBody>
            <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
              <div className="font-bold uppercase">{title}</div>
            </CardFooter>
          </Card>
        </PopoverTrigger>
        <PopoverContent>
          <BookCardProp
            key={id}
            id={id}
            title={title}
            industryIdentifier={industryIdentifier}
            isbn10={isbn10}
            isbn13={isbn13}
            description={description}
            publishedDate={publishedDate}
            authors={authors}
            pageCount={pageCount}
            thumbnail={thumbnail}
            publisher={publisher}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
