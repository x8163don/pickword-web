import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLoaderData, useNavigate} from 'react-router-dom';
import {createReview, getReview} from "../../api/review";
import {useQuery,} from "@tanstack/react-query";
import {reviewActions} from "../../store/review";
import QuestionProgress from "./QuestionProgress";
import QuestionController from "./QuestionController";
import QuestionContent from "./QuestionContent";

export default function Review() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reviewId = useLoaderData()

    const review = useSelector((state) => state.review.review)
    const [question, setQuestion] = useState(null)

    const {
        data: reviewData,
        isLoading: isReviewLoading,
        isError: isReviewError,
        error: reviewError
    } = useQuery({
        queryKey: ["review", reviewId],
        queryFn: ({signal}) => getReview({reviewId, signal}),
    })


    useEffect(() => {
        if (reviewData && !review) {
            dispatch(reviewActions.replaceReview(reviewData))
        }
    }, [reviewData])

    useEffect(() => {
        if (!review) {
            return
        }

        if (review.status !== "Doing") {
            navigate(`/review/${review.id}/summary`)
        }

        setQuestion((prev) => {
            if (review.current_question_id == 0) {
                return review.questions[0]
            }

            return review.questions.find((q) => q.id == review.current_question_id)
        })
    }, [review])

    return <>
        {
            review?.status === "Doing" && question && <>
                <div className="container mx-auto p-8">
                    <QuestionProgress review={review}/>
                </div>

                <div className="container m-16 mx-auto max-w-4xl">
                    <QuestionContent review={review} question={question}/>
                </div>

                <div className="border-t-4">
                    <QuestionController review={review}/>
                </div>
            </>
        }
    </>
}

export const reviewLoader = async () => {
    const resp = await createReview({})
    if (!resp.ok) {
        throw new Error("Cannot create review")
    } else {
        const data = await resp.json()
        return data.id
    }
}