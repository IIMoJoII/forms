import React from 'react'
import { useForm } from "react-hook-form";
import Input from "../../Inputs/HookInput/Input";

import styles from "../../style.module.css";


interface HookFormProps {
    gap?: string
    padding?: string
    button: string
    inputs?: any
    errors?: any
}

const HookForm: React.FC<HookFormProps> = ({gap, padding, inputs, button}) => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = (data: any) => {
        console.log(data)
        alert('Форма отправлена')
    };

    return (
        <form
            style={{
                display: 'grid',
                gap: gap || '10px',
                padding: padding || '20px 0'
            }}
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}>
            {inputs?.map((input: any) =>
                <Input
                    key={input.name}
                    register={register}
                    errors={errors[input.name]}
                    {...input}
                />
            )}
            <input className={styles.submit} type="submit" value={button} />
        </form>
    );
}

export default HookForm;