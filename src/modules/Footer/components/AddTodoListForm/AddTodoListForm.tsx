import { Input } from "../../../../ui/Input/Input.tsx";
import { Button } from "../../../../ui/Button/Button.tsx";
import { footerApi } from "../../api/api.ts";
import { Controller, useForm } from "react-hook-form";

type FormDataType = {
    taskText: string
}

export const AddTodoListForm = () => {
    const [createTask] = footerApi.useCreateTaskMutation()
    const {handleSubmit, control, reset} = useForm({
        defaultValues: {
            taskText: "",
        }
    })

    const onSubmit = (data: FormDataType) => {
        createTask({title: data.taskText})
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name={"taskText"}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field}) =>
                        <Input type={"text"} {...field}/>
                    }/>
            </div>
            <Button type="submit">Add</Button>
        </form>
    )
}