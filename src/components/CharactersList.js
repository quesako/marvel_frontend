import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import Cookies from 'js-cookie'

const CharactersList = ({ data, favoriteList, setFavoriteList }) => {
    const toggleFavorite = (event, id) => {
        event.preventDefault()
        const newFavoriteList = [...favoriteList]
        newFavoriteList.push(id)
        console.log(newFavoriteList)
        setFavoriteList(newFavoriteList)
    }

    return (
        <div
            className={
                'mx-auto my-48 grid max-w-7xl gap-24 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }
        >
            {data.map((character) => {
                return (
                    <div
                        key={character._id}
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
                                className={
                                    'btn group flex h-6 w-6 items-center justify-center rounded-full   bg-red-500 p-1'
                                }
                            >
                                <StarIcon
                                    className={'h-3 w-3  text-xs text-white'}
                                ></StarIcon>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CharactersList
