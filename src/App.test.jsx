import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from './store'
import App from './App'

test('redirects anonymous visitors to login', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(await screen.findByText(/sign in to continue/i)).toBeInTheDocument()
})
