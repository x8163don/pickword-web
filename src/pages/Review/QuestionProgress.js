import {Progress, Typography} from "@material-tailwind/react";
import {FireIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";

export default function QuestionProgress({review}) {

    const [showText, setShowText] = useState("")
    const [color, setColor] = useState("green")
    const [continuousCount, setContinuousCount] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const idx = review.questions.findIndex((q) => q.id === review.current_question_id)
        setProgress(Math.round(idx / review.questions.length * 100))

        let continuousCountTmp = 0
        for (let i = idx - 1; i >= 0; i--) {
            if (review.questions[i].is_correct) {
                continuousCountTmp += 1
            } else {
                break
            }
        }

        setContinuousCount(continuousCountTmp)

        if (continuousCountTmp === 0) {
            setShowText("")
            setColor("gray")
        }

        if (continuousCountTmp >= 1) {
            setShowText("")
            setColor("green")
        }

        if (continuousCountTmp >= 3) {
            setShowText(`連續答對${continuousCountTmp}題`)
            setColor("orange")
        }

        if (continuousCountTmp >= 5) {
            setShowText(`連續答對${continuousCountTmp}題`)
            setColor("red")
        }

    }, [review])
    return <>
        <div className="flex justify-center items-center mb-2">
            <Typography
                color={color} variant="h6">
                {showText}
            </Typography>
            {continuousCount > 3 && <FireIcon className={`h-5 w-5 text-${color}-500`}/>}
        </div>

        <Progress color={color} value={progress}/>
    </>
}