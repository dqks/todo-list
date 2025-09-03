import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./LogoutButton.module.css"

export const LogoutButton = () => {
    return (
        <div className={classes.buttonWrapper}>
            <Button>Logout</Button>
        </div>
    )
}