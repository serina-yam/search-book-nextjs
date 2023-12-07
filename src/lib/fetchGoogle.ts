import axios from "axios"

export const searchBooksByTitle = async (title: string) => {
    try {
      if (title.length === 0) {
        return []
      }
      const response = await axios.get(`${'https://www.googleapis.com/books/v1/volumes'}?q=${title}`)
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
      const response = await axios.get(`${'https://www.googleapis.com/books/v1/volumes/'}${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }