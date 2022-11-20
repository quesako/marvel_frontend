import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Cookies from 'js-cookie'

const CharactersListEl = ({ character, favoritesData, setFavoritesData }) => {
    /* Define a state for characters el to */
    const [markedAsFavorite, setMarkedAsFavorite] = useState(false)

    /* util to check if el is in favorite*/
    const findElInFavorites = (key, id) => {
        return favoritesData[key].find((item) => item.id.includes(id))
    }
    const targetKey = 'characters'
    /* Check if item exist in the favorites*/
    useEffect(() => {
        const isElExitInFavorites = findElInFavorites(targetKey, character._id)
        if (isElExitInFavorites) {
            setMarkedAsFavorite(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoritesData])

    /*Toggle add/remove of favorite list*/
    const toggleFavorite = (event, id, label) => {
        event.preventDefault()
        const isElExitInFavorites = findElInFavorites(targetKey, id)
        const newFavoriteList = { ...favoritesData }

        if (!isElExitInFavorites) {
            newFavoriteList[targetKey].push({
                id: id,
                label: label,
            })
            setMarkedAsFavorite(true)
        } else {
            const index = newFavoriteList[targetKey].findIndex(
                (element) => element.id === id
            )
            newFavoriteList[targetKey].splice(
                newFavoriteList[targetKey].indexOf(
                    newFavoriteList[targetKey][index]
                ),
                1
            )
            setMarkedAsFavorite(false)
        }
        setFavoritesData(newFavoriteList)
        Cookies.set('marvel_favorites', JSON.stringify(newFavoriteList))
    }
    return (
        <div className={'relative'} data-id={character._id}>
            <Link
                to={`/characters/${character._id}`}
                className={'group relative z-20 block'}
            >
                <div className={''}>
                    {/*overlay*/}
                    <div
                        className={clsx(
                            'absolute top-0 z-20 aspect-1 h-full w-full rounded-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/30 to-zinc-800/70 opacity-90 transition-all group-hover:opacity-80 '
                        )}
                    ></div>
                    {/*image*/}
                    <img
                        className={clsx(
                            'relative z-10 aspect-1 w-full rounded-full bg-red-600 object-cover object-center transition-all',
                            markedAsFavorite ? 'opacity-90 ' : 'opacity-40 '
                        )}
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
                        <p className={'text-center text-xs text-white/20'}>
                            {character._id}
                        </p>
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
                        toggleFavorite(ev, character._id, character.name)
                    }}
                    className={clsx(
                        'btn group flex h-6 w-6 items-center justify-center rounded-full  p-1',
                        markedAsFavorite ? ' bg-red-500' : 'bg-zinc-800'
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
