import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Article, Home, NewPost } from './pages';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/new-post' element={<NewPost />} />
          <Route path='/posts/:id' element={<Article />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
