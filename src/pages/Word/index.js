import {useEffect, useState} from "react";
import {searchFollowedWords} from "../../api/learner";
import {useQuery} from "@tanstack/react-query";
import {Input} from "@material-tailwind/react";
import {Pagination} from "../../components/ui/Pagination";
import WordCard from "../../components/WordCard";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import Loading from "../../components/ui/Loading";

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

    return <div className="flex flex-col min-w-[80rem] max-w-7xl mx-auto h-screen pt-16">
        <Input
            icon={<MagnifyingGlassIcon className="w-5 h-5"/>}
            onChange={(e) => {
                setPage(1)
                setSearchText(e.currentTarget.value)
            }}/>

        <div className="w-100 grow flex flex-wrap gap-4 p-4">
            {
                isLoading && <Loading/>
            }
            {
                !isLoading && pageWords.followed_words.map((item) => {
                    return <WordCard key={item.word_id} word={item.word}/>
                })
            }
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