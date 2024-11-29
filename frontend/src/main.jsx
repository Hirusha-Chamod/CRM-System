import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './features/user'
import { BrowserRouter } from 'react-router-dom'
import { TicketProvider } from './contexts/TicketContext.jsx'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <TicketProvider>
          <App />
        </TicketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
