import { FC, ReactNode } from "react";

type mainProps = {
    children: ReactNode;
};

export const Main: FC<mainProps> = ({ children }) => {
    return <main className="main">{children}</main>;
};
