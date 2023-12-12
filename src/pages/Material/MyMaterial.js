import {useQuery} from "@tanstack/react-query";
import {getAuthToken} from "../../utils/auth";
import {searchContent} from "../../api/material/inedx";
import {Spinner, Card, CardBody} from "@material-tailwind/react";

export default function MyMaterial() {

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['material', getAuthToken()],
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

    return <div className="p6 flex gap-4 flex-wrap">
        {
            data.contents.map((item) => {
                return <Card onClick={()=>{
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
}

export const loader = () => {
}