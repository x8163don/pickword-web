import {Button, Typography} from "@material-tailwind/react";
import {reviewActions} from "../../store/review";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function ReviewSummaryController() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const keepReviewHandler = () => {
        dispatch(reviewActions.resetReview(null))
        navigate("/review")
    }

    return <div className="container mx-auto h-36 flex justify-end items-center">
        <Button
            variant="filled"
            size="lg"
            color="green"
            onClick={keepReviewHandler}
        >
            <Typography variant="h4" className="text-white">
                繼續複習
            </Typography>
        </Button>
    </div>
}