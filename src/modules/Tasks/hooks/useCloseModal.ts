import { useAppDispatch } from "../../../hooks/redux.ts";
import { useEffect } from "react";
import type { UnknownAction } from "redux";

export const useCloseModal = (callback: () => UnknownAction) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const clickHandler = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                dispatch(callback())
            }
        }
        document.addEventListener("keyup", clickHandler)
        return () => {
            document.removeEventListener("keyup", clickHandler)
        }
    }, [dispatch, callback]);
}