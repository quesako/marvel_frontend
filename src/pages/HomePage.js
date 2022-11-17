import axios from 'axios'
import { useEffect, useState } from 'react'
import ComicsList from '../components/ComicsList'
import Loader from '../components/Loader'

const HomePage = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    /* Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_MARVEL}/comics?limit=2`
                )

                setData(response.data.results)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [])

    console.log(data)
    return (
        <div>
            {!isLoading ? (
                <ComicsList data={data} />
            ) : (
                <Loader message={'is loading'} />
            )}
        </div>
    )
}
export default HomePage
