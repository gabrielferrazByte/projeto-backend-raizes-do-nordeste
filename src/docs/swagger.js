/*
=========================================
DOCUMENTAÇÃO SWAGGER
URL: http://localhost:3000/api-docs
=========================================
*/
// Importa Swagger UI
const swaggerUi = require('swagger-ui-express');

// Configuração da documentação Swagger. Permite visualizar e testar os endpoints diretamente pelo navegador.
const swaggerDocument = {

  openapi: '3.0.0',

  info: {
    title: 'API Raízes do Nordeste',
    version: '1.0.0',
    description: 'Sistema de gestão da rede Raízes do Nordeste'
  },

  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],

  // Lista de endpoints documentados
  paths: {

    // ===========================
    // AUTENTICAÇÃO
    // ===========================
    "/auth/register": {

      post: {
        
        // Categoria da rota
        tags: ["Autenticação"],

        // Nome exibido na documentação
        summary: "Cadastrar usuário",

        // Explicação da funcionalidade
        description:
          "Realiza o cadastro de um novo usuário"

      }

    },

    "/auth/login": {

      post: {

        tags: ["Autenticação"],

        summary: "Realizar login",

        description:
          "Autentica o usuário e gera o token JWT"

      }

    },

    // ===========================
    // PRODUTOS
    // ===========================
    "/produtos": {

      get: {

        tags: ["Produtos"],

        summary: "Listar produtos"

      },

      post: {

        tags: ["Produtos"],

        summary: "Cadastrar produto"

      }

    },

    "/produtos/{id}": {

      put: {
        tags: ["Produtos"],

        summary: "Atualizar produto"
      },

      delete: {
        tags: ["Produtos"],
        
        summary: "Remover produto"
      }

    },

    // ==================================================
    // ESTOQUE
    // ==================================================
    "/estoque": {

      get: {

        tags: ["Estoque"],

        summary: "Listar estoque"

      }

    },

    "/estoque/entrada": {

      post: {

        tags: ["Estoque"],

        summary: "Adicionar estoque"

      }

    },

    "/estoque/saida": {

      post: {

        tags: ["Estoque"],

        summary: "Remover estoque"

      }

    },

    // ===========================
    // PEDIDOS
    // ===========================
    "/pedidos": {

      get: {

        tags: ["Pedidos"],

        summary: "Listar pedidos"

      },

      post: {

        tags: ["Pedidos"],

        summary: "Criar pedido"

      }

    },

    "/pedidos/{id}": {

      get: {

        tags: ["Pedidos"],

        summary: "Buscar pedido por ID"

      }

    },

    "/pedidos/{id}/status": {

      patch: {

        tags: ["Pedidos"],

        summary: "Atualizar status do pedido"

      }

    },

    // ===========================
    // PAGAMENTOS
    // ===========================
    "/pagamentos": {

      post: {

        tags: ["Pagamentos"],

        summary: "Processar pagamento mock",

      }

    },

    // ===========================
    // FIDELIDADE
    // ===========================
    "/fidelidade/{usuario_id}": {

      get: {

        tags: ["Fidelidade"],

        summary: "Consultar pontos"

      }

    },

    "/fidelidade/acumular": {

      post: {

        tags: ["Fidelidade"],

        summary: "Acumular pontos"

      }

    },

    "/fidelidade/resgatar": {

      post: {

        tags: ["Fidelidade"],

        summary: "Resgatar pontos"

      }

    }

  }

};

// Exporta para uso no app.js
module.exports = {
  swaggerUi,
  swaggerDocument
};