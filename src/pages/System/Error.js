import ErrorImg from "../../assets/system/error.svg";
import {Button, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

export default function Error() {

    const navigate = useNavigate()


    return <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-1/3">
            <img src={ErrorImg} alt="error found"/>
        </div>

        <Typography color="gray" variant="h3">看來遇到了一點問題</Typography>

        <div className="flex gap-6">
            <Button
                className="mt-6"
                variant="outlined"
                size="lg"
                onClick={() => {
                    navigate(-1)
                }}
            >
                <Typography variant="h4">回上一頁</Typography>
            </Button>
            <Button
                className="mt-6"
                color="light-blue"
                size="lg"
                onClick={() => {
                    navigate(0)
                }}
            >
                <Typography variant="h4">重新嘗試</Typography>
            </Button>

        </div>
    </div>
}