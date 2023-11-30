import {Progress, Typography} from "@material-tailwind/react";
import {FireIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";

export default function QuestionProgress({review}) {
    console.log(review);
    const [showText, setShowText] = useState("")
    const [color, setColor] = useState("green")
    const [continuousCount, setContinuousCount] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!review || review.current_question_id == 0) {
            return
        }

        const idx = review.questions.findIndex((q) => q.id == review.current_question_id)
        setProgress(Math.round((idx + 1) / review.questions.length * 100))

        let continuousCountTmp = 0
        for (let i = idx - 1; i > 0; i--) {
            if (review.questions[i].is_correct) {
                continuousCountTmp++
            } else {
                break
            }
        }

        setContinuousCount((prev => {
            return continuousCountTmp
        }))

        if (continuousCountTmp >= 1) {
            setShowText("")
            setColor("green")
        }

        if (continuousCountTmp >= 3) {
            setShowText(`連續答對${continuousCount}題`)
            setColor("orange")
        }

        if (continuousCountTmp >= 5) {
            setShowText(`連續答對${continuousCount}題`)
            setColor("red")
        }


    }, [review])
    return <>
        <div className="flex justify-center items-center mb-2">
            <Typography
                color={color} variant="h6">
                {showText}
            </Typography>
            {continuousCount > 3 && <FireIcon className={"h-5 w-5 " + `text-${color}-500`}/>}
        </div>

        <Progress color={color} value={progress}/>
    </>
}