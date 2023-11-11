import React, { useRef, useEffect } from 'react'
import { CornerDownLeft } from 'lucide-react'
import { Loader } from './loader'

interface Props {
  input: string
  loading: boolean
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleButtonClick: (event: React.MouseEvent) => void
}

const SearchBar: React.FC<Props> = ({ input, loading, handleInputChange, handleButtonClick }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKeyPress(event: { key: string; preventDefault: () => void }) {
      if (event.key === '/') {
        event.preventDefault()
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      <form
        onSubmit={(event) => event.preventDefault()}
        autoComplete="off"
        className="bg-zinc-700 rounded-xl shadow-lg h-fit flex flex-row px-3 my-3 items-center w-full"
      >
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          placeholder="fantastic beasts"
          className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          ref={inputRef}
        />
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={handleButtonClick}
            type="submit"
            className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
          >
            <CornerDownLeft size={16} className="-ml-px" />
          </button>
        )}
      </form>
    </>
  )
}

export default SearchBar
