import {Checkbox, Card, CardBody, Progress, Typography} from "@material-tailwind/react";
import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {getLearningProgress} from "../../api/learner";

export default function Dashboard() {
    const cacheTime = 5 * 60 * 1000
    const {
        data: learningProgress,
    } = useQuery({
        queryKey: ['learner', 'progress', getAuthToken()],
        queryFn: ({signal}) => getLearningProgress({signal}),
        staleTime: cacheTime,
        cacheTime: cacheTime,
    })

    return <main className="mx-auto max-w-5xl min-w-[64rem] pt-16">
        <div className="flex gap-4">
            <Card>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-6">學習進度</Typography>
                    <Progress
                        className="w-96"
                        value={learningProgress.mean_achieve_word_count}
                        size={learningProgress.total_follow_words}
                    />
                </CardBody>
            </Card>

            {/*<Card>*/}
            {/*    <CardBody className="w-96">*/}
            {/*        <Typography variant="h5" color="blue-gray" className="mb-2">今日目標</Typography>*/}
            {/*        <Checkbox label="收藏新影片" disabled checked />*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}
        </div>
    </main>
}