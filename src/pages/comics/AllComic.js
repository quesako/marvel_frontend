import axios from 'axios'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

import ComicsList from '../../components/ComicsList'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'

const AllComics = () => {
    const [data, setData] = useState()
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
                const response = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/comics?limit=${recordsPerPage}&skip=${skipValue}`
                )

                setData(response.data)

                setIsFirstLoading(false)
                setIsShowing(true)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [currentPage])

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
                        <ComicsList data={data.results} />
                    </Transition>
                    <div
                        className={
                            'fixed bottom-0 z-30 flex w-full justify-center'
                        }
                    >
                        <Pagination
                            label={'comics'}
                            count={data.count}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </>
            ) : (
                <Loader message={'is loading'} />
            )}
        </div>
    )
}
export default AllComics
