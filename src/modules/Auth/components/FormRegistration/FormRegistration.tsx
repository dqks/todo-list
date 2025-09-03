import classes from "./FormRegistration.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { Input } from "../../../../ui/Input/Input.tsx";
import { Controller, useForm } from "react-hook-form";
import { authAPI, type LoginRequest } from "../../api/api.ts";
import { useSelector } from "react-redux";
import { getCaptchaUrl } from "../../store/selectors.ts";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { getCaptcha } from "../../store/slice.ts";

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
            captcha: ""
        }})
    const [login] = authAPI.useLoginMutation()
    const captchaUrl = useSelector(getCaptchaUrl)
    const dispatch = useAppDispatch();

    const onSubmit = (data: LoginRequest) => {
        login(data).then((response) => {
            if (response.data?.resultCode === 10) {
                dispatch(getCaptcha())
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.wrapper}>
            <h1 className={classes.authTitle}>You're not <br/> authorized</h1>
            <div className={classes.inputWrapper}>
                <label htmlFor="login">Email</label>
                <Controller
                    name={"email"}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field}) =>
                        <Input id={"email"} type={"text"} {...field}/>
                    }/>
                {errors?.email && <p className={classes.errorText}>Email is required</p>}
            </div>
            <div className={classes.inputWrapper}>
                <label htmlFor="password">Password</label>
                <Controller
                    name={"password"}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field}) =>
                        <Input {...field} id={"password"} type={"password"}/>
                    }/>
                {errors?.password && <p className={classes.errorText}>Password is required</p>}
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
            {captchaUrl && (
                <div className={classes.captchaWrapper}>
                    <img className={classes.captchaImg} src={captchaUrl} alt="Captcha Image"/>
                    <Controller
                        control={control}
                        name={"captcha"}
                        render={({field}) =>
                            <Input {...field} id={"captcha"} type={"text"}/>
                        }/>
                </div>
            )}
            <Button style={{margin: "5px 0"}} type={"submit"}>Log In</Button>
        </form>
    )
}