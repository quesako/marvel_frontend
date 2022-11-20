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
            className="flex items-center justify-between rounded-t bg-zinc-700/90 px-4 py-3 shadow-2xl backdrop-blur sm:px-6"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="color-body-inverted text-sm">
                    <span className="mr-3 bg-red-600 p-1 font-alt font-bold uppercase">
                        {label} ({count})
                    </span>
                    <span className="font-medium">{currentPage}</span> /{' '}
                    <span className="font-medium">{numberOFpages}</span> pages
                </p>
            </div>
            <div className="flex flex-1 items-center justify-between sm:justify-end">
                {/* Deactivate the prev button on the first page*/}
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
                {/* Deactivate the next button on the last page*/}
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
