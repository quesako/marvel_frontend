import ComicsListEl from './ComicsListEl'

const ComicsList = ({ allComicsData }) => {
    return (
        <div
            className={
                'mx-auto  grid max-w-7xl gap-24 px-4 pt-12 md:grid-cols-2 '
            }
        >
            {allComicsData.map((comics) => {
                return <ComicsListEl key={comics._id} comics={comics} />
            })}
        </div>
    )
}

export default ComicsList
