import {useEffect, useState} from "react";
import {createReview, getReview} from "../../api/review";

export default function Review() {

    const [review, setReview] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const response = await createReview()
            const reviewID = response.id
            const newReview = await getReview(reviewID)
            setReview(newReview)
        }
        fetchData()
    }, [])

    return <div>
        {
            review && <div>{review.id}</div>
        }
    </div>

}