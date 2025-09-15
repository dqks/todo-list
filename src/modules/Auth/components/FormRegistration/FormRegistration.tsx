import classes from "./FormRegistration.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { Input } from "../../../../ui/Input/Input.tsx";
import { Controller, useForm } from "react-hook-form";
import { authAPI } from "../../api/api.ts";
import { useState } from "react";

type DefaultValues = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
    generalError: string;
}

export const FormRegistration = () => {
    const {
        formState: {errors},
        handleSubmit,
        control,
        setError
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: "",
            generalError: ""
        }
    })
    const [login] = authAPI.useLoginMutation()
    const [skip, setSkip] = useState(true);
    const {data: captcha, } = authAPI.useGetCaptchaQuery(undefined, {skip})

    const onSubmit = (data: DefaultValues) => {
        const payload = {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha,
        }
        console.log(
            captcha
        )
        login(payload).then(response => {
            if (response.data?.resultCode === 1) {
                setError("generalError",
                    {type: "server", message: response.data?.messages.join("/n")})
            } else if (response.data?.resultCode === 10) {
                setSkip(false);
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
            {captcha?.url && (
                <div className={classes.captchaWrapper}>
                    <img className={classes.captchaImg} src={captcha?.url} alt="Captcha Image"/>
                    <Controller
                        control={control}
                        name={"captcha"}
                        render={({field}) =>
                            <Input {...field} id={"captcha"} type={"text"}/>
                        }/>
                </div>
            )}
            <Button style={{margin: "5px 0"}} type={"submit"}>Log In</Button>
            {errors.generalError && (
                <div>
                    <p className={classes.errorText}>
                        {errors.generalError.message}
                    </p>
                </div>
            )}
        </form>
    )
}