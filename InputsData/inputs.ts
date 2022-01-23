import {InputProps} from "../components/Inputs/Input/Input";

export const myFormInputs: Array<InputProps> = [
    {
        type: 'email',
        placeholder: 'Введите почту',
        name: 'email',
        label: 'Email',
        grid: "1/2",
        options: {maxLength: {value: 20, message: 'Макс длина 20'}, minLength: {value: 5, message: 'Мин длина 5'}, required: {value: true, message: 'required'}},
        validation: {
            validate: (value: string) => {
                let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                return {result: re.test(String(value).toLowerCase()), message: 'Валидация не пройдена'}
            },
        }
    },
    {
        type: 'tel',
        placeholder: 'Введите телефон',
        name: 'phone',
        label: 'Телефон',
        grid: "2/4",
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        options: {required: {value: true, message: 'required'}},
    },
    {
        type: 'date',
        placeholder: 'Введите дату',
        name: 'date',
        label: 'Дата рождения',
        grid: "1/4"
    },
    {
        type: 'password',
        placeholder: 'Введите пароль',
        name: 'password',
        label: 'Пароль',
        grid: "1/4",
        validation: {
            validate: (value: string) => {
                let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                return {result: re.test(String(value).toLowerCase()), message: 'Валидация не пройдена'}
            }
        },
        options: {maxLength: {value: 20, message: 'Макс длина 20'}, minLength: {value: 5, message: 'Мин длина 5'}},
    },
    {
        type: 'text',
        drop: true,
        dropData: [1, 2, 3, 4],
        placeholder: 'Выберите из списка',
        name: 'list',
        label: 'Выпадающий список',
        grid: "1/4",
    },
]

export const myHookFormInputs = [
    {
        type: 'text',
        placeholder: 'Введите имя',
        name: 'firstName',
        label: 'Имя',
        grid: "1/2",
        options: { required: "This is required.", maxLength: 20 }
    },
    {
        type: 'text',
        placeholder: 'Введите фамилию',
        name: 'lastName',
        label: 'Фамилия',
        grid: "2/4",
        options: { pattern: {value: /^[A-Za-z]+$/i, message: 'Only Eng'}}
    },
    {
        type: 'number',
        placeholder: 'Введите возраст',
        name: 'age',
        label: 'Возраст',
        grid: "1/4",
        options: { min: {value: 18, message: 'min is 18'}, max: {value: 99, message: 'max is 99'} }
    }
]