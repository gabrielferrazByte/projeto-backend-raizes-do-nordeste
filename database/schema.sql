/*
=========================================
RAÍZES DO NORDESTE
SCRIPT DE CRIAÇÃO DO BANCO
=========================================
*/

CREATE DATABASE raizes_nordeste;

/*
Após criar o banco, conectar-se a ele e executar os comandos abaixo.
*/

-- =====================================
-- ENUMS
-- =====================================
CREATE TYPE perfil_usuario AS ENUM (
    'CLIENTE',
    'ATENDENTE',
    'COZINHA',
    'GERENTE',
    'ADMIN'
);

CREATE TYPE canal_pedido_enum AS ENUM (
    'APP',
    'TOTEM',
    'BALCAO',
    'PICKUP',
    'WEB'
);

CREATE TYPE status_pedido_enum AS ENUM (
    'AGUARDANDO_PAGAMENTO',
    'PAGO',
    'EM_PREPARO',
    'PRONTO',
    'ENTREGUE',
    'CANCELADO'
);

CREATE TYPE status_pagamento_enum AS ENUM (
    'PENDENTE',
    'APROVADO',
    'RECUSADO'
);

-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial NOT NULL,
    nome character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    senha_hash character varying(255) COLLATE pg_catalog."default" NOT NULL,
    perfil perfil_usuario NOT NULL,
    consentimento_lgpd boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;


-- Table: public.unidades

-- DROP TABLE IF EXISTS public.unidades;

CREATE TABLE IF NOT EXISTS public.unidades
(
    id serial NOT NULL,
    nome character varying(100) COLLATE pg_catalog."default" NOT NULL,
    endereco character varying(255) COLLATE pg_catalog."default" NOT NULL,
    telefone character varying(20) COLLATE pg_catalog."default",
    ativo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unidades_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.unidades
    OWNER to postgres;


-- Table: public.produtos

-- DROP TABLE IF EXISTS public.produtos;

CREATE TABLE IF NOT EXISTS public.produtos
(
    id serial NOT NULL,
    nome character varying(100) COLLATE pg_catalog."default" NOT NULL,
    descricao text COLLATE pg_catalog."default",
    preco numeric(10,2) NOT NULL,
    ativo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT produtos_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produtos
    OWNER to postgres;


-- Table: public.fidelidade

-- DROP TABLE IF EXISTS public.fidelidade;

CREATE TABLE IF NOT EXISTS public.fidelidade
(
    id serial NOT NULL,
    usuario_id integer NOT NULL,
    pontos integer DEFAULT 0,
    nivel character varying(30) COLLATE pg_catalog."default" DEFAULT 'BRONZE'::character varying,
    CONSTRAINT fidelidade_pkey PRIMARY KEY (id),
    CONSTRAINT fidelidade_usuario_id_key UNIQUE (usuario_id),
    CONSTRAINT fk_fidelidade_usuario FOREIGN KEY (usuario_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fidelidade
    OWNER to postgres;


-- Table: public.estoque

-- DROP TABLE IF EXISTS public.estoque;

CREATE TABLE IF NOT EXISTS public.estoque
(
    id serial NOT NULL,
    produto_id integer NOT NULL,
    unidade_id integer NOT NULL,
    quantidade integer NOT NULL DEFAULT 0,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT estoque_pkey PRIMARY KEY (id),
    CONSTRAINT uq_produto_unidade UNIQUE (produto_id, unidade_id),
    CONSTRAINT fk_estoque_produto FOREIGN KEY (produto_id)
        REFERENCES public.produtos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_estoque_unidade FOREIGN KEY (unidade_id)
        REFERENCES public.unidades (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.estoque
    OWNER to postgres;


-- Table: public.pedidos

-- DROP TABLE IF EXISTS public.pedidos;

CREATE TABLE IF NOT EXISTS public.pedidos
(
    id serial NOT NULL,
    usuario_id integer NOT NULL,
    unidade_id integer NOT NULL,
    canal_pedido canal_pedido_enum NOT NULL,
    status status_pedido_enum DEFAULT 'AGUARDANDO_PAGAMENTO'::status_pedido_enum,
    valor_total numeric(10,2) DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pedidos_pkey PRIMARY KEY (id),
    CONSTRAINT fk_pedido_unidade FOREIGN KEY (unidade_id)
        REFERENCES public.unidades (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pedidos
    OWNER to postgres;


-- Table: public.pagamentos

-- DROP TABLE IF EXISTS public.pagamentos;

CREATE TABLE IF NOT EXISTS public.pagamentos
(
    id serial NOT NULL,
    pedido_id integer NOT NULL,
    metodo character varying(30) COLLATE pg_catalog."default" NOT NULL,
    status status_pagamento_enum DEFAULT 'PENDENTE'::status_pagamento_enum,
    codigo_transacao character varying(100) COLLATE pg_catalog."default",
    data_pagamento timestamp without time zone,
    CONSTRAINT pagamentos_pkey PRIMARY KEY (id),
    CONSTRAINT fk_pagamento_pedido FOREIGN KEY (pedido_id)
        REFERENCES public.pedidos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pagamentos
    OWNER to postgres;


-- Table: public.itens_pedido

-- DROP TABLE IF EXISTS public.itens_pedido;

CREATE TABLE IF NOT EXISTS public.itens_pedido
(
    id serial NOT NULL,
    pedido_id integer NOT NULL,
    produto_id integer NOT NULL,
    quantidade integer NOT NULL,
    preco_unitario numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    CONSTRAINT itens_pedido_pkey PRIMARY KEY (id),
    CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id)
        REFERENCES public.pedidos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_produto FOREIGN KEY (produto_id)
        REFERENCES public.produtos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.itens_pedido
    OWNER to postgres;


-- Table: public.log_auditoria

-- DROP TABLE IF EXISTS public.log_auditoria;

CREATE TABLE IF NOT EXISTS public.log_auditoria
(
    id serial NOT NULL,
    usuario_id integer,
    acao character varying(100) COLLATE pg_catalog."default" NOT NULL,
    descricao text COLLATE pg_catalog."default",
    data_hora timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT log_auditoria_pkey PRIMARY KEY (id),
    CONSTRAINT fk_log_usuario FOREIGN KEY (usuario_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.log_auditoria
    OWNER to postgres;