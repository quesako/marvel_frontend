import axios from 'axios'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'

import ComicsList from '../../components/ComicsList'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'

const AllComics = () => {
    const [allComicsData, setAllComicsData] = useState()
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [isShowing, setIsShowing] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 100

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            /* Trigger on each paginate action */
            setIsShowing(false)

            /*Build the paginates query */
            let skipValue
            if (currentPage === 1) {
                skipValue = 0
            } else {
                skipValue = currentPage * 10
            }

            try {
                const allComics = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/allComics?limit=${recordsPerPage}&skip=${skipValue}`
                )
                // force scroll top
                window.scrollTo(0, 0)

                // set states
                setAllComicsData(allComics.data)
                setIsFirstLoading(false)
                setIsShowing(true)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [currentPage])

    return (
        <>
            {!isFirstLoading ? (
                <div className={'relative my-48 '}>
                    <Transition
                        as="div"
                        className={'relative'}
                        show={isShowing}
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
                        <ComicsList allComicsData={allComicsData.results} />
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
                <Loader message={'is loading'} />
            )}
        </>
    )
}
export default AllComics
