import { Dispatch } from "react";
import { ActionType } from "../components/App";

export const StartScreen = ({
    totalQuestions,
    dispatch,
}: {
    totalQuestions: number | undefined;

    dispatch: Dispatch<ActionType>;
}) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{totalQuestions} questions to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                Let's Start
            </button>
        </div>
    );
};
