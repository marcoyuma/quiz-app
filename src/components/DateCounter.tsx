import { ChangeEvent, useReducer } from "react";

// useState for managing step value as a number to define increment/decrement steps dynamically
const initialState = { count: 0, step: 1 };

// Reducer function to manage state changes
// The state is represented as a number because it directly maps to a numerical count value.
// This approach simplifies operations like increment, decrement, and setting a specific value.
const reducer = (
    state: { count: number; step: number },
    action: { type: string; payload?: number }
) => {
    console.log(state, action);
    switch (action.type) {
        // Increases the count by the payload value or default step if no payload is provided
        case "increment":
            return {
                // Using ...state ensures that we keep all existing properties in the state while only updating the specified property. Without it, other properties (like 'step') would be lost when updating 'count'.
                ...state,
                // simpler logic, "count: state.count + state.step"
                count: state.count + 1 * state.step, // but this here just more clear
            };

        // Decreases the count by the payload value or default step if no payload is provided
        case "decrement":
            return {
                ...state,
                count: state.count - 1 * state.step,
            };

        // Resets both count and step to their initial values
        case "reset":
            return { count: 0, step: 1 };

        // Sets count to the payload value, if provided
        case "setCount":
            return {
                ...state,
                // using nullish coalescing for step property: using 0 as value if "action.payload" is undefined
                count: action.payload ?? 0,
            };

        // Updates the step value based on the payload
        case "setStep":
            return {
                ...state,
                // using nullish coalescing for step property: using 1 as value if "action.payload" is undefined
                step: action.payload ?? 1,
            };

        // Always return the current state if action type is not recognized
        default:
            return state;
    }
};

function DateCounter() {
    // useReducer for managing count state as a number because it's a numeric counter,
    // allowing easy mathematical operations (addition, subtraction, reset, etc.)
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    // const [step, setStep] = useState(1);

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    // Function to decrease the count
    // The payload is set as 1 to ensure consistent step-wise decrements
    const dec = function () {
        // // setCount((count) => count - 1);
        // setCount((count) => count - step);
        dispatch({ type: "decrement" });
    };

    // Function to increase the count
    // The payload is set as 1 to increment the count by a defined step amount
    const inc = function () {
        // // setCount((count) => count + 1);
        // setCount((count) => count + step);
        dispatch({ type: "increment" });
    };

    // Function to set a specific count value from input
    // The input value is always a string, so it must be converted to a number
    const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
        // setCount(Number(e.target.value));
        dispatch({ type: "setCount", payload: Number(e.target.value) });
    };

    // Function to update step value (currently not used)
    // Step is a number because it defines how much the count should increment or decrement
    const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
        // setStep(Number(e.target.value));
        dispatch({ type: "setStep", payload: Number(e.target.value) });
    };

    const reset = function () {
        // setCount(0);
        // setStep(1);
        dispatch({ type: "reset" });
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
