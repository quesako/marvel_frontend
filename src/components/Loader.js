const Loader = ({ message }) => {
    return (
        <div className={'flex min-h-screen items-center'}>
            <p className={'text-white'}>{message}</p>
        </div>
    )
}

export default Loader
