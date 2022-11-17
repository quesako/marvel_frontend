import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const Pagination = ({
    count,
    setCurrentPage,
    currentPage,
    recordsPerPage,
    label,
}) => {
    const numberOFpages = Math.ceil(count / recordsPerPage)
    return (
        <nav
            className="flex items-center justify-between  bg-zinc-900/70 px-4 py-3 backdrop-blur sm:px-6"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="color-body-inverted text-sm">
                    <span className="mr-3 bg-red-600 p-1 font-alt font-bold uppercase">
                        {label} ({count})
                    </span>
                    <span className="font-medium">{currentPage}</span> /{' '}
                    <span className="font-medium">{numberOFpages}</span> pages
                    {/*<span className="font-medium">
                        {(currentPage - 1) * recordsPerPage + 1}
                    </span>{' '}
                    -{' '}
                    <span className="font-medium">
                        {currentPage * recordsPerPage}
                    </span>{' '}
                    / <span className="font-medium">{count}</span> résultats*/}
                </p>
            </div>
            <div className="flex flex-1 items-center justify-between sm:justify-end">
                {/* Desactivate button if user is on first page*/}
                <button
                    onClick={() => {
                        if (currentPage !== 1) setCurrentPage(currentPage - 1)
                    }}
                    className={clsx(
                        'btn',
                        currentPage === 1 && 'cursor-default opacity-30'
                    )}
                >
                    <ArrowLeftIcon className="h-4 w-4 text-white"></ArrowLeftIcon>
                </button>
                <span
                    className={'block h-full w-[1px] min-w-[1px] bg-white'}
                ></span>
                {/* Desactivate button if user is on the last page*/}
                <button
                    onClick={() => {
                        if (currentPage !== numberOFpages)
                            setCurrentPage(currentPage + 1)
                    }}
                    className={clsx(
                        'btn',
                        currentPage === numberOFpages &&
                            'cursor-default opacity-30'
                    )}
                >
                    <ArrowRightIcon className="h-4 w-4 text-white"></ArrowRightIcon>
                </button>
            </div>
        </nav>
    )
}

export default Pagination
