import { Dispatch, useEffect } from "react";
import { ActionType } from "./App";

export const Timer = ({
    dispatch,
    secondsRemaining,
}: {
    dispatch: Dispatch<ActionType>;
    secondsRemaining: number;
}) => {
    console.log(secondsRemaining);

    const mins = Math.floor(secondsRemaining / 60);
    console.log(mins);

    const seconds = secondsRemaining % 60;
    useEffect(() => {
        // every single interval return a unique id
        const id = setInterval(() => {
            dispatch({ type: "ticking" });
        }, 1000);
        return () => {
            // we use the id to clean up
            clearInterval(id);
        };
    }, [dispatch]);
    return (
        <div className="timer">
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    );
};
