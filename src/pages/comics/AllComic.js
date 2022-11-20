import axios from 'axios'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'

import ComicsList from '../../components/ComicsList'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'

const AllComics = ({ setFavoritesData, favoritesData }) => {
    const [allComicsData, setAllComicsData] = useState()
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [isPaginatedLoading, setIsPaginatedLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 100

    /* Fetch Api to get list of characters */
    useEffect(() => {
        /* Trigger on each paginate action */
        setIsPaginatedLoading(false)

        /* force scroll top*/
        window.scrollTo(0, 0)

        /*Build the paginates query */
        let skipValue
        if (currentPage === 1) {
            skipValue = 0
        } else {
            skipValue = currentPage * 10
        }

        const fetchData = async () => {
            try {
                const allComics = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/allComics?limit=${recordsPerPage}&skip=${skipValue}`
                )

                // set states
                setAllComicsData(allComics.data)
                setIsFirstLoading(false)
                setIsPaginatedLoading(true)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [currentPage])

    return (
        <div className={'relative min-h-screen'}>
            {!isFirstLoading ? (
                <div className={'relative my-48 '}>
                    <Transition
                        as="div"
                        className={'relative'}
                        show={isPaginatedLoading}
                        enter="transition-opacity transition-transform  duration-150"
                        enterFrom="opacity-0 translate-y-[10px]"
                        enterTo="opacity-100 translate-y-0"
                    >
                        <h1
                            className={
                                'text-center font-alt text-9xl font-bold text-zinc-700'
                            }
                        >
                            {' '}
                            All comics
                            <span className={'block text-center text-base'}>
                                {' '}
                                Page {currentPage}
                            </span>
                        </h1>
                        <ComicsList
                            allComicsData={allComicsData.results}
                            setFavoritesData={setFavoritesData}
                            favoritesData={favoritesData}
                        />
                    </Transition>

                    <div
                        className={
                            'fixed bottom-0 z-30 flex w-full justify-center'
                        }
                    >
                        <Pagination
                            label={'comics'}
                            count={allComicsData.count}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            ) : (
                <Loader message={'loading...'} />
            )}
        </div>
    )
}
export default AllComics
