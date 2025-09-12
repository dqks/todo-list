import type { CSSProperties, ReactNode } from "react";
import { Preloader } from "../../ui/Preloader/Preloader.tsx";

type PreloaderWrapperProps = {
    isFetching: boolean
    preloaderStyle: CSSProperties
    children: ReactNode;
}

export const PreloaderWrapper = ({isFetching, preloaderStyle, children}: PreloaderWrapperProps) => {
    return (
        <>
            {
                isFetching
                    ? <Preloader style={preloaderStyle}/>
                    : children
            }
        </>
    )
}