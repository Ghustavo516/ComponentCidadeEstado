export class Estado {

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

    getNameEstado(){
        return this.sigla + " - " + this.nome
    }
}
