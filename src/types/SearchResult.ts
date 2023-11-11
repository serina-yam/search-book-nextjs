interface BookInfo {
  saleInfo: any
  id: string
  volumeInfo: {
    publisher: any
    language: any
    title: string
    authors: string[]
    description: string
    industryIdentifiers: [
      {
        type: string // isbn10
        identifier: string
      },
      {
        type: string // isbn13
        identifier: string
      },
    ]
    imageLinks: {
      thumbnail: string
    }
    previewLink: string
    publishedDate: string
    averageRating: number
    infoLink: string
    pageCount: number
  }
}

export default BookInfo
