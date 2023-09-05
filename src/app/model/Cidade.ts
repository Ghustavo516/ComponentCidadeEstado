export class Cidade {
    //Estrutura de dados dos municipios
    id?: number;
    nome?: string;

    constructor(municipiosIBGE?: any){
        if(municipiosIBGE){
            this.id = municipiosIBGE.id;
            this.nome = municipiosIBGE.nome;
        }
    }
}
