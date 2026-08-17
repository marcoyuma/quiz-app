import { Dispatch } from "react";
import { ActionType } from "./App";

export const NextButton = ({
    dispatch,
    answer,
    totalQuestions,
    index,
}: {
    dispatch: Dispatch<ActionType>;
    answer: null | number;
    totalQuestions: number;
    index: number;
}) => {
    // we're not using "!answer" cuz if the "answer" value is "0" then it'll return immediately
    if (answer === null) {
        return null;
    }
    if (index < totalQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "next" })}
            >
                Next
            </button>
        );

    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
        >
            Finish
        </button>
    );
};
