import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /Let's search for books by title/i,
    })
    expect(heading).toBeInTheDocument()
  })
})
