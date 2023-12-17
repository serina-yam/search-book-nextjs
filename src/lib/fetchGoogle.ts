import axios from 'axios'

const SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes'

export const searchBooksByTitle = async (title: string) => {
  try {
    if (title.length === 0) {
      return []
    }
    const response = await axios.get(`${SEARCH_URL}?q=${title}`)
    return response.data.items
  } catch (error) {
    console.error(error)
  }
}

export const searchBookById = async (id: string) => {
  try {
    if (id.length === 0) {
      return []
    }
    const response = await axios.get(`${SEARCH_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const removeHTMLTags = (text: string) => {
  return text.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '')
}
