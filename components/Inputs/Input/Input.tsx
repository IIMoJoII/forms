import React, { forwardRef, useState, useImperativeHandle } from 'react'

import styles from "../../style.module.css"


export interface InputProps {
    name: string
    drop?: boolean
    dropData?: Array<any>
    label?: string
    type?: 'tel' | 'date' | 'text' | 'email' | 'password'
    placeholder?: string
    grid?: string
    pattern?: string
    validation?: {
        validate: any
    },
    noErrorMessage?: boolean
    options?: {
        required?: {
            value?: boolean
            message?: string
        }
        maxLength?: {
            value?: number
            message?: string
        },
        minLength?: {
            value?: number
            message?: string
        }
    }
}


const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const [showError, setShowError] = useState(false)
    const [showDrop, setShowDrop] = useState(false)
    const [requiredError, setRequiredError] = useState('')

    useImperativeHandle<any, any>(ref, () => ({
        setRequiredError() {
            !value.length && props.options?.required?.value &&
                setRequiredError(props.options.required.message || '')
        },
        getData() {
            return {name: props.name, value}
        },
        getErrors() {
            return {error, requiredError}
        },
        isErrors() {
            if(props.options?.required?.value && !value.length) return false
            return !error
        }
    }));

    const checkLength = (e: any) => {
        props.options?.maxLength &&
        (e.target.maxLength <= e.target.value.length) &&
        setError(props.options?.maxLength?.message || '')

        props.options?.minLength &&
        e.target.minLength > e.target.value.length &&
        setError(props.options?.minLength?.message || '')
    }

    const handleValidation = (e: any) => {
        const {result, message} = props.validation?.validate(e.target.value)

        !result ?
            setError(message || (props.noErrorMessage ? 'error' : '')) :
            setError('')
    }

    const resetErrors = () => {
        setError('')
        setShowError(false)
    }

    const handleInput = (e: any) => {
        props.validation?.validate && e.target.value && handleValidation(e)
        e.target.value && checkLength(e)
        !e.target.value && resetErrors()
        e.target.value.length && setRequiredError('')

        setValue(e.target.value)
    }

    const showErrorFunc = () => {
        error ? setShowError(true) : setShowError(false)
    }

    const choseItem = (data: any) => {
        setShowDrop(false)
        setValue(data)
    }

    React.useEffect(() => {
        const timeOutId = setTimeout(() => showErrorFunc(), 1000);
        return () => clearTimeout(timeOutId);
    }, [value]);

    return (
        <div
            style={{
                gridColumn: props.grid,
                position: "relative",
                marginTop: 5
            }}
        >
            <div className={styles.inputWrapper}>
                {props.label &&
                    <label
                        className={styles.label}
                    >{props.label}
                    </label>
                }
                {!props.drop && <input
                    maxLength={props.options?.maxLength?.value}
                    minLength={props.options?.minLength?.value}
                    pattern={props.pattern}
                    required={Boolean(props.options?.required)}
                    onChange={handleInput}
                    ref={ref}
                    className={`${styles.input} ${((error && showError) || requiredError) && styles.inputError}`}
                    placeholder={props.placeholder}
                    type={props.type || 'text'}
                    name={props.name}
                />}
                {props.drop &&
                    <div className={styles.dropWrapper}>
                        <input
                            ref={ref}
                            autoComplete='off'
                            name={props.name}
                            placeholder={props.placeholder}
                            className={`${styles.input}`}
                            onClick={() => setShowDrop(!showDrop)}
                            value={value}
                        />
                        <ul className={styles.drop}>
                            {showDrop && props.dropData?.map((data: any, index) =>
                                <li
                                    key={index}
                                    onClick={() => choseItem(data)}
                                >{data}
                                </li>
                            )}
                        </ul>
                    </div>
                }
                {error && showError && !props.noErrorMessage && !requiredError &&
                    <div
                        className={styles.error}
                    >{error}
                    </div>
                }
                {requiredError && !props.noErrorMessage &&
                    <div
                        className={styles.error}
                    >{requiredError}
                    </div>
                }
            </div>
        </div>
    )
}

export default forwardRef(Input)