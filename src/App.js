import './styles/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar'
import HomePage from './pages/HomePage'
import SingleCharacter from './pages/characters/SingleCharacters'
import SingleComics from './pages/comics/SingleComics'
import AllCharacters from './pages/characters/AllCharacters'
import AllComics from './pages/comics/AllComic'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function App() {
    /*Favorites*/
    const [favoritesData, setFavoritesData] = useState({
        characters: [],
        comics: [],
    })

    useEffect(() => {
        const intilialFavoriteList = Cookies.get('marvel_favorites') || [null]

        if (intilialFavoriteList[0] !== null) {
            setFavoritesData(JSON.parse(intilialFavoriteList))
        }
    }, [])

    return (
        <Router>
            <TopBar favoritesData={favoritesData} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/*characters*/}
                <Route
                    path="/characters"
                    element={
                        <AllCharacters
                            favoritesData={favoritesData}
                            setFavoritesData={setFavoritesData}
                        />
                    }
                />
                <Route
                    path="/characters/:id"
                    element={
                        <SingleCharacter
                            favoritesData={favoritesData}
                            setFavoritesData={setFavoritesData}
                        />
                    }
                />
                {/*comics*/}
                <Route
                    path="/comics"
                    element={
                        <AllComics
                            favoritesData={favoritesData}
                            setFavoritesData={setFavoritesData}
                        />
                    }
                />
                <Route
                    path="/comics/:id"
                    element={
                        <SingleComics
                            favoritesData={favoritesData}
                            setFavoritesData={setFavoritesData}
                        />
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
