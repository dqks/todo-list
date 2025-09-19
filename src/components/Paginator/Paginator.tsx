import { memo, useEffect, useState } from "react";
import classes from "./Paginator.module.css"
import { Button } from "../../ui/Button/Button.tsx";

type PaginatorProps = {
    totalTasksCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    setCurrentPage: (page: number) => void // action creator
}

export const Paginator = memo(({
    totalTasksCount,
    pageSize,
    currentPage,
    portionSize,
    setCurrentPage
} : PaginatorProps) => {
    useEffect(() => {
        setCurrentPortion(Math.ceil(currentPage / portionSize))
    }, [currentPage, portionSize]);

    const totalPageAmount = Math.ceil(totalTasksCount / pageSize);

    const portionCount = Math.ceil(totalPageAmount / portionSize);

    const [currentPortion, setCurrentPortion] = useState<number>(1);
    const currentLeftBorder = (currentPortion - 1) * portionSize + 1;
    const currentRightBorder = currentPortion * portionSize;

    const pages: number[] = []
    for (let i = currentLeftBorder; i <= currentRightBorder; i++) {
        pages.push(i);
    }

    const onPreviousPageButtonClick = () => {
        if (currentPortion - 1 < 1) {
            return;
        }
        setCurrentPortion((value) => value - 1);
    }

    const onNextPageButtonClick = () => {
        if (currentPortion === portionCount) {
            return;
        }
        setCurrentPortion((value) => value + 1);
    }

    return (
        <div className={classes.wrapper}>
            {currentPortion !== 1 && <Button onClick={onPreviousPageButtonClick}>&larr;</Button>}
            {
                pages
                .filter((page) => page <= totalPageAmount)
                .map(page => <span key={page}
                    onClick={() => setCurrentPage(page)}
                    className={[currentPage === page && classes.selectedPage, classes.pageNumber].join(' ')}>{page}</span>)
            }
            {currentPortion !== portionCount && <Button onClick={onNextPageButtonClick}>&rarr;</Button>}
        </div>
    )
})