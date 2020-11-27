import { cnpj } from 'cpf-cnpj-validator';

const CNPJValidator = (value: string) => (cnpj.isValid(value)
    ? value
    : 'Invalid CNPJ'
);

export default CNPJValidator;
