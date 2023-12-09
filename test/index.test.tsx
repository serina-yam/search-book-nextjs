import { render } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Component', () => {
  it('sets input value and searchWord correctly', () => {
    const mockSearchWord = 'Sample Search';
    const mockSetSearchWord = jest.fn();

    jest.mock('@/hooks/authProvider', () => ({
      useAuth: () => ({
        searchWord: mockSearchWord,
        setSearchWord: mockSetSearchWord,
      }),
    }));

    render(<Home />);

    expect(mockSetSearchWord).toHaveBeenCalledWith(mockSearchWord);
  });
});
