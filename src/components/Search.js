import {
    ArrowRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
// define option search
const options = [
    { id: 1, name: 'characters', searchUrl: 'allCharacters' },
    { id: 2, name: 'comics', searchUrl: 'allComics' },
]
const Search = ({ setOpen }) => {
    // define stsates
    const [search, setSearch] = useState('')
    const [searchedData, setSearchedData] = useState('')
    const [selectedOption, setSelectedOption] = useState(options[0])
    const [displayOption, setDisplayOption] = useState()
    const [isDataLoading, setIsDataLoading] = useState(true)

    const navigate = useNavigate()

    // set search value on change
    const handleChange = (ev) => {
        setSearch(ev.target.value)
    }

    // fetch data on submit form
    // term search in title or name according if user seach a characters or a comics
    const handleSearch = (event) => {
        event.preventDefault()
        const fetchData = async () => {
            if (search !== '') {
                try {
                    const searchedCharacters = await axios.get(
                        `${process.env.REACT_APP_API_MARVEL}/${
                            selectedOption.searchUrl
                        }?term=${encodeURI(search)}`
                    )
                    console.log(searchedCharacters.data)
                    setSearchedData(searchedCharacters.data)
                    setIsDataLoading(false)
                    setDisplayOption(selectedOption.name)
                } catch (error) {
                    console.log(error.response) // contrairement au error.message d'express
                }
            }
        }
        fetchData()
    }

    // Close modal and redirect
    const handleClick = (event, selectedOption, id) => {
        event.preventDefault()
        setOpen(false) // toggle open state in React state
        navigate(`/${selectedOption}/${id}`)
    }

    return (
        <>
            <form
                onSubmit={handleSearch}
                className={clsx(
                    isDataLoading && 'rounded-b',
                    'mx-auto  flex items-center rounded-t  border border-zinc-700  bg-zinc-700 py-2 py-2'
                )}
            >
                <div className={'ml-2 flex w-full items-center justify-center'}>
                    <label htmlFor="email" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon
                        className={'color-body-inverted ml-1 h-6 w-6'}
                    ></MagnifyingGlassIcon>

                    <input
                        value={search}
                        onChange={handleChange}
                        type="search"
                        name="search"
                        id="search"
                        className="focus:ring-none color-body-inverted block w-full w-full border-transparent  bg-transparent p-1 text-sm focus:border-none focus:border-none focus:outline-none "
                        placeholder={
                            selectedOption.name === 'comics'
                                ? 'write a comics title...'
                                : 'write a characters name...'
                        }
                    />
                </div>

                <Listbox value={selectedOption} onChange={setSelectedOption}>
                    {({ open }) => (
                        <>
                            <div className="relative z-50">
                                <Listbox.Button className="relative w-full cursor-default  border border-transparent bg-zinc-700 py-2 pl-3 pr-10 text-left text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                    <span className="block truncate">
                                        {selectedOption.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {options.map((person) => (
                                            <Listbox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                    clsx(
                                                        active
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={person}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={clsx(
                                                                selected
                                                                    ? 'font-semibold'
                                                                    : 'font-normal',
                                                                'block truncate'
                                                            )}
                                                        >
                                                            {person.name}
                                                        </span>

                                                        {selected ? (
                                                            <span
                                                                className={clsx(
                                                                    active
                                                                        ? 'text-white'
                                                                        : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
                <button
                    type={'submit'}
                    className={'btn mr-2 rounded-full bg-red-600 text-white'}
                >
                    search
                </button>
            </form>
            {!isDataLoading && (
                <>
                    <div className="h-[50vh] flex-1 scroll-py-2 overflow-y-auto p-12 transition-all">
                        <h1
                            className={
                                'border-b border-zinc-700 py-2 pb-4 font-alt text-xl text-zinc-700'
                            }
                        >
                            Found {searchedData.count} results for "{search}" in{' '}
                            {displayOption}
                        </h1>
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
                                {searchedData.results ? (
                                    <>
                                        {searchedData.results.map(
                                            (item, index) => {
                                                return (
                                                    <button
                                                        onClick={(event) => {
                                                            handleClick(
                                                                event,
                                                                selectedOption.name,
                                                                item._id
                                                            )
                                                        }}
                                                        className={
                                                            'flex w-full items-center justify-between py-4'
                                                        }
                                                        key={index}
                                                    >
                                                        <span>
                                                            <p
                                                                className={
                                                                    'text-left font-alt  text-lg text-white'
                                                                }
                                                            >
                                                                {item.title &&
                                                                    item.title}
                                                                {item.name &&
                                                                    item.name}
                                                            </p>
                                                            <p
                                                                className={
                                                                    'text-sm text-zinc-700'
                                                                }
                                                            >
                                                                {item._id}
                                                            </p>
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
                                    </>
                                ) : (
                                    <p>Not found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Search
