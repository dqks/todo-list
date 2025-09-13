import { Modal } from "../../../../ui/Modal/Modal.tsx";
import { Input } from "../../../../ui/Input/Input.tsx";
import { type CSSProperties } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./TodoListModal.module.css"
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { todoListIsEdited } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { useCloseModal } from "../../hooks/useCloseModal.ts";

type TodoListModalProps = {
    todoListTitle: string;
    todoListId: string;
}

const TodoListModalCSS = {
    width: "500px",
    height: "300px",
    justifyContent: "center",
} as CSSProperties

type FormDataType = {
    todoListTitle: string;
}

export const TodoListModal = ({todoListTitle, todoListId}: TodoListModalProps) => {
    const [editTodoList] = tasksAPI.useEditTodoListTitleMutation()
    const [deleteTodoList] = tasksAPI.useDeleteTodoListMutation()
    const dispatch = useAppDispatch();

    useCloseModal(() => todoListIsEdited (null))

    const {control, handleSubmit} = useForm({
        defaultValues: {
            todoListTitle: todoListTitle,
        }
    })
    const onSubmit = (data: FormDataType) => {
        editTodoList({
            todoListId: todoListId,
            title: data.todoListTitle,
        })
        dispatch(todoListIsEdited(null))
    }

    const closeModalHandler = () => {
        dispatch(todoListIsEdited(null))
    }

    const onDeleteClick = () => {
        deleteTodoList(todoListId)
        dispatch(todoListIsEdited(null))
    }

    return (
        <Modal onOutsideClick={closeModalHandler} contentStyle={TodoListModalCSS}>
            <form className={classes.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                <Button
                    style={{position: "relative", bottom: "40px", left: "260px"}}
                    onClick={closeModalHandler}
                >
                    &#10006;
                </Button>
                <h1>Edit TODO List</h1>
                <Controller
                    name={"todoListTitle"}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field}) =>
                        <Input type="text" {...field}/>
                    }/>
                <Button type="submit">Edit</Button>
                <Button onClick={onDeleteClick}
                    type="button"
                    style={{border: "1px solid red"}}
                >
                    Delete TODO List
                </Button>
            </form>
        </Modal>
    )
}