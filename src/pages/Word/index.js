import {useEffect, useState} from "react";
import {searchFollowedWords} from "../../api/learner";
import {useQuery} from "@tanstack/react-query";
import {Pagination} from "../../components/ui/Pagination";
import WordCard from "../../components/WordCard";
import Loading from "../../components/ui/Loading";
import WordNav from "./WordNav";

export default function Word() {

    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const {
        data: pageWords,
        isLoading,
    } = useQuery({
        queryKey: ['followWord', {page, text: searchText}],
        queryFn: ({signal}) => searchFollowedWords({page, text: searchText, signal})
    })

    useEffect(() => {
        if (!pageWords) {
            return
        }
        setTotalPage(pageWords.paginate.total_page)
    }, [pageWords])

    const onSearchTextChange = (text) => {
        setPage(1)
        setSearchText(text)
    }

    let content = ""
    if (isLoading) {
        content = <Loading/>
    } else {
        content = <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 grid-row-3 gap-6 p-8">
            {
                pageWords.followed_words.map((item) => {
                    return <WordCard key={item.word_id} word={item.word}/>
                })
            }
        </div>
    }

    return <div className="flex flex-col">
        <WordNav onSearchTextChange={onSearchTextChange}></WordNav>

        <div className="flex-1">
            {content}
        </div>

        <Pagination
            className="justify-center"
            current={page}
            total={totalPage}
            to={(newPage) => {
                setPage(newPage)
            }}
        />
    </div>
}