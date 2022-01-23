import React, { useRef } from "react";
import Input, { InputProps } from "../../Inputs/Input/Input";

import styles from "../../style.module.css"


interface FormProps {
    gap?: string
    padding?: string
    button: string
    inputs: any
}


const Form: React.FC<FormProps> = ({gap, padding, button, inputs}) => {
    const refs: any = useRef(Array.from({length: inputs.length}, a => React.createRef()));

    const handleSubmit = (e: any) => {
        e.preventDefault()

        let data: any = {}
        let isErrors = false

        refs.current.map((ref: any) => {
            ref.current.setRequiredError()

            const {name, value, required} = ref.current.getData()

            data[name] = value

            !ref.current.isErrors() && (isErrors = true)
        })

        if(!isErrors) {
            alert('Форма отправлена')
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate={true}
            className={styles.form}
            style={{
                display: 'grid',
                gap: gap || '10px',
                padding: padding || '20px 0'}}
        >
            {inputs.map((input: InputProps, index: number) =>
                <Input
                    {...input}
                    ref={refs.current[index]}
                    key={input.name}
                />
            )}
            <input className={styles.submit} type='submit' value={button} />
        </form>
    );
}

export default Form;