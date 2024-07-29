"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
    errors? : {
        title?: string[];
    }
};

export const FormInput = ({errors}: FormInputProps) => {

    const { pending } = useFormStatus();

    return (
        <div className="flex flex-col space-y-2">
            <Input
                placeholder="Enter a board title" 
                name="title" 
                id="title" 
                required
                disabled={pending}
            />
            {errors?.title?.map((error) => (
                <p key={error} className="text-rose-500">
                    {error}
                </p>
            ))}
        </div>
    )
}