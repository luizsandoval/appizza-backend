import { cpf } from 'cpf-cnpj-validator';

const CPFValidator = (value: string) => (cpf.isValid(value)
    ? value
    : 'Invalid CPF'
);

export default CPFValidator;
