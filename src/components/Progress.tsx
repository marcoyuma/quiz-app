export const Progress = ({
    index,
    totalQuestions,
    points,
    totalMaxPoints,
    answer,
}: {
    index: number;
    totalQuestions: number;
    points: number;
    totalMaxPoints: number | undefined;
    answer: null | number;
}) => {
    return (
        <header className="progress">
            <progress
                max={totalQuestions}
                value={index + Number(answer !== null)}
            />
            <p>
                Question <strong>{index + 1}</strong> / {totalQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {totalMaxPoints}
            </p>
        </header>
    );
};
