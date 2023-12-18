import {useQuery} from "@tanstack/react-query";
import {getByIDs} from "../../api/word";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getReview} from "../../api/review";
import {queryClient} from "../../api";
import WordCard from "../../components/WordCard";
import {Typography, Spinner} from "@material-tailwind/react";
import ReviewSummaryController from "./ReviewSummaryController";

export default function ReviewSummary() {

    const param = useParams()

    const [wordIDs, setWordIDs] = useState([])

    const {
        data: review,
        isLoading: isLoadingReview,
    } = useQuery({
        queryKey: ['review', param.reviewId],
        queryFn: ({signal}) => getReview({reviewId: param.reviewId, signal})
    })

    const {
        data: words,
        isLoading: isLoadingWords,
    } = useQuery({
        queryKey: ['word', {ids: wordIDs}],
        queryFn: ({signal}) => getByIDs({ids: wordIDs, signal}),
        enabled: wordIDs.length > 0
    });

    useEffect(() => {
        if (!review) {
            return
        }
        const ids = new Set()
        review.questions.forEach(q => {
            q.word_ids.forEach(id => {
                ids.add(id)
            })
        })
        setWordIDs(Array.from(ids))
    }, [review])

    useEffect(() => {
        queryClient.invalidateQueries(["word"])
    }, [wordIDs])

    if (isLoadingReview || isLoadingWords) {
        return <Spinner color="green" className="h-16 w-16 text-gray-900/50"/>
    }

    return <div className="flex flex-col h-screen">
        <div className="container mx-auto grow overflow-y-scroll">
            <Typography variant="h1">複習結算</Typography>
            <div className="flex flex-wrap gap-x-6 ">
                {
                    wordIDs.length > 0 && review.questions.map((q) => {
                        const id = q.word_ids[0]
                        const word = words.word_dic[id]
                        return <WordCard className={q.is_correct ? "" : "border-2 border-red-500"} key={id}
                                         word={word}></WordCard>
                    })
                }
            </div>
        </div>

        <div className="flex-none border-t-4">
            <ReviewSummaryController></ReviewSummaryController>
        </div>
    </div>
}

export function loader() {

}