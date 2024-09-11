import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'
import { Toaster } from 'react-hot-toast'
import { ContractProvider } from './context/contractContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(

	<BrowserRouter>
		<AuthProvider>
			<ContractProvider>
				<Toaster position='top-right' />
				<App />
			</ContractProvider>
		</AuthProvider>
	</BrowserRouter>

)
