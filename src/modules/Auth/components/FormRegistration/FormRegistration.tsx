import classes from "./FormRegistration.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { Input } from "../../../../ui/Input/Input.tsx";

export const FormRegistration = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <label htmlFor="">Login</label>
                <Input type={"text"}/>
            </div>
            <div className={classes.inputWrapper}>
                <label htmlFor="">Password</label>
                <Input type={"password"}/>
            </div>
            <Button style={{margin: "5px 0"}} type={"submit"}>Log In</Button>
        </div>
    )
}