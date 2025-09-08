import { Controller, useForm } from "react-hook-form";
import { Input } from "../../ui/Input/Input.tsx";
import { Button } from "../../ui/Button/Button.tsx";

type AddElementFormProps = {
    createElement: (text: { title: string }) => void;
}

type FormDataType = {
    text: string
}

export const AddElementForm = ({createElement}: AddElementFormProps) => {
    const {handleSubmit, control, reset} = useForm({
        defaultValues: {
            text: "",
        }
    })

    const onSubmit = (data: FormDataType) => {
        createElement({title: data.text})
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name={"text"}
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