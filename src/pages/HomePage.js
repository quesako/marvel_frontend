const HomePage = () => {
    return (
        <div>
            <div
                className={
                    'mx-auto mt-48 max-w-4xl  px-4 text-center font-alt text-white'
                }
            >
                <h1 className={'text-6xl font-bold'}> Welcome 👋,</h1>

                <p className={'text-xl'}>
                    This website is not an official "Disney" website but a work
                    project designed as part of a developer training...It's use
                    an api based on express.
                    <br /> With that, have a good day....
                </p>
                <div className={'mt-24 text-lg'}>
                    <p>Build with:</p>
                    <p className={'text-zinc-600'}>
                        #react #tailwindcss #headless-ui #cookie-js
                    </p>
                </div>
                <div className={'mt-24 text-lg'}>
                    <p>@todo: </p>
                    <p className={'text-zinc-600'}>1. Create notFound page</p>
                    <p className={'text-zinc-600'}>
                        2. Secure undefined data on single pages
                    </p>
                    <p>
                        Paginate the search result (display only the 1000 first
                        results)
                    </p>
                    <p className={'text-zinc-600'}>
                        3. Refactoring to suppress duplicate code
                    </p>
                    <p className={'text-zinc-600'}>
                        4. Allow the navigation since the characters single page
                        to the related comics
                    </p>
                </div>
            </div>
        </div>
    )
}
export default HomePage
