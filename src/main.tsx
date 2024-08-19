import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')!).render(

	<BrowserRouter>
		<AuthProvider>
			<Toaster position='top-right' />
			<App />
		</AuthProvider>
	</BrowserRouter>

)
