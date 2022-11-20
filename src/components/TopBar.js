import { Link, useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import {
    ArrowRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Search from './Search'

const TopBar = ({ favoritesData }) => {
    // define states
    const [openDialogSearch, setOpenDialogSearch] = useState(false)
    const [openDialogFavorites, setOpenDialogFavorites] = useState(false)

    const navigate = useNavigate()

    // Close modal and redirect to
    const handleClick = (event, path, id) => {
        event.preventDefault()
        setOpenDialogFavorites(false)
        navigate(`/${path}/${id}`)
    }

    return (
        <>
            {/*navigation*/}
            <div className={'fixed top-0 z-50 w-full'}>
                <div className={'bg-body-inverted border-b border-zinc-700'}>
                    <div className={'container flex'}>
                        {/* left nav*/}
                        <div
                            className={
                                'color-body-inverted flex h-[3.25rem] flex-1 justify-start'
                            }
                        >
                            <div
                                className={
                                    ' flex h-full items-center border-r border-l border-zinc-700'
                                }
                            >
                                <div
                                    className={' border-zinc-700 px-4  text-xs'}
                                >
                                    Build for "le reacteur"
                                </div>
                            </div>
                        </div>
                        {/*Marvel logo*/}
                        <Link
                            to={`/`}
                            className={
                                'color-body-inverted flex h-[3.25rem] flex-1 items-center justify-center'
                            }
                        >
                            <svg
                                width="130"
                                height="52"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    fill="#EC1D24"
                                    width="100%"
                                    height="100%"
                                ></rect>
                                <path
                                    fill="#FEFEFE"
                                    d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"
                                ></path>
                                <path fill="#EC1D24" d="M0 0h30v52H0z"></path>
                                <path
                                    fill="#FEFEFE"
                                    d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
                                ></path>
                            </svg>
                        </Link>
                        {/*right nav*/}
                        <div className={'flex flex-1 items-center justify-end'}>
                            <button
                                className={'btn justify-end text-right'}
                                onClick={() => {
                                    setOpenDialogSearch(true)
                                }}
                            >
                                <MagnifyingGlassIcon
                                    className={'h-4 w-4 text-white'}
                                ></MagnifyingGlassIcon>
                            </button>
                            <button
                                className={
                                    'btn color-body-inverted flex h-[3.25rem] justify-end justify-end text-right'
                                }
                                onClick={() => {
                                    setOpenDialogFavorites(true)
                                }}
                            >
                                <span
                                    className={
                                        ' flex h-full items-center border-r border-l border-zinc-700'
                                    }
                                >
                                    <span
                                        className={
                                            'flex items-center border-zinc-700  px-4 font-alt text-xs'
                                        }
                                    >
                                        <span
                                            className={
                                                'mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1'
                                            }
                                        >
                                            <StarIcon
                                                className={'h-4 w-4 text-white'}
                                            />
                                        </span>
                                        <span>
                                            My favorites (
                                            {favoritesData.characters.length +
                                                favoritesData.comics.length}
                                            )
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'bg-body-inverted  border-b border-zinc-700'}>
                    <div className={'container flex '}>
                        {/* left nav*/}
                        <div
                            className={
                                'color-body-inverted flex h-[3.25rem] w-full items-center justify-center'
                            }
                        >
                            <Link
                                to={`/comics`}
                                className={
                                    'group relative mx-4 flex h-full  items-center'
                                }
                            >
                                <span
                                    className={
                                        'font-alt text-xs  font-bold uppercase tracking-wider'
                                    }
                                >
                                    Explore all comics
                                </span>
                                <span
                                    className={
                                        'absolute -bottom-[1px] left-1/2 h-[4px] w-0 bg-transparent transition-all group-hover:left-0 group-hover:w-full group-hover:bg-red-500'
                                    }
                                ></span>
                            </Link>
                            <Link
                                to={`/characters`}
                                className={
                                    'group relative mx-4 flex h-full  items-center'
                                }
                            >
                                <span
                                    className={
                                        'font-alt text-xs  font-bold uppercase tracking-wider'
                                    }
                                >
                                    Explore all characters
                                </span>
                                <span
                                    className={
                                        'absolute -bottom-[1px] left-1/2 h-[4px] w-0 bg-transparent transition-all group-hover:left-0 group-hover:w-full group-hover:bg-red-500'
                                    }
                                ></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/*dialog serach*/}
            <Transition.Root show={openDialogSearch} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={setOpenDialogSearch}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 ">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative w-full transform  rounded-lg bg-zinc-800 text-left shadow-xl transition-all sm:max-w-lg ">
                                    <Search
                                        setOpenDialogSearch={
                                            setOpenDialogSearch
                                        }
                                    ></Search>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/*favorites search*/}
            <Transition.Root show={openDialogFavorites} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={setOpenDialogFavorites}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 ">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative w-full transform  rounded-lg bg-zinc-800 text-left shadow-xl transition-all sm:max-w-lg ">
                                    <div
                                        className={
                                            'mx-auto flex items-center  border border-zinc-700  bg-zinc-700 py-2 py-2'
                                        }
                                    >
                                        <span className={'ml-2 text-white '}>
                                            My favorites
                                        </span>
                                    </div>
                                    <div className="h-[50vh] flex-1 scroll-py-2 overflow-y-auto p-12 transition-all">
                                        <div
                                            className={
                                                'mx-auto flex max-w-3xl items-center border-b border-zinc-700 py-2'
                                            }
                                        >
                                            <div
                                                className={
                                                    'grid w-full divide-y divide-zinc-700 py-2'
                                                }
                                            >
                                                {favoritesData.characters.map(
                                                    (favoriteItem, index) => {
                                                        return (
                                                            <button
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    handleClick(
                                                                        event,
                                                                        'comics',
                                                                        favoriteItem
                                                                    )
                                                                }}
                                                                className={
                                                                    ' btn no-focus flex w-full items-center justify-between truncate py-4'
                                                                }
                                                                key={index}
                                                            >
                                                                <span
                                                                    className={
                                                                        'mr-4 truncate text-left'
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            'block truncate text-left font-alt  text-lg text-white'
                                                                        }
                                                                    >
                                                                        {
                                                                            favoriteItem.label
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            'truncate text-sm text-zinc-700'
                                                                        }
                                                                    >
                                                                        <span>
                                                                            Character
                                                                        </span>

                                                                        <span
                                                                            className={
                                                                                'mx-2'
                                                                            }
                                                                        >
                                                                            -
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                favoriteItem.id
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </span>

                                                                <ArrowRightIcon
                                                                    className={
                                                                        'h-4 w-4  text-white'
                                                                    }
                                                                ></ArrowRightIcon>
                                                            </button>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                'mx-auto flex max-w-3xl items-center border-b border-zinc-700 py-2'
                                            }
                                        >
                                            <div
                                                className={
                                                    'grid w-full divide-y divide-zinc-700 py-2'
                                                }
                                            >
                                                {favoritesData.comics.map(
                                                    (favoriteItem, index) => {
                                                        return (
                                                            <button
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    handleClick(
                                                                        event,
                                                                        'comics',
                                                                        favoriteItem
                                                                    )
                                                                }}
                                                                className={
                                                                    ' btn no-focus flex w-full items-center justify-between truncate py-4'
                                                                }
                                                                key={index}
                                                            >
                                                                <span
                                                                    className={
                                                                        'mr-4 truncate text-left'
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            'block truncate text-left font-alt  text-lg text-white'
                                                                        }
                                                                    >
                                                                        {
                                                                            favoriteItem.label
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            'truncate text-sm text-zinc-700'
                                                                        }
                                                                    >
                                                                        <span>
                                                                            Comics
                                                                        </span>

                                                                        <span
                                                                            className={
                                                                                'mx-2'
                                                                            }
                                                                        >
                                                                            -
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                favoriteItem.id
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </span>

                                                                <ArrowRightIcon
                                                                    className={
                                                                        'h-4 w-4  text-white'
                                                                    }
                                                                ></ArrowRightIcon>
                                                            </button>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
export default TopBar
