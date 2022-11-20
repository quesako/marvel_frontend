import { useState } from 'react'
import Loader from '../components/Loader'

const HomePage = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    console.log(data)
    return (
        <div>
            {!isLoading ? (
                <p>Super</p>
            ) : (
                <Loader message={'Loading...'} isLoading={isLoading} />
            )}
        </div>
    )
}
export default HomePage
