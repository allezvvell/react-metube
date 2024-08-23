import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutDefault from './layouts/LayoutDefault/LayoutDefault';
import LayoutWatch from './layouts/LayoutWatch/LayoutWatch';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Watch from './pages/Watch/Watch';
import NotFound from './pages/NotFound/NotFound';
import History from './pages/History/History';
import { DarkModeProvider } from './context/DarkModeContext';
import { HistoryProvider } from './context/HistoryContext';
import { YoutubeApiProvider } from './context/YoutubeApiContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/search/:q', element: <Search /> },
      { path: '/history', element: <History /> },
    ],
  },
  {
    path: '/watch/:videoId',
    element: <LayoutWatch />,
    children: [{ index: true, element: <Watch /> }],
  },
]);
function App() {
  return (
    <YoutubeApiProvider>
      <DarkModeProvider>
        <HistoryProvider>
          <RouterProvider router={router} />
        </HistoryProvider>
      </DarkModeProvider>
    </YoutubeApiProvider>
  );
}

export default App;
