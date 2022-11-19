import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Transition } from '@headlessui/react'

import Loader from '../../components/Loader'

const SingleComics = () => {
    const { id } = useParams()

    const [singleComicsData, setSingleComicsData] = useState()
    //const [charactersOfComicsData, setCharactersOfComicsData] = useState()

    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [isShowing, setIsShowing] = useState(false)

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            /* Trigger on each paginate action */
            setIsShowing(false)

            try {
                const getSingleComics = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/singleComics/${id}`
                )
                console.log(getSingleComics)

                /*const getCharactersOfComic = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/characters/${id}`
                )*/

                setSingleComicsData(getSingleComics.data)
                /*
                setCharactersOfComicsData(getCharactersOfComic.data)
*/

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
                <div>
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
                                        src={`${singleComicsData.thumbnail.path}.${singleComicsData.thumbnail.extension}`}
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
                                            {singleComicsData.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'mx-auto mt-24  max-w-4xl px-4'}>
                            <p className={'font-alt text-xl text-white'}>
                                {singleComicsData.description}
                            </p>
                        </div>
                    </Transition>
                </div>
            ) : (
                <Loader message={'is loading'} />
            )}
        </div>
    )
}
export default SingleComics
