import {useEffect, useState} from "react";
import {answerQuestion, createReview, getReview} from "../../api/review";
import {Button, Typography} from "@material-tailwind/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import QuestionProgress from "./QuestionProgress";

export default function Review() {

    const [review, setReview] = useState(null)
    const [question, setQuestion] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await createReview()
            const reviewID = response.id
            const newReview = await getReview(reviewID)
            setReview((prev) => {
                return newReview
            })
        })()
    }, [])

    useEffect(() => {
        setQuestion((prev) => {
            if (!review) {
                return prev
            }

            if (review.current_question_id == 0) {
                return review.questions[0]
            }

            return review.questions.find((q) => q.id == review.current_question_id)
        })
    }, [review])

    const answerQuestionHandler = async (answer) => {
        answerQuestion(review.id, answer)

        // next question
        const curQuestionIdx = review.questions.findIndex((q) => q.id == question.id)

        if (curQuestionIdx == review.questions.length - 1) {
            setReview((prev) => {
                return {...prev, current_question_id: 0, state: "Answered"}
            })
        } else {
            setReview((prev) => {
                return {...prev, current_question_id: review.questions[curQuestionIdx + 1].id}
            })
        }
    }

    return <>
        {
            question && <>
                <div className="container mx-auto p-8">
                    <QuestionProgress review={review}/>
                </div>

                <div className="container m-16 mx-auto max-w-4xl">
                    <Typography variant="h2" className="mb-5">請選擇正確答案</Typography>
                    <Typography variant="h3" className="text-center">{question.topic}</Typography>

                    <div className="flex flex-col p-6">
                        {
                            question.choices.split(',').map((choice, index) => {
                                    const choiceArr = choice.split(":")
                                    const order = choiceArr[0]
                                    const content = choiceArr[1]
                                    return <Button
                                        key={order}
                                        variant="outlined"
                                        className="w-full max-w-xl m-4 self-center border-b-4"
                                        onClick={() => answerQuestionHandler(order)}>
                                        <div className="flex">
                                            <Typography className="font-semibold">{order}</Typography>
                                            <Typography className="flex-1 font-semibold">{content}</Typography>
                                        </div>
                                    </Button>
                                }
                            )
                        }
                    </div>
                </div>


                <div className="border-t-4">
                    <div className="container mx-auto h-36 flex justify-between items-center">
                        <div className="flex items-center">
                            <CheckCircleIcon className="text-green-800 h-20 w-20"/>
                            <Typography variant="h4">正確</Typography>
                        </div>

                        <Button
                            variant="filled"
                            size="lg"
                            color="green"
                        >
                            <Typography variant="h4" className="text-white">下一題</Typography>
                        </Button>
                    </div>
                </div>
            </>
        }
    </>

}