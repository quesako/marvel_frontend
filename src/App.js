import './styles/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar'
import HomePage from './pages/HomePage'
import SingleCharacter from './pages/characters/SingleCharacters'
import SingleComics from './pages/comics/SingleComics'
import AllCharacters from './pages/characters/AllCharacters'
import AllComics from './pages/comics/AllComic'
import Search from './pages/Search'

function App() {
    return (
        <Router>
            <TopBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/*characters*/}
                <Route path="/characters" element={<AllCharacters />} />
                <Route path="/characters/:id" element={<SingleCharacter />} />
                {/*comics*/}
                <Route path="/comics" element={<AllComics />} />
                <Route path="/comics/:id" element={<SingleComics />} />
                {/*search*/}
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    )
}

export default App
