import {useEffect, useState} from "react";
import {searchFollowedWords} from "../../api/learner";
import {useQuery} from "@tanstack/react-query";
import {Input, Spinner} from "@material-tailwind/react";
import {Pagination} from "../../components/ui/Pagination";
import WordCard from "../../components/WordCard";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

export default function Word() {

    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const {
        data: pageWords,
        isLoading,
        isError,
        error,
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

    return <div>

        <Input
            icon={<MagnifyingGlassIcon className="w-5 h-5"/>}
            onChange={(e) => {
            setSearchText(e.currentTarget.value)
        }}>

        </Input>

        <div className="flex gap-4 flex-wrap">
            {
                isLoading && <Spinner size="lg"></Spinner>
            }
            {
                !isLoading && pageWords.followed_words.map((item) => {
                    return <WordCard key={item.word_id} word={item.word}/>
                })
            }

        </div>

        <Pagination current={page}
                    total={totalPage}
                    to={(newPage) => {
                        setPage(newPage)
                    }}
        />
    </div>
}