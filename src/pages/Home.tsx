import Hero from '../components/Hero/Hero'
import ArticleTable from '../components/Table/ArticleTable'

function Home() {

    return (
        <>
            <Hero writeUp={"Welcome to all you want to know about Law"} />
            <ArticleTable />
        </>
    )
}

export {Home}
