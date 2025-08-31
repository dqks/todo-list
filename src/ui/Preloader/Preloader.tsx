import preloader from "../../assets/pageloader.gif"
import type { CSSProperties } from "react";

type PreloaderProps = {
    style?: CSSProperties
}

export const Preloader = ({style} : PreloaderProps) => {
    return (
        <img style={style} src={preloader} alt="preloader" />
    )
}