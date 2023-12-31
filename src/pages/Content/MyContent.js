import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {searchContent} from "../../api/content/inedx";
import {Button, Typography,} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import ContentNav from "./ContentNav";
import Loading from "../../components/ui/Loading";
import VideoLesson from "../../assets/content/video_lesson.svg"
import ContentCard from "./ContentCard";
import {useState} from "react";

export default function MyContent() {
    const navigate = useNavigate();
    const [orderBy, setOrderBy] = useState("id desc")

    const addContentHandler = () => {
        navigate("/content/add")
    }

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['content', getAuthToken(), {orderBy, limit: 0}],
        queryFn: ({signal}) => searchContent({signal, orderBy, limit: 0})
    });

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        // FIXME：Provide error page
        return <div>error</div>
    }

    if (data.contents.length === 0) {
        return <div className="flex-1 mx-auto max-w-5xl min-w-[64rem] p-6">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <img src={VideoLesson} alt="video lesson"/>
                <Typography color="gray" variant="h4">看來您還沒收藏任何影片，嘗試加入新的影片讓我幫助你學習</Typography>
                <Button
                    color="light-blue"
                    size="lg"
                    className="mt-4"
                    onClick={addContentHandler}
                >
                    <Typography variant="h4">新增影片</Typography>
                </Button>
            </div>

        </div>
    }

    const onOrderByChangeHandler = (v) => {
        setOrderBy(v)
    }

    return <div className="w-full">
        <ContentNav
            onAddContentClick={addContentHandler}
            onOrderByChange={onOrderByChangeHandler}
        ></ContentNav>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-6 p-8">
            {
                data.contents.map((content) => {
                    return <ContentCard key={content.id} content={content}/>
                })
            }
        </div>
    </div>
}