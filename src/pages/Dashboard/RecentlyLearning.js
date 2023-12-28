import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {searchContent} from "../../api/content/inedx";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/24/outline";
import Loading from "../../components/ui/Loading";
import ContentCard from "../Content/ContentCard";

export default function RecentlyLearning({className}) {

    const orderBy = "id desc";
    const limit = 3

    const navigate = useNavigate()

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ['content', getAuthToken(), {orderBy, limit}],
        queryFn: ({signal}) => searchContent({signal, orderBy, limit}),
    });

    let recentlyContents = ""
    if (isLoading) {
        recentlyContents = <Loading/>
    } else {
        recentlyContents = <div className="grid grid-cols-4 gap-6">
            <Card>
                <CardBody className="h-full flex flex-col justify-center items-center">
                    <div className="cursor-pointer hover:text-blue-gray-900"
                         onClick={() => {
                             navigate("/content/add")
                         }}>
                        <PlusIcon className="w-24 h-24"/>
                        <Typography variant="h6">收藏新影片</Typography>
                    </div>
                </CardBody>
            </Card>
            {
                data.contents.map((content) => {
                    return <ContentCard key={content.id} content={content}/>
                })
            }
        </div>
    }


    return <div className={className}>
        <Typography variant="h4" className="p-6">從收藏開始學習</Typography>
        {recentlyContents}
    </div>
}