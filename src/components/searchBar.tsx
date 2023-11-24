import { CornerDownLeft } from 'lucide-react'
import React, { useRef, useEffect } from 'react'
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
        className="my-3 flex h-fit w-full flex-row items-center rounded-xl bg-zinc-700 px-3 shadow-lg"
      >
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          placeholder="fantastic beasts"
          className="h-10 w-full resize-none bg-transparent px-2 py-2.5 font-mono text-sm text-white outline-none ring-0 transition-all duration-300 placeholder:text-gray-400"
          ref={inputRef}
        />
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={handleButtonClick}
            type="submit"
            className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus:bg-white/25"
          >
            <CornerDownLeft size={16} className="-ml-px" />
          </button>
        )}
      </form>
    </>
  )
}

export default SearchBar
