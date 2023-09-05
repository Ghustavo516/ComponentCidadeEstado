export class Estado {
     //Estrutura de dados dos estados
    id?: number;
    sigla?: string;
    nome?: string;

    constructor(estadoIBGE?: any){
        if(estadoIBGE){
            this.id = estadoIBGE.id; 
            this.sigla = estadoIBGE.sigla;
            this.nome = estadoIBGE.nome;
        }
    }

    //Metodo para concatenar a sigla com o nome
    getNameEstado(){
        return this.sigla + " - " + this.nome
    }
}
