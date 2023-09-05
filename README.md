# Documentação do Projeto ComponentCidadeEstado

## Introdução

O projeto ComponentCidadeEstado é um exemplo que demonstra como utilizar o DevExtreme com o Angular para criar um componente de seleção de estado e cidade interativo. Este documento fornece informações sobre como configurar e utilizar esse componente, bem como detalhes sobre suas funcionalidades.

## Pré-requisitos

Antes de começar a utilizar o ComponentCidadeEstado, certifique-se de que sua máquina atende aos seguintes pré-requisitos:

1. **Node.js**: É necessário ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. **Angular CLI**: O Angular CLI é necessário para criar e gerenciar projetos Angular. Você pode instalá-lo executando o seguinte comando no terminal:

   ```bash
   npm install -g @angular/cli
   ```

## Instalação

Siga as etapas abaixo para configurar e utilizar o ComponentCidadeEstado em seu projeto:

### 1. Clone o Repositório

```bash
git clone https://github.com/Ghustavo516/ComponentCidadeEstado.git
```

### 2. Instale o pacote DevExtreme para o Angular

O ComponentCidadeEstado utiliza a biblioteca DevExtreme. Você pode instalá-la executando o seguinte comando:

```bash
npx -p devextreme-cli devextreme add devextreme-angular
```

### 3. Inicie o Servidor de Desenvolvimento

Com todas as dependências instaladas, você pode iniciar o servidor de desenvolvimento do Angular com o seguinte comando:

```bash
ng serve
```

Isso iniciará o servidor de desenvolvimento e você poderá acessar o aplicativo em seu navegador visitando **http://localhost:4200**.

## Utilização do Componente

O ComponentCidadeEstado é um componente Angular personalizado que permite selecionar um estado e uma cidade a partir de listas suspensas interativas. Aqui estão as principais funcionalidades e instruções de uso:

### Tabela de Valores de Estado

O ComponentCidadeEstado inclui uma tabela com os valores de `id`, `UF` e `Label` para definir o valor de estado padrão. Essa tabela pode ser encontrada no arquivo Markdown ou diretamente no código-fonte do projeto.

### Configuração do Componente

Para usar o ComponentCidadeEstado em seu projeto, você deve adicioná-lo a um componente Angular da seguinte maneira:

```angular
<app-cidade-estado 
  labelEstado="Estado" 
  labelCidade="Cidade"
  (estadoSelecionadoValue)="receberEstadoSelecionado($event)"
  (cidadeSelecionadaValue)="receberCidadeSelecionada($event)"
  estadoPadrao="SP"
  cidadePadrao="Várzea Paulista"
></app-cidade-estado>
```

- `labelEstado`: Define o título do seletor de estado. Você pode personalizar o título conforme necessário.

- `labelCidade`: Define o título do seletor de cidade. Personalize-o de acordo com sua preferência.

- `(estadoSelecionadoValue)`: Recebe o valor selecionado do estado quando o usuário faz uma seleção no seletor de estado. 

- `(cidadeSelecionadaValue)`: Recebe o valor selecionado da cidade quando o usuário faz uma seleção no seletor de cidade. 

- `estadoPadrao`: Define o valor de estado padrão. Neste exemplo, o valor padrão é definido como SP - São Paulo. Personalize-o conforme necessário.
- `cidadePadrao`: Define o valor de cidade padrão. Neste exemplo, o valor padrão é definido como Várzea Paulista

| id | UF | Label               |
|----|----|---------------------|
| 0  | AC | AC - Acre           |
| 1  | AL | AL - Alagoas        |
| 2  | AP | AP - Amapá          |
| 3  | AM | AM - Amazonas       |
| 4  | BA | BA - Bahia          |
| 5  | CE | CE - Ceará          |
| 6  | DF | DF - Distrito Federal |
| 7  | ES | ES - Espírito Santo |
| 8  | GO | GO - Goiás          |
| 9  | MA | MA - Maranhão       |
| 10 | MT | MT - Mato Grosso    |
| 11 | MS | MS - Mato Grosso do Sul |
| 12 | MG | MG - Minas Gerais   |
| 13 | PA | PA - Pará           |
| 14 | PB | PB - Paraíba        |
| 15 | PR | PR - Paraná         |
| 16 | PE | PE - Pernambuco     |
| 17 | PI | PI - Piauí          |
| 18 | RJ | RJ - Rio de Janeiro |
| 19 | RN | RN - Rio Grande do Norte |
| 20 | RS | RS - Rio Grande do Sul |
| 21 | RO | RO - Rondônia       |
| 22 | RR | RR - Roraima        |
| 23 | SC | SC - Santa Catarina |
| 24 | SP | SP - São Paulo      |
| 25 | SE | SE - Sergipe        |
| 26 | TO | TO - Tocantins      |


### Personalização

Você pode personalizar o ComponentCidadeEstado ajustando os títulos dos seletores de estado e cidade, bem como o valor padrão do estado.

## Conclusão

O ComponentCidadeEstado é um exemplo simples, mas prático, de como integrar o DevExtreme com o Angular para criar seletores interativos de estado e cidade. Siga as etapas de instalação e configuração para incorporar esse componente em seu projeto e personalize-o de acordo com suas necessidades.
