import { Link } from 'react-router-dom'

const ComicsList = ({ data }) => {
    return (
        <div
            className={
                'mx-auto my-48 grid max-w-7xl gap-24 px-4 md:grid-cols-2 '
            }
        >
            {data.map((comics) => {
                return (
                    <Link
                        key={comics._id}
                        to={`/comics/${comics._id}`}
                        className={'group relative block'}
                    >
                        <div className={'overflow-hidden'}>
                            {/*overlay*/}
                            <div className="absolute top-0 z-20 aspect-1 w-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/30 to-zinc-800/70 transition-all group-hover:scale-105 group-hover:opacity-20"></div>
                            {/*image*/}
                            <img
                                className={
                                    'relative z-10 aspect-1 w-full bg-red-600 object-cover object-center opacity-20 transition-all group-hover:scale-105 group-hover:opacity-50'
                                }
                                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                                alt={'toto'}
                            />
                        </div>
                        {/*Text*/}
                        <div
                            className={
                                'absolute top-full left-0 z-20 w-full -translate-y-1/2 items-center'
                            }
                        >
                            <div className={'mx-auto max-w-5xl '}>
                                <h2
                                    className={
                                        'color-body-inverted max-w-sm  font-alt text-5xl font-bold'
                                    }
                                >
                                    {comics.title}
                                </h2>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default ComicsList
