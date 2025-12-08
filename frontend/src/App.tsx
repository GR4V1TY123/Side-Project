
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';

function App() {

  const client = new QueryClient();

  const {isAuthenticated} = useAuthStore();

  return (
    <QueryClientProvider client={client}>
      <div className='font-poppins'>
        <Navbar />
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
