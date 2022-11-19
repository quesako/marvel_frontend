import {Link} from "react-router-dom";
import {StarIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import clsx from "clsx";
import Cookies from "js-cookie";

const CharactersListEl =({character, favoritesData, setFavoritesData}) =>{
    /* Define a state for characters el to */
    const [isFavorite, setIsFavorite] = useState(false);

    /*util to check if el is in favorite*/
    const findElInFavorites = (id) =>{
        return favoritesData.find((item) => item.includes(id))
    }

    /* Check if item exist in the favorites*/
    useEffect(() => {
        const isElExitInFavorites = findElInFavorites(character._id)
        if(isElExitInFavorites){
            setIsFavorite(true)
        }
    },[favoritesData])

    /*Toggle add/remove of favorite list*/
    const toggleFavorite = (event, id) => {
        event.preventDefault()
        const isElExitInFavorites = findElInFavorites(id)
        const newFavoriteList = [...favoritesData]
        if(!isElExitInFavorites){
            newFavoriteList.push(id)
            setIsFavorite(true)
        }else{
            const index = newFavoriteList.findIndex((element) => element === id)
            newFavoriteList.splice(newFavoriteList.indexOf(newFavoriteList[index]), 1);
            setIsFavorite(false)
        }
        setFavoritesData(newFavoriteList)
        Cookies.set('marvel_favorites', JSON.stringify(newFavoriteList))
    }
    return (
        <div

            className={'relative'}
            data-id={character._id}
        >
            <Link
                to={`/characters/${character._id}`}
                className={'group relative z-20 block'}
            >
                <div className={''}>
                    {/*overlay*/}
                    <div className={clsx('absolute top-0 z-20 aspect-1 h-full w-full rounded-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/30 to-zinc-800/70 transition-all opacity-90 group-hover:opacity-80 ')}></div>
                    {/*image*/}
                    <img
                        className={clsx( 'relative z-10 aspect-1 w-full rounded-full bg-red-600 object-cover object-center transition-all',isFavorite ? 'opacity-90 ':'opacity-40 ')

                        }
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={'toto'}
                    />
                </div>
                {/*Text*/}
                <div
                    className={
                        'absolute top-full left-0 z-20 -mt-12  w-full items-center bg-zinc-800'
                    }
                >
                    <div className={'mx-auto max-w-5xl p-4'}>
                        <h2
                            className={
                                'color-body-inverted max-w-sm text-center font-alt text-2xl font-bold'
                            }
                        >
                            {character.name}
                        </h2>
                        <p className={'text-xs text-white/20 text-center'}>{character._id}</p>
                    </div>
                </div>
            </Link>
            <div
                className={
                    'absolute bottom-10 left-[50%] z-30 -translate-x-1/2'
                }
            >
                <button
                    onClick={(ev) => {
                        toggleFavorite(ev, character._id)
                    }}
                    className={clsx(
                        'btn group flex h-6 w-6 items-center justify-center rounded-full  p-1',
                            isFavorite ? (' bg-red-500'):('bg-zinc-800')
                    )}

                >
                    <StarIcon
                        className={'h-3 w-3  text-xs text-white'}
                    ></StarIcon>
                </button>
            </div>
        </div>
    )
}

export default CharactersListEl
