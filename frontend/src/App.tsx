
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  )
}

export default App
