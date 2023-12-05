import {createReview} from "../../api/review";
import {reviewActions} from "./index";

export const fetchLastDoingReview = () => {
    return async (dispatch) => {
        const resp = await createReview()

        if (!resp.ok) {
            throw new Error("Cannot get review detail")
        }

        const review = await resp.json()

        dispatch(reviewActions.replaceReview(review))
    }
}