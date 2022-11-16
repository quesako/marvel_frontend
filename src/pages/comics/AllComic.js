import axios from 'axios'
import { useEffect, useState } from 'react'

const AllComics = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/comics`
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
                data.results.map((comics, index) => {
                    return <p key={index}>{comics.title}</p>
                })
            ) : (
                <p>is loading</p>
            )}
        </>
    )
}
export default AllComics
