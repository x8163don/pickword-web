import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createReviewV2, getLastReview, cancelReview} from "../../api/review";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Dialog,
    Radio,
    Typography,
    Spinner
} from "@material-tailwind/react";
import Loading from "../../components/ui/Loading";
import MeanMode from "../../assets/review/mean-mode.svg";
import ListenMode from "../../assets/review/listen-mode.svg";
import {CheckIcon} from "@heroicons/react/24/solid";
import ReviewNav from "./ReviewNav";

export default function ReviewSetting() {

    const navigate = useNavigate()
    const [isContinueLastReviewOpen, setIsContinueLastReviewOpen] = useState(false)

    const [mode, setMode] = useState('AllMean')
    const [questionSize, setQuestionSize] = useState(15)

    const modeEnums = [
        {name: 'AllMean', src: MeanMode, label: '詞意模式'},
        {name: 'AllListen', src: ListenMode, label: '聽力模式'},
    ]

    const {
        data: lastReview,
        isLoading: isLoadingLastReview,
    } = useQuery({
        queryKey: ['review', 'last'],
        cacheTime: 5000,
        staleTime: 5000,
        queryFn: ({signal}) => getLastReview({signal})
    })

    const {
        mutate: createReviewMutate,
        isPending: isPendingCreateReview,

    } = useMutation({
        mutationFn: createReviewV2,
        onSuccess: (data) => {
            navigate(`/review`)
        }
    })

    const {
        mutate: cancelReviewMutate,
    } = useMutation({
        mutationFn: cancelReview,
    })

    useEffect(() => {
        if (lastReview?.id) {
            setIsContinueLastReviewOpen(true)
        } else {
            setIsContinueLastReviewOpen(false)
        }
    }, [lastReview])

    if (isLoadingLastReview) {
        return <Loading/>
    }


    const createReviewHandler = async () => {
        createReviewMutate({questionSize, createType: mode})
    }

    const cancelReviewHandler = () => {
        if (lastReview?.id) {
            cancelReviewMutate({reviewId: lastReview.id})
        }
        setIsContinueLastReviewOpen(false)
    }

    const continueReviewHandler = () => {
        navigate("/review")
    }

    return <div className="w-full">
        <ReviewNav/>

        <div className="p-8">
            <div className="flex gap-6">
                {
                    modeEnums.map(({name, src, label}) => {
                        return <div
                            key={name}
                            className="flex flex-col cursor-pointer items-center justify-center w-fit"
                            onClick={() => {
                                setMode(name)
                            }}
                        >
                            <img className="p-2 border rounded-lg h-20 w-20" src={src} alt={label}/>
                            <Radio
                                name="mode"
                                checked={mode === name}
                                onChange={() => {
                                    setMode(name)
                                }}
                                label={label}
                                color="green"
                                icon={<CheckIcon className="h-4 w-4 bg-green-700 text-white rounded-full text-bold"/>}/>
                        </div>
                    })
                }
            </div>

            <div className="mt-4 flex gap-4">
                <Typography variant="h5" color="blue-gray">題目數量: </Typography>
                <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={questionSize}
                    onChange={(e) => {
                        setQuestionSize(e.target.value)
                    }}
                    className="w-72"
                />
                <Typography variant="h7">
                    {questionSize}
                </Typography>
            </div>

            <div className="mt-8">
                <Button color="green"
                        className="flex justify-center items-center gap-2"
                        onClick={createReviewHandler}
                        disabled={isPendingCreateReview}
                >
                    <Typography variant="h6">開始複習</Typography>
                    {isPendingCreateReview && <Spinner/>}
                </Button>
            </div>
        </div>

        <Dialog open={isContinueLastReviewOpen}>
            <Card>
                <CardHeader floated={false}></CardHeader>
                <CardBody className="flex justify-center items-center">
                    <Typography variant="h6">您上次的複習尚未完成，是否繼續上次的複習</Typography>
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button
                        variant="text"
                        color="red"
                        onClick={cancelReviewHandler}
                        className="mr-1"
                    >
                        <Typography variant="h6">放棄上次的複習</Typography>
                    </Button>
                    <Button variant="gradient"
                            color="green"
                            onClick={continueReviewHandler}
                    >
                        <Typography variant="h6">繼續完成</Typography>
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    </div>
}