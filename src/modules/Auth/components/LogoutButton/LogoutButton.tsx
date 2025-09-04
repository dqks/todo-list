import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./LogoutButton.module.css"
import { authAPI } from "../../api/api.ts";

export const LogoutButton = () => {
    const [logout] = authAPI.useLogoutMutation()

    const logoutHandler = () => {
        logout()
    }

    return (
        <div className={classes.buttonWrapper}>
            <Button onClick={logoutHandler}>Logout</Button>
        </div>
    )
}