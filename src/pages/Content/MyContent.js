import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {searchContent} from "../../api/material/inedx";
import {Spinner, Card, CardBody,Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

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
        return <div>error</div>
    }

    const addContentHandler = ()=>{
        navigate("/content/add")
    }

    return <div className="mx-auto max-w-5xl min-w-[64rem] p-6">
        <div className="flex justify-end">
            <Button onClick={addContentHandler}>新增影片</Button>
        </div>

        <div className="flex gap-4 flex-wrap">
        {
            data.contents.map((item) => {
                return <Card
                    key={item.source_id}
                    onClick={()=>{
                }}>
                    <CardBody className="w-[426px] h-[240px]">
                        <iframe
                            src={item.source_url}
                            width="100%"
                            height="100%"
                        ></iframe>
                    </CardBody>
                </Card>
            })
        }
        </div>
    </div>
}