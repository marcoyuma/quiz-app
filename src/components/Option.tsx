import { Dispatch } from "react";
import { ActionType, Questions } from "./App";

export const Option = ({
    question,
    answer,
    dispatch,
}: {
    question: Questions | undefined;
    answer: number | null;
    dispatch: Dispatch<ActionType>;
}) => {
    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {question?.options?.map((option, index) => (
                <button
                    className={`btn btn-option ${
                        index === answer ? "answer" : ""
                    } ${
                        hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    key={option}
                    onClick={() => dispatch({ type: "new", payload: index })}
                    disabled={hasAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};
