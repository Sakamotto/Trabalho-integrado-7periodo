export class Cliente {
    id: number;
    nome: string; // required
    sobrenome: string;
    senha: string;
    dataNascimento: string;
    dataCadasto: string;
    ativo: boolean;
    cpf: string;
    email: string;
    celular: string;
    telefone: string;
    cep: string;
    endereco: Endereco = new Endereco();
}

export class Endereco {
    cep: string; // REQUIRED
    bairro: string;
    cidade: string;
    estado: string;
    rua: string;
    uf: string;
}
