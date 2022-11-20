import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Transition } from '@headlessui/react'

import Loader from '../../components/Loader'
import ComicsList from '../../components/ComicsList'

const SingleCharacter = ({ favoritesData, setFavoritesData }) => {
    const { id } = useParams()

    const [singleCharacterData, setSingleCharacterData] = useState()
    const [comicsOfCharacterData, setComicsOfCharacterData] = useState()

    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [isShowing, setIsShowing] = useState(false)

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            /* Trigger on each paginate action */
            setIsShowing(false)

            try {
                const getSingleCharacter = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/singleCharacter/${id}`
                )

                const getComicsOfCharacter = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/comicsByCharacters/${id}`
                )
                console.log(getComicsOfCharacter)

                setSingleCharacterData(getSingleCharacter.data)
                setComicsOfCharacterData(getComicsOfCharacter.data)

                setIsFirstLoading(false)
                setIsShowing(true)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [id])
    return (
        <div>
            {!isFirstLoading ? (
                <>
                    <Transition
                        show={isShowing}
                        enter="transition-opacity transition-transform  duration-100"
                        enterFrom="opacity-0  translate-y-[100px]"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition-opacity duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className={
                                'relative top-0 h-[75vh] w-full bg-zinc-800 '
                            }
                        >
                            <div className={'relative h-full'}>
                                <div
                                    className={
                                        'relative h-full overflow-hidden '
                                    }
                                >
                                    <div className="absolute top-0 z-20  h-full w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900/40 via-zinc-800/30 to-zinc-800/70 "></div>

                                    <img
                                        className={
                                            'relative z-10 h-full w-full bg-red-600 object-cover object-center opacity-60'
                                        }
                                        src={`${singleCharacterData.thumbnail.path}.${singleCharacterData.thumbnail.extension}`}
                                        alt={'toto'}
                                    />
                                </div>
                                <div
                                    className={
                                        'absolute bottom-0 left-0 z-20 w-full translate-y-1/2 items-center'
                                    }
                                >
                                    <div className={'mx-auto  max-w-5xl px-4'}>
                                        <h2
                                            className={
                                                'color-body-inverted max-w-md  font-alt text-5xl font-bold'
                                            }
                                        >
                                            {singleCharacterData.name}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'mx-auto mt-24  max-w-4xl px-4'}>
                            <p className={'font-alt text-xl text-white'}>
                                {singleCharacterData.description}
                            </p>
                        </div>
                        <div className={'mx-auto mt-24  max-w-4xl px-4'}>
                            <ComicsList
                                allComicsData={comicsOfCharacterData.comics}
                                favoritesData={favoritesData}
                                setFavoritesData={setFavoritesData}
                            />
                        </div>
                    </Transition>
                </>
            ) : (
                <Loader message={'is loading'} />
            )}
        </div>
    )
}
export default SingleCharacter
