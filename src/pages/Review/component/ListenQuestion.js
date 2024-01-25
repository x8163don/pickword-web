import {Typography, IconButton, Button} from "@material-tailwind/react";
import {useDispatch} from "react-redux";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getContentByID} from "../../../api/content/inedx";
import YouTube from "react-youtube";
import {useEffect, useRef, useState} from "react";
import {reviewActions} from "../../../store/review";
import {answerQuestion} from "../../../api/review";
import {PlayIcon} from "@heroicons/react/24/solid";
import Turtle from "../../../assets/question/turtle.svg";


export default function ListenQuestion({review, question}) {

    const dispatch = useDispatch()

    const playerRef = useRef()
    const [targetMaterial, setTargetMaterial] = useState(null)
    const [standardAnswers, setStandardAnswers] = useState(question.standard_answer.split(","))
    const [currentAnswer, setCurrentAnswer] = useState(new Array(standardAnswers.length).fill(0))

    const [choicesDict, setChoicesDict] = useState(new Map())

    const [opts, setOpts] = useState({
        autoplay: 1,
        loop: 1,
        controls: 0,
        cc_load_policy: 3,
        iv_load_policy: 3,
        disablekb: 1,
    })

    const {
        data: content,
    } = useQuery({
        queryKey: ['content', question.payload.content_id],
        queryFn: ({signal}) => getContentByID({signal, id: question.payload.content_id}),
        enabled: !!(question?.payload?.content_id)
    })

    const {
        mutate: answerQuestionMutate,
    } = useMutation({
        mutationFn: answerQuestion,
    })

    useEffect(() => {
        if (!content) {
            return
        }

        const targetMaterial = content.materials.find((m) => m.id === question.payload.material_id)
        setTargetMaterial(targetMaterial)
        if (targetMaterial) {
            setOpts((prev) => {
                return {
                    ...prev,
                    start: Math.floor(targetMaterial.start),
                    end: Math.ceil(targetMaterial.end),
                }
            })
        }
    }, [question.id, question.payload.material_id, content])

    useEffect(() => {
        if (currentAnswer.findIndex((n) => n === 0) !== -1) {
            return
        }
        const answer = currentAnswer.join(",")
        dispatch(reviewActions.answerQuestion({answer}))
        answerQuestionMutate({reviewId: review.id, answer})
    }, [currentAnswer, answerQuestionMutate])

    useEffect(() => {
        const dict = new Map()
        question.choices.split(",").forEach((choice) => {
            const no = choice.split(":")[0]
            const text = choice.split(":")[1]
            dict.set(no, text)
        })
        setChoicesDict(dict)
        const answers = question.standard_answer.split(",")
        setStandardAnswers(answers)
        setCurrentAnswer(new Array(answers.length).fill(0))
    }, [question.id, question.standard_answer])

    const choiceHandler = (no) => {
        const nextIndex = currentAnswer.findIndex((n) => n === 0)
        if (nextIndex === -1) {
            return
        }

        if (standardAnswers[nextIndex] === no) {
            setCurrentAnswer(prev => {
                const newState = Array.from(prev)
                newState[nextIndex] = no
                return newState
            })
        }
    }

    const playActionHandler = (rate) => {
        const player = playerRef.current.getInternalPlayer();
        player.seekTo(Math.floor(targetMaterial.start))
        player.setPlaybackRate(rate)
        player.playVideo()

        player.addEventListener('onPlay', (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
                const currentTime = player.getCurrentTime();
                const endTime = Math.floor(targetMaterial.end);
                if (currentTime >= endTime) {
                    player.pauseVideo();
                }
            }
        });
    }

    return <>
        <Typography variant="h2" className="mb-5">請依照順序選擇答案</Typography>
        {
            content && opts.start && <YouTube
                className="flex justify-center"
                ref={playerRef}
                videoId={content.source_id}
                opts={{playerVars: opts}}
            />
        }
        <div className="flex justify-center items-center gap-8 mt-2 mb-2">
            <IconButton variant="outlined"
                        className="rounded-full"
                        onClick={() => {
                            playActionHandler(1)
                        }}>
                <PlayIcon className="h-5 w-5"/>
            </IconButton>

            <IconButton
                variant="outlined"
                className="rounded-full"
                onClick={() => {
                    playActionHandler(0.5)
                }}>
                <img alt="turtle" src={Turtle} className="h-5 w-5"/>
            </IconButton>
        </div>
        <div className="flex gap-2 mb-4 justify-center">{
            currentAnswer.map((no, i) => {
                return <div
                    key={'answer-' + no + '-' + i}
                    className={"h-12 text-center text-lg" + (choicesDict.get(no) ? " w-fit" : " min-w-[48px] border-b-4")}>
                    {choicesDict.get(no)}
                </div>
            })
        }</div>

        <div className="flex flex-wrap gap-4">
            {
                Array.from(choicesDict.keys())
                    .filter((k) => !currentAnswer.includes(k))
                    .map((k) => {
                        return <Button key={'choice-' + k}
                                       variant="outlined"
                                       onClick={() => {
                                           choiceHandler(k)
                                       }}
                        >{choicesDict.get(k)}</Button>
                    })
            }
        </div>
    </>
}
