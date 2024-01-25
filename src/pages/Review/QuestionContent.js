import MeanQuestion from "./component/MeanQuestion";
import ListenQuestion from "./component/ListenQuestion";

export default function QuestionContent({review, question}) {
    return <>
        {
            question.type === "Mean" && <MeanQuestion review={review} question={question}/>
        }
        {
            question.type === "Listen" && <ListenQuestion review={review} question={question}/>
        }
    </>
}