import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { AllRoutes } from './Components/Routes/AllRoutes.tsx'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './Components/ReduxStore/Store.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ToastContainer />
      <RouterProvider router={AllRoutes}></RouterProvider>
    </Provider>
  </StrictMode>,
)
