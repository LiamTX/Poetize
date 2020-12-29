# Poetize

![readme_image](https://github.com/LiamTX/Poetize/blob/devel/src/assets/images/readme/readme_.png)

## Sobre este projeto
A ideia do web app é:

"Compartilhar poemas em uma plataforma online de forma rápida e fácil"

Este projeto faz parte do meu portifólio pessoal, então, ficarei feliz se você pudesse me fornecer algum feedback sobre o projeto, código, estrutura ou qualquer coisa que possa me torar um dev melhor.

Email-me: liamcabral88@gmail.com

Se conecte comigo no [LinkedIn](www.linkedin.com/in/liamcabralteixeira)

Link do projeto em produção: (https://poetize.netlify.app/#/)

## Getting Started
### Pré-requisitos
Para executar este projeto no modo de desenvolvimento, você precisara ter um ambiente basico para executar um web app Vue, que pode ser encontrado [aqui](https://vuejs.org/v2/guide/#Getting-Started) 

Além disso, você precisará do poetize-server rodando localmente em sua máquina. Você pode encontrar o servidor e todos os passos para incia-lo [aqui](https://github.com/LiamTX/poetize-server)

### Instalação
#### Clonando o repositório
```
$ git clone https://github.com/LiamTX/Poetize.git
$ cd Poetize
```

#### Instalando dependências
```
$ yarn
```

ou

```
npm install
```

### Conectando o web app com o servidor
1 - Siga as instruções do [poetize-server](https://github.com/LiamTX/poetize-server) para ter o servidor instalado e funcionando em sua máquina.

2 - Com o servidor instalado e funcionando, crie o arquivo .env na raiz do projeto.

Nele crie a seguinte variavel de ambiente: 
```
VUE_APP_BASE_URL=http://IP_DA_SUA_MÁQUINHA:3333/api
```

ou

```
VUE_APP_BASE_URL=http://localhost:3333/api
```

ou utilize a url de produção:
```
VUE_APP_BASE_URL=https://poetize-api.herokuapp.com/api
```

### Iniciando o projeto
Com todas as dependências instaladas e o ambiente configurado corretamente, agora você pode executar o aplicativo:
```
$ npm run serve
```
