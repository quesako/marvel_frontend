import CharactersListEl from './charactersListEl'

const CharactersList = ({
    allCharactersData,
    favoritesData,
    setFavoritesData,
}) => {
    return (
        <div
            className={
                'mx-auto grid max-w-7xl gap-24 px-4 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }
        >
            {allCharactersData.map((character) => {
                return (
                    <CharactersListEl
                        key={character._id}
                        character={character}
                        favoritesData={favoritesData}
                        setFavoritesData={setFavoritesData}
                    />
                )
            })}
        </div>
    )
}

export default CharactersList
