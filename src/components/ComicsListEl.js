import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import clsx from 'clsx'
import { StarIcon } from '@heroicons/react/24/solid'

const ComicsListEl = ({ comics, favoritesData, setFavoritesData }) => {
    /* Define a state for characters el to */
    const [markedAsFavorite, setMarkedAsFavorite] = useState(false)

    /* util to check if el is in favorites*/
    const findElInFavorites = (key, id) => {
        return favoritesData[key].find((item) => item.id.includes(id))
    }
    const targetKey = 'comics'

    /* Check if item exist in the favorites*/
    useEffect(() => {
        const isElExitInFavorites = findElInFavorites(targetKey, comics._id)
        console.log(isElExitInFavorites)
        if (isElExitInFavorites) {
            setMarkedAsFavorite(true)
        }
    }, [favoritesData])

    /*Toggle add/remove item on favorites list*/
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
        <div className={'relative'} data-id={comics._id}>
            <Link
                key={comics._id}
                to={`/comics/${comics._id}`}
                className={'group relative block'}
            >
                <div className={'overflow-hidden'}>
                    {/*overlay*/}
                    <div className="absolute top-0 z-20 aspect-1 w-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/30 to-zinc-800/70 transition-all group-hover:scale-105 group-hover:opacity-20"></div>
                    {/*image*/}
                    <img
                        className={
                            'relative z-10 aspect-1 w-full bg-red-600 object-cover object-center opacity-20 transition-all group-hover:scale-105 group-hover:opacity-50'
                        }
                        src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                        alt={'toto'}
                    />
                </div>
                {/*Text*/}
                <div
                    className={
                        'absolute top-full left-0 z-20 w-full -translate-y-1/2 items-center'
                    }
                >
                    <div className={'mx-auto max-w-5xl '}>
                        <h2
                            className={
                                'color-body-inverted max-w-sm  font-alt text-5xl font-bold'
                            }
                        >
                            {comics.title}
                        </h2>
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
                        toggleFavorite(ev, comics._id, comics.title)
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
export default ComicsListEl
