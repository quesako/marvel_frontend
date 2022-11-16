import { useEffect, useState } from 'react'
import axios from 'axios'

const AllCharacters = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/characters`
                )
                setData(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [])

    console.log(data)
    return (
        <>
            {!isLoading ? (
                data.results.map((character, index) => {
                    return <p key={index}>{character.name}</p>
                })
            ) : (
                <p>is loading</p>
            )}
        </>
    )
}
export default AllCharacters
