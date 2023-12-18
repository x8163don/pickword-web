import {useEffect, useState} from "react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import {Button, Typography} from "@material-tailwind/react";
import {useDispatch} from "react-redux";
import {reviewActions} from "../../store/review";


export default function QuestionController({review}) {

    const dispatch = useDispatch()

    const [isAnsweredQuestion, setIsAnsweredQuestion] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {
        const currentQuestionIdx = review.questions.findIndex((q) => q.id === review.current_question_id)
        setIsAnsweredQuestion(!!review.questions[currentQuestionIdx].learner_answer)
        setIsCorrect(review.questions[currentQuestionIdx].is_correct)
    }, [review])

    const nextQuestionHandler = () => {
        dispatch(reviewActions.nextQuestion(undefined))
    }

    return <div className="container mx-auto h-36 flex justify-between items-center">
        <div className="flex items-center">
            {
                isAnsweredQuestion && isCorrect && <>
                    <CheckCircleIcon className="text-green-500 h-20 w-20"/>
                    <Typography variant="h4">正確</Typography>
                </>
            }
        </div>

        <Button
            variant="filled"
            size="lg"
            color="green"
            disabled={!isAnsweredQuestion}
            onClick={nextQuestionHandler}
        >
            <Typography variant="h4" className="text-white">下一題</Typography>
        </Button>
    </div>

}