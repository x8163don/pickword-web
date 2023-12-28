import {
    Tooltip, Typography, Card, CardHeader, CardBody, CardFooter
} from "@material-tailwind/react";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

export default function ContentCard({content}) {

    return <Card className="overflow-hidden" >
        <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
        >
            <img
                src={content.thumbnail}
                alt="thumbnail"
            />
        </CardHeader>

        <CardBody className="flex-1">
            <Typography variant="h5" color="blue-gray">
                {content.title}
            </Typography>
        </CardBody>

        <CardFooter className="flex items-center justify-end">
            <Tooltip content="在新視窗中開啟">
                <Link to={`https://www.youtube.com/watch?v=${content.source_id}`} target="_blank"
                      rel="noopener noreferrer">
                    <ArrowTopRightOnSquareIcon className="w-5 h-5"/>
                </Link>
            </Tooltip>
        </CardFooter>
    </Card>
}