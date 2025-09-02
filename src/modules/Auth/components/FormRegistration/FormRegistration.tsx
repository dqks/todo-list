import classes from "./FormRegistration.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { Input } from "../../../../ui/Input/Input.tsx";
import { Controller, useForm } from "react-hook-form";
import { authAPI } from "../../api/api.ts";

export const FormRegistration = () => {
    const {
        formState: {errors},
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        }})

    const [login] = authAPI.useLoginMutation()
    const onSubmit = (data: any) => {
        login(data)
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.wrapper}>
            <h1 className={classes.authTitle}>You're not <br/> authorized</h1>
            <div className={classes.inputWrapper}>
                <label htmlFor="login">Login</label>
                <Controller
                    name={"email"}
                    control={control}
                    render={({field}) =>
                        <Input id={"email"} type={"text"} {...field}/>
                    }/>
            </div>
            <div className={classes.inputWrapper}>
                <label htmlFor="password">Password</label>
                <Controller
                    name={"password"}
                    control={control}
                    render={({field}) =>
                        <Input {...field} id={"password"} type={"password"}/>
                    }/>
            </div>
            <div className={classes.checkboxWrapper}>
                <label htmlFor="rememberMe">Remember me</label>
                <Controller
                    name={"rememberMe"}
                    control={control}
                    render={({field}) =>
                        <Input {...field} id={"rememberMe"} type={"checkbox"}/>
                    }/>
            </div>
            <Button style={{margin: "5px 0"}} type={"submit"}>Log In</Button>
        </form>
    )
}