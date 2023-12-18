import {Button, Typography} from "@material-tailwind/react";
import {reviewActions} from "../../store/review";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {answerQuestion} from "../../api/review";


export default function QuestionContent({review, question}) {

    const dispatch = useDispatch()

    const {
        mutate: answerQuestionMutate,
    } = useMutation({
        mutationFn: answerQuestion,
    })

    const answerQuestionHandler = async (answer) => {
        if (!review) {
            return
        }

        if (review.status !== "Doing") {
            return
        }

        const curQuestionIdx = review.questions.findIndex((q) => q.id === review.current_question_id)

        if (!!review.questions[curQuestionIdx].learner_answer) {
            return
        }

        dispatch(reviewActions.answerQuestion({answer}))
        answerQuestionMutate({reviewId: review.id, answer})
    }


    return <>
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
                            onClick={() => answerQuestionHandler(order)}
                        >
                            <div className="flex">
                                <Typography className="font-semibold">{order}</Typography>
                                <Typography className="flex-1 font-semibold">{content}</Typography>
                            </div>
                        </Button>
                    }
                )
            }
        </div>
    </>
}