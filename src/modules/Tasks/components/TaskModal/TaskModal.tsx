import { Modal } from "../../../../ui/Modal/Modal.tsx";
import { Input } from "../../../../ui/Input/Input.tsx";
import type { CSSProperties } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./TaskModal.module.css"
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { setSelectedTask } from "../../store/slice.ts";

type TaskModalProps = {
    taskText: string;
}

const TaskModelCSS = {
    width: "500px",
    height: "400px",
    justifyContent: "center",
} as CSSProperties

type FormDataType = {
    taskText: string;
}

export const TaskModal = ({taskText}: TaskModalProps) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            taskText: taskText,
        }
    })
    const dispatch = useAppDispatch();

    const onSubmit = (data: FormDataType) => {
        console.log(data)
        dispatch(setSelectedTask(null))
    }

    const onButtonClick = () => {
        dispatch(setSelectedTask(null))
    }

    return (
        <Modal contentStyle={TaskModelCSS}>
            <form className={classes.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                <Button
                    style={{position: "relative", bottom: "40px", left: "260px"}}
                    onClick={onButtonClick}
                >
                    &#10006;
                </Button>
                <h1>Edit Task</h1>
                <p className={classes.taskText}>Task Text</p>
                <Controller
                    name={"taskText"}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field}) =>
                        <Input type="text" {...field}/>
                    }/>
                <Button type="submit">Edit</Button>
            </form>
        </Modal>
    )
}