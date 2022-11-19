import axios from 'axios'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'
import CharactersList from '../../components/CharactersList'

const AllCharacters = ({ setFavoritesData, favoritesData }) => {
    const [allCharactersData, setAllCharactersData] = useState()
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [isShowing, setIsShowing] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 100

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0)
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
                const allCharacters = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/allCharacters?limit=${recordsPerPage}&skip=${skipValue}`
                )

                setAllCharactersData(allCharacters.data)

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
                            All characters
                            <span className={'block text-center text-base'}>
                                {' '}
                                Page {currentPage}
                            </span>
                        </h1>
                        <CharactersList
                            allCharactersData={allCharactersData.results}
                            favoritesData={favoritesData}
                            setFavoritesData={setFavoritesData}
                        />
                    </Transition>
                    <div
                        className={
                            'fixed bottom-0 z-30 flex w-full justify-center'
                        }
                    >
                        <Pagination
                            label={'characters'}
                            count={allCharactersData.count}
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
export default AllCharacters
