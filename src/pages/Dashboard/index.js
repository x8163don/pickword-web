import {Card, CardBody, Typography} from "@material-tailwind/react";
import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {getLearningProgress} from "../../api/learner";
import Loading from "../../components/ui/Loading";
import Error from "../System/Error";

export default function Dashboard() {
    const cacheTime = 5 * 60 * 1000
    const {
        data: learningProgress,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['learner', 'progress', getAuthToken()],
        queryFn: ({signal}) => getLearningProgress({signal}),
        staleTime: cacheTime,
        cacheTime: cacheTime,
    })

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return <Error/>
    }

    return <main className="mx-auto max-w-5xl min-w-[64rem] pt-16">
        <div className="flex gap-4">
            <Card>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-6">學習進度</Typography>

                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center">
                            <span className="mx-auto block h-2 w-2 rounded-full bg-red-900 content-['']"/>
                            <Typography variant="h6" color="gray"
                                        className="ml-2">單字庫總數：{learningProgress.total_follow_words}</Typography>
                        </div>

                        <div className="flex items-center">
                            <span className="mx-auto block h-2 w-2 rounded-full bg-red-900 content-['']"/>
                            <Typography variant="h6" color="gray"
                                        className="ml-2">新單字：{learningProgress.new_word}</Typography>
                        </div>

                        <div className="flex items-center justify-start">
                            <span className="mx-auto block h-2 w-2 rounded-full bg-red-900 content-['']"/>
                            <Typography variant="h6" color="gray"
                                        className="ml-2">學習中：{learningProgress.learning_word}</Typography>
                        </div>

                        <div className="flex items-center justify-start">
                            <span className="mx-auto block h-2 w-2 rounded-full bg-red-900 content-['']"/>
                            <Typography variant="h6" color="gray"
                                        className="ml-2">已掌握：{learningProgress.master_word}</Typography>
                        </div>
                    </div>


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