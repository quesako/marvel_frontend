import {Link} from "react-router-dom";
import {StarIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import clsx from "clsx";

const CharactersListEl =({character, favoriteList, setFavoriteList}) =>{
    /* Define a state for characters el to */
    const [isFavorite, setIsFavorite] = useState(false);

    /*Check and update the state when the favoritelist changedt*/
    useEffect(() => {
        const existInfavoriteList = favoriteList.find(
            (item) => item.includes(character._id)
        )
        if(existInfavoriteList){
            setIsFavorite(true)
        }
    },[favoriteList])

    /*Toogle add/remove of favorite list*/
    const toggleFavorite = (event, id) => {
        event.preventDefault()
        const existInfavoriteList = favoriteList.find(
            (item) => item.includes(id)
        )
        const newFavoriteList = [...favoriteList]
        if(!existInfavoriteList){
            newFavoriteList.push(id)
            setIsFavorite(true)
        }else{
            const index = newFavoriteList.findIndex((element) => element === id)
            newFavoriteList.splice(newFavoriteList.indexOf(newFavoriteList[index]), 1);
            setIsFavorite(false)
        }
        setFavoriteList(newFavoriteList)
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
                    <div className="absolute top-0 z-20 aspect-1 h-full w-full rounded-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/30 to-zinc-800/70 transition-all group-hover:scale-105 group-hover:opacity-20"></div>
                    {/*image*/}
                    <img
                        className={
                            'relative z-10 aspect-1 w-full rounded-full bg-red-600 object-cover object-center opacity-20 transition-all group-hover:scale-105 group-hover:opacity-50'
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
                        <p className={'text-xs text-white'}>dev:{character._id}</p>
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
