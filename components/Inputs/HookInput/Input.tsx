import React, { forwardRef } from 'react'

import styles from '../../style.module.css';


export interface InputProps {
    name: string
    register: any
    grid: string
    options?: any
    type?: string
    label?: string
    errors?: any
    placeholder?: string
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
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
                <input
                    {...props.register(props.name, props.options)}
                    type={props.type || 'text'}
                    placeholder={props.placeholder}
                    className={`${styles.input} ${props.errors && styles.inputError}`}
                />
                {props.errors?.message && <div className={styles.error}>{props.errors?.message}</div>}
            </div>
        </div>
    )
}

export default forwardRef(Input)