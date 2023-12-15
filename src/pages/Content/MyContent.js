import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {searchContent} from "../../api/content/inedx";
import {
    Typography,
    Spinner,
    Card,
    CardBody,
    Button,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Collapse,
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import ContentItem from "./ContentItem";

export default function MyContent() {

    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['content', getAuthToken()],
        queryFn: ({signal}) => searchContent({signal})
    });

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <Spinner size="lg"></Spinner>
        </div>
    }

    if (isError) {
        // FIXME：Provide error page
        return <div>error</div>
    }

    const addContentHandler = () => {
        navigate("/content/add")
    }

    return <div className="mx-auto max-w-5xl min-w-[64rem] p-6">
        <div className="flex justify-end">
            <Button onClick={addContentHandler}>新增影片</Button>
        </div>


        <List>
            {
                data && data.contents.map((content) => {
                    return <ContentItem content={content}/>
                })
            }
        </List>
    </div>
}