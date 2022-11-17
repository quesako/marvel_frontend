import './styles/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar'
import HomePage from './pages/HomePage'
import SingleCharacter from './pages/characters/SingleCharacters'
import SingleComics from './pages/comics/SingleComics'
import AllCharacters from './pages/characters/AllCharacters'
import AllComics from './pages/comics/AllComic'
import Search from './pages/Search'
import { useState } from 'react'
import Cookies from 'js-cookie'

function App() {
    /*FavoriteList*/

    const [favoriteList, setFavoriteList] = useState([])
    /*
    const intilialFavoriteList = Cookies.get('favoriteList') || [null]

    if (intilialFavoriteList[0] !== null) {
        setFavoriteList(JSON.parse(intilialFavoriteList))
    }*/

    return (
        <Router>
            <TopBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/*characters*/}
                <Route
                    path="/characters"
                    element={
                        <AllCharacters
                            favoriteList={favoriteList}
                            setFavoriteList={setFavoriteList}
                        />
                    }
                />
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
