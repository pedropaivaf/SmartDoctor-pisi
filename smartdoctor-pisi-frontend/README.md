# SmartDoctor Pisi - Frontend

Sistema moderno de gestão psiquiátrica desenvolvido com React, TypeScript e Vite.

## 🚀 Stack Tecnológica

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utility-first
- **React Router v6** - Roteamento
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones
- **TanStack Query** - State management e cache
- **Sonner** - Toast notifications

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend SmartDoctor Pisi rodando (porta 3000)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd psimed-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com as configurações corretas:
```env
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

### Build para Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes UI reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── layout/          # Componentes de layout
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Container.tsx
│   │   └── AppLayout.tsx
│   └── features/        # Componentes específicos por feature
│
├── pages/               # Páginas da aplicação
│   ├── auth/           # Autenticação (Login, Register)
│   ├── patients/       # Gestão de pacientes
│   ├── sumula/         # Súmulas psicológicas
│   ├── medications/    # Busca de medicamentos
│   └── prescriptions/  # Gestão de prescrições
│
├── services/           # Serviços de API
│   ├── api.ts          # Configuração Axios
│   ├── auth.service.ts
│   ├── patients.service.ts
│   ├── medical-records.service.ts
│   ├── medications.service.ts
│   └── prescriptions.service.ts
│
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   └── useAutoSave.ts
│
├── lib/                # Utilitários e validações
│   ├── utils.ts        # Funções utilitárias
│   └── validations.ts  # Schemas Zod
│
├── types/              # Definições TypeScript
│   └── index.ts
│
├── App.tsx             # Configuração de rotas
├── main.tsx            # Entry point
└── index.css           # Estilos globais
```

## 🎨 Características do Design

- **Minimalismo Médico**: Interface limpa com foco em produtividade
- **Cores**: Azul clínico (#0066CC) como cor primária
- **Tipografia**: Inter font para melhor legibilidade
- **Responsivo**: Desktop-first, funcional em tablets
- **Acessibilidade**: Focus states e aria-labels

## 📱 Módulos Principais

### 1. Dashboard
- Visão geral de estatísticas
- Pacientes recentes
- Próximas consultas
- Ações rápidas

### 2. Pacientes
- Listagem com busca e filtros
- Cadastro e edição completos
- Perfil detalhado com histórico
- Gestão de informações de convênio

### 3. Súmula Psicológica ⭐
**Foco principal do sistema**

Formulário completo incluindo:
- **Anamnese**: Queixa, história, antecedentes
- **Exame do Estado Mental**: Aparência, humor, pensamento, cognição
- **Diagnóstico**: CID-10, impressão diagnóstica
- **Plano Terapêutico**: Tratamento, psicoterapia, acompanhamento
- **Features especiais**:
  - Auto-save a cada 30 segundos
  - Templates pré-definidos
  - Validação inteligente
  - Geração de PDF

### 4. Medicamentos
- Busca avançada com filtros
- Informações detalhadas (doses, efeitos, interações)
- Classificação por receita (Amarela/Azul/Branca)
- Verificação de interações medicamentosas

### 5. Prescrições
- Criação com preview em tempo real
- Suporte para receitas especiais (amarela, azul)
- Cálculo automático de quantidades
- Impressão formatada

## 🔐 Autenticação

O sistema utiliza JWT para autenticação:
- Token armazenado em localStorage
- Interceptor Axios adiciona token automaticamente
- Redirecionamento automático em caso de 401
- Componente ProtectedRoute protege rotas privadas

## 🔄 Estado e Cache

**TanStack Query** gerencia:
- Cache de dados da API
- Refetch inteligente
- Invalidação automática
- Loading e error states

## 📝 Validação de Formulários

Todos os formulários usam:
- **React Hook Form** para gerenciamento
- **Zod** para validação de schemas
- Validação em tempo real
- Mensagens de erro customizadas

## 🎯 Próximas Features

- [ ] Modo escuro
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios
- [ ] Integração com calendário
- [ ] Histórico de alterações
- [ ] Multi-idioma
- [ ] PWA support

## 🐛 Troubleshooting

### Erro de conexão com API
Verifique se:
1. O backend está rodando na porta correta
2. A variável `VITE_API_URL` está configurada
3. Não há problemas de CORS

### Erro de build
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problemas com Tailwind
Verifique se o arquivo `tailwind.config.js` está correto e se os paths em `content` estão apontando para os arquivos corretos.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e confidencial.

## 👥 Autores

- **Time SmartDoctor Pisi** - *Desenvolvimento inicial*

## 📞 Suporte

Para suporte, entre em contato através de: suporte@smartdoctorpisi.com

---

**Desenvolvido com ❤️ para profissionais da saúde mental**
