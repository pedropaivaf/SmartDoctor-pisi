# SmartDoctor Pisi - Backend

Sistema de gerenciamento inteligente para médicos psiquiatras.

## Funcionalidades

- ✅ Autenticação JWT
- ✅ Cadastro de clínicas e médicos
- ✅ Gerenciamento de pacientes
- ✅ Prontuários médicos completos
- ✅ Banco de dados de medicamentos psiquiátricos
- ✅ Sistema de prescrições
- ✅ Auditoria de acessos

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

Crie um banco PostgreSQL e configure o arquivo `.env`:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais.

### 3. Popular medicamentos (SQL)

Execute o SQL contido em `database/medications.sql` no seu banco.

### 4. Rodar o servidor

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Criar paciente
- `GET /api/patients/:id` - Ver paciente
- `PUT /api/patients/:id` - Atualizar paciente

### Prontuários
- `POST /api/patients/:id/medical-records` - Criar prontuário
- `GET /api/patients/:id/medical-records` - Listar prontuários

### Medicamentos
- `GET /api/medications/search?q=sertralina` - Buscar medicamentos
- `GET /api/medications/classes` - Classes terapêuticas
- `GET /api/medications/:id` - Detalhes do medicamento

### Prescrições
- `POST /api/prescriptions` - Criar prescrição
- `GET /api/prescriptions?patient_id=xxx` - Listar prescrições

## Documentação API

Acesse: `http://localhost:3000/docs` (Swagger)

## Deploy no Render

1. Conecte seu repositório Git
2. Configure as variáveis de ambiente no Render
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- JWT
- Swagger
