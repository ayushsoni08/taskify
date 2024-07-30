"use client";

import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

export const Form = () => {

    const {execute, fieldErrors} = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data, "SUCCESS!");
        },
        onError: (error) => {
            console.error(error);
            
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        execute({title});
    }

    return (
        <form action={onSubmit}>
            <FormInput errors={fieldErrors} />
            <FormButton />
        </form>
    );
}