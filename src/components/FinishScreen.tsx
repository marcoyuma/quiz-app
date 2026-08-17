import { Dispatch } from "react";
import { ActionType } from "./App";

export const FinishScreen = ({
    points,
    totalMaxPoints,
    highestScore,
    dispatch,
}: {
    points: number;
    totalMaxPoints: number | undefined;
    highestScore: null | number;
    dispatch: Dispatch<ActionType>;
}) => {
    // stored value of points
    const percentage = (points / (totalMaxPoints ?? 0)) * 100;

    // immutable defined emoji
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage > 80 && percentage < 100) emoji = "🥳";
    if (percentage > 50 && percentage < 80) emoji = "🙂‍↔️";
    if (percentage >= 0 && percentage < 50) emoji = "😒";
    if (percentage === 0) emoji = "🤮";

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
                {totalMaxPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highestScore})</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart
            </button>
        </>
    );
};
