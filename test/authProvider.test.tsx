import { render, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/hooks/authProvider'

describe('AuthProvider', () => {
  it('provides useAuth hook within AuthProvider', async () => {
    const TestComponent = () => {
      const { session } = useAuth()

      return <div>{session ? 'Authenticated' : 'Not Authenticated'}</div>
    }

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(getByText('Not Authenticated')).toBeInTheDocument()
    })
  })
})
