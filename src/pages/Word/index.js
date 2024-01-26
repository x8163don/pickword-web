import {useEffect, useState} from "react";
import {changeMasteredWord, searchFollowedWords} from "../../api/learner";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Pagination} from "../../components/ui/Pagination";
import WordCard from "../../components/WordCard";
import Loading from "../../components/ui/Loading";
import WordNav from "./WordNav";
import {queryClient} from "../../api";

export default function Word() {

    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const [speakType, setSpeakType] = useState("us")
    const [languageType, setLanguageType] = useState("zh")
    const [masteredType, setMasteredType] = useState(undefined)

    const {
        data: pageWords,
        isLoading,
    } = useQuery({
        queryKey: ['followWord', {page, text: searchText, is_mastered: masteredType}],
        queryFn: ({signal}) => searchFollowedWords({page, text: searchText, is_mastered: masteredType, signal})
    })

    const {
        mutate: changeMasteredMutate,
    } = useMutation({
        mutationFn: changeMasteredWord,
        onMutate: ({wordID, isMastered}) => {
            const prev = queryClient.getQueryData(['followWord', {page, text: searchText, is_mastered: masteredType}])
            prev.followed_words.find(item => item.word_id === wordID).mastered = isMastered
            queryClient.setQueryData(['followWord', {page, text: searchText}], prev)
            queryClient.invalidateQueries({queryKey: ['followWord']})
        }
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

    const onMasteredChange = (wordID, mastered) => {
        changeMasteredMutate({wordID, isMastered: mastered})
    }

    let content = ""
    if (isLoading) {
        content = <Loading/>
    } else {
        content = <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-6 p-8">
            {
                pageWords.followed_words.map((item) => {
                    return <WordCard key={item.word_id}
                                     word={item.word}
                                     mastered={item.mastered}
                                     speakType={speakType}
                                     languageType={languageType}
                                     isShowController={true}
                                     onMasteredChange={onMasteredChange}
                    />
                })
            }
        </div>
    }

    return <div className="flex flex-col">
        <WordNav
            onSearchTextChange={onSearchTextChange}
            onSpeakTypeChange={(v) => {
                setSpeakType(v)
            }}
            onLanguageTypeChange={(v) => {
                setLanguageType(v)
            }}
            onMasteredTypeChange={(v) => {
                setMasteredType(v)
            }}
        ></WordNav>

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