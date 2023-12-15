import {Chip, Dialog, DialogHeader, DialogBody, DialogFooter, Button, Spinner, Input} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getCaptions} from "../../api/video/youtube";
import {CheckBadgeIcon, ExclamationCircleIcon} from "@heroicons/react/24/solid";
import {addVideoAsMaterial} from "../../api/content/inedx";

export default function AddMaterial() {
    const navigate = useNavigate()

    const [inputURL, setInputURL] = useState("")
    const [isYoutubeVideo, setIsYoutubeVideo] = useState(null)
    const [youtubeVideoId, setYoutubeVideoId] = useState(null)
    const [importantKeyWord, setImportantKeyWord] = useState([])

    const {
        data: caption,
        refetch: refetchCaption,
        isLoading: isCaptionLoading,
    } = useQuery({
        queryKey: ['captions', youtubeVideoId],
        queryFn: ({signal}) => getCaptions({videoID: youtubeVideoId, signal}),
        enabled: !!isYoutubeVideo
    })

    const {
        mutate: addVideoMaterialMutate,
        isLoading: isAddVideoMaterialLoading,
        isError: isAddVideoMaterialError,
        error: addVideoMaterialError
    } = useMutation({
        mutationFn: addVideoAsMaterial,
        onSuccess: () => {
            navigate("/content")
        }
    })

    useEffect(() => {
        if (!inputURL) {
            return
        }

        try {
            let url = new URL(inputURL)
            const videoID = url.searchParams.get("v")

            if (url.hostname !== "www.youtube.com") {
                throw new Error("Not support url")
            }

            if (!videoID) {
                throw new Error("Not support url")
            }

            setYoutubeVideoId(videoID)
            setIsYoutubeVideo(true)
            refetchCaption()
        } catch (e) {
            setYoutubeVideoId(false)
            setIsYoutubeVideo(false)
        }
    }, [inputURL])

    useEffect(() => {
        if (!caption) {
            return
        }

        const keywords = Object.keys(caption.frequency_of_words).map((key) => {
            return {word: key, frequency: caption.frequency_of_words[key]}
        });
        const sortedKeyWords = keywords.filter((item) => item.frequency > 1).sort((a, b) => b.frequency - a.frequency)
        setImportantKeyWord([...sortedKeyWords.keys()])

    }, [caption])


    const openHandler = () => {
        navigate("/content")
    }

    const insertVideoHandler = () => {
        const insertCaptions = caption.lines.map((line) => {
            return {start: line.start, end: line.end, origin_text: line.text}
        })

        addVideoMaterialMutate({
            videoID: youtubeVideoId,
            sourceURL: `https://www.youtube.com/embed/${youtubeVideoId}`,
            captions: insertCaptions,
        })
    }

    return <Dialog open={true}
                   handler={openHandler}
                   size="xl">
        <DialogHeader/>
        <DialogBody>
            <Input label="Youtube 影片網址" onChange={(e) => setInputURL(e.target.value)}></Input>

            <div className="flex">

                <div className="mt-6 w-[640px] h-[360px]">
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>

                {isYoutubeVideo != null && <div className="p-6">
                    <Chip size="lg"
                          variant="outlined"
                          color={isYoutubeVideo ? "green" : "red"}
                          icon={isYoutubeVideo ? <CheckBadgeIcon/> : <ExclamationCircleIcon/>}
                          value={isYoutubeVideo ? "網址正確" : "網址錯誤"}
                    />
                    {isCaptionLoading && <Spinner className="mt-4" color="amber"/>}
                    {!isCaptionLoading &&
                    <Chip
                        className="mt-4"
                        size="lg"
                        variant="outlined"
                        color={caption?.lines.length > 0 ? "green" : "red"}
                        icon={isYoutubeVideo ? <CheckBadgeIcon/> : <ExclamationCircleIcon/>}
                        value={caption?.lines.length > 0 ? "有英文字幕" : "此影片未包含英文字幕"}
                    />}
                </div>}
            </div>
        </DialogBody>
        <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={openHandler}
                className="mr-1"
            >
                <span>取消</span>
            </Button>
            <Button
                variant="gradient"
                color="green"
                disabled={!isYoutubeVideo || !caption?.lines.length || isAddVideoMaterialLoading}
                onClick={insertVideoHandler}
            >
                <span>新增</span>
            </Button>
        </DialogFooter>
    </Dialog>
}