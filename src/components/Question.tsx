import { Dispatch } from "react";
import { ActionType, Questions } from "./App";
import { Option } from "./Option";

export const Question = ({
    question,
    answer,
    dispatch,
}: {
    question: Questions;
    answer: number | null;
    dispatch: Dispatch<ActionType>;
}) => {
    return (
        <div className="question">
            <h4>{question.question}</h4>
            <Option question={question} answer={answer} dispatch={dispatch} />
        </div>
    );
};
