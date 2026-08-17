import { useEffect, useReducer } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import "../styles/style.css";
import { Loader } from "./Loader";
import { ErrorLoad } from "./ErrorLoad";
import { StartScreen } from "./StartScreen";
import { Question } from "./Question";
import { NextButton } from "./NextButton";
import { Progress } from "./Progress";
import { FinishScreen } from "./FinishScreen";
import { Footer } from "./Footer";
import { Timer } from "./Timer";

const SECS_PER_QUESTION = 30;

// define the Questions type
export type Questions = {
    correctOption?: number;
    id?: string;
    options?: string[];
    points?: number;
    question?: string;
};

// define the initial state structure
type InitialState = {
    questions: Questions[];
    status: string;
    index: number;
    answer: null | number;
    points: number;
    highestScore: null | number;
    secondsRemaining: number;
};

// where state stored
// we can say that this is the user property. where their "things got packed up"
const initialState: InitialState = {
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",

    // define index to keep track the question one by one
    index: 0,

    // defined state where the users answer will be stored at
    answer: null,

    // define state where the right answer points will be stored at
    points: 0,

    // state where highest score will be stored
    highestScore: null,

    // define state to store secondsRemaining
    secondsRemaining: 10,
};

// We use a discriminated union for the action type to ensure TypeScript correctly infers the expected payload for each action, making the reducer safer and more maintainable.
// Define all possible action types. and this is the same as the OR operation
// the "type" case must be the same as the "ActionType" defined. because it's strict
// By using discriminated unions with string literal types, we can ensure that the "type" property only accepts specific string values such as "dataReceived". This improves type safety by preventing invalid actions and catching errors early during development.
export type ActionType =
    | { type: "dataReceived"; payload: Questions[] }
    | { type: "dataFailed" }
    | { type: "start" }
    | { type: "new"; payload: number }
    | { type: "next" }
    | { type: "finish" }
    | { type: "restart" }
    | { type: "ticking" };

// function for set state
const reducer = (state: InitialState, action: ActionType) => {
    switch (action.type) {
        // when the data done fetching
        case "dataReceived":
            return {
                ...state,

                // reducer must always return updated value or initial state
                questions: action.payload || [],
                status: "ready",
            };

        // when the data failed to be fetching
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };

        // case when the quiz start
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };

        // case when to adding new
        case "new":
            // assign "question" to "questions" specified value property that's the same as the current index (which is the current question)
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,

                // return new value for points depends on the user answer
                points:
                    action.payload === question?.correctOption
                        ? state.points + (question.points ?? 0)
                        : state.points,
            };

        // case to handle next question by incrementing the "state.index" value
        case "next":
            return {
                ...state,
                index: state.index++,
                answer: null,
            };

        // case to handle status and highest score logic
        case "finish":
            return {
                ...state,
                status: "finished",
                highestScore:
                    state.points >= (state.highestScore ?? state.points)
                        ? state.points
                        : state.highestScore,
            };

        // case to handle restart quiz and resetting the state
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };
        // we can use this logic either
        // return {
        //     ...state,
        //     status: "ready",
        //     index: 0,
        //     answer: null,
        //     points: 0,
        //     secondsRemaining: 10,
        // };

        // case to handle decreasing time state remaining
        case "ticking":
            return {
                ...state,
                secondsRemaining:
                    state.secondsRemaining === 0
                        ? 0
                        : state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
                highestScore:
                    state.points >= (state.highestScore ?? state.points)
                        ? state.points
                        : state.highestScore,
            };

        // always put the default return here
        default:
            return state;
    }
};

const App = () => {
    // reducer state for stored data
    // "questions", "status" n "index" destructuring immediately after declaring useReducer
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highestScore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    // const { questions, status, index, answer } = state;

    // derived state for sum of all questions
    const totalQuestions = questions.length;

    // derived state for sum of maximum user points can gain
    const totalMaxPoints = questions
        .map((item) => item.points)
        // nullish coalleshing for preventing from undefined possible value
        .reduce((acc, num) => (acc ?? 0) + (num ?? 0), 0);

    // effect for fetching some data from our "hand made" json api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/questions");
                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                dispatch({ type: "dataReceived", payload: data });
            } catch (error) {
                // set status : 'error' if there's an error when fetching data
                dispatch({ type: "dataFailed" });
                console.log(error);
            } finally {
                console.log("fetching done...");
            }
        };
        fetchData();
    }, []);
    return (
        <div className="app">
            {/* ur logic here */}
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <ErrorLoad />}
                {status === "ready" && (
                    <StartScreen
                        totalQuestions={totalQuestions}
                        // We use `() => dispatch({ type: "start" })` instead of `dispatch({ type: "start" })` directly to prevent the function from being executed immediately during rendering. If we pass `dispatch({ type: "start" })` directly, it will be called as soon as the component renders, instead of when the event (like a button click) actually occurs. Wrapping it inside an arrow function delays execution until the event triggers.
                        // or we can actually just passed the "dispatch" without any arguments on it
                        // The actual `dispatch` call will still happen when the event occurs, avoiding unnecessary execution during rendering.
                        dispatch={dispatch} // The dispatch function passed to StartScreen comes from useReducer.
                        // Unlike a regular function, dispatch sends an action object to the reducer to update state.
                        // This ensures structured state management and prevents unnecessary re-renders.
                        // Using a regular function instead would bypass useReducer’s control over state changes.
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            totalQuestions={totalQuestions}
                            points={points}
                            totalMaxPoints={totalMaxPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                answer={answer}
                                dispatch={dispatch}
                                totalQuestions={totalQuestions}
                                index={index}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        totalMaxPoints={totalMaxPoints}
                        highestScore={highestScore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
};
export default App;
