import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import Cookies from 'js-cookie'
import {useEffect} from "react";
import CharactersListEl from "./charactersListEl";

const CharactersList = ({ data, favoriteList, setFavoriteList }) => {




    return (
        <div
            className={
                'mx-auto my-48 grid max-w-7xl gap-24 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }
        >
            {data.map((character) => {
                return (
                   <CharactersListEl  key={character._id} character={character} favoriteList={favoriteList} setFavoriteList={setFavoriteList}/>
                )
            })}
        </div>
    )
}

export default CharactersList
