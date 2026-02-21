# 🚀 Setup BrandOS Command Center

**GitHub:** arthurfbrandos-opb  
**Auth:** GitHub  
**Domínio:** brandos-cc.brandosystem.com  

---

## ✅ PASSO 1: Criar Repositório GitHub

```bash
# Ir pra https://github.com/new

# Preencher:
Repository name: brandos-command-center
Description: BrandOS — Dashboard visual + CRUD Tasks integrado
Visibility: Public
Initialize with: README (opcional)
.gitignore: Node
License: MIT

# Criar repo!
```

---

## ✅ PASSO 2: Clonar & Setup Local

```bash
# Clonar
git clone https://github.com/arthurfbrandos-opb/brandos-command-center.git
cd brandos-command-center

# Criar estrutura Next.js 15
npx create-next-app@latest . --typescript --tailwind --eslint --app

# Durante setup, responder:
# ✅ TypeScript? Yes
# ✅ ESLint? Yes
# ✅ Tailwind CSS? Yes
# ✅ App Router? Yes
# ✅ Src directory? Yes
# ✅ Use Turbopack? Yes (mais rápido)

# Instalar dependências
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs \
  recharts react-beautiful-dnd zod react-query zustand \
  react-toastify shadcn-ui next-themes date-fns

# (ou copiar do package.json que vou passar)
```

---

## ✅ PASSO 3: Setup Supabase

### 3.1 Criar Projeto Supabase
```
1. Ir pra https://supabase.com
2. Login com GitHub
3. New Project
4. Nome: brandos-command-center
5. Senha: gerar senha forte
6. Region: São Paulo (sa-east-1)
7. Criar!
```

### 3.2 Copiar Credenciais
```
Dashboard Supabase → Settings → API
- SUPABASE_URL (copiar)
- SUPABASE_ANON_KEY (copiar)
```

### 3.3 Criar arquivo .env.local
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
```

### 3.4 Executar Migrations (SQL)
```
Dashboard Supabase → SQL Editor → New Query → Cole o SQL abaixo
```

**Copie e execute todo este SQL no Supabase SQL Editor:**

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  status TEXT DEFAULT 'active',
  progress INTEGER DEFAULT 0,
  deadline TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Sprints Table
CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sprint_id UUID REFERENCES sprints(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  assignee_id UUID REFERENCES users(id),
  deadline TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Comments Table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Agents Table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  project_id UUID REFERENCES projects(id),
  allocation INTEGER DEFAULT 0,
  status TEXT DEFAULT 'offline',
  availability TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Metrics Table
CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  week INTEGER,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can read own projects" ON projects
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = created_by);

CREATE POLICY "Users can create tasks in own projects" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can read tasks in own projects" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks in own projects" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can delete tasks in own projects" ON tasks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.created_by = auth.uid()
    )
  );
```

---

## ✅ PASSO 4: Estrutura de Pastas

Criar esta estrutura:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (home)
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── tasks/
│   │   ├── page.tsx
│   │   ├── new.tsx
│   │   └── [id]/edit.tsx
│   ├── sprints/page.tsx
│   ├── metrics/page.tsx
│   ├── agents/page.tsx
│   ├── timeline/page.tsx
│   ├── settings/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── callback/route.ts
│   │   └── logout/route.ts
│   └── api/
│       ├── tasks/route.ts
│       ├── tasks/[id]/route.ts
│       ├── projects/route.ts
│       ├── sprints/route.ts
│       └── comments/route.ts
│
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── OverviewCard.tsx
│   ├── TaskCard.tsx
│   ├── KanbanBoard.tsx
│   ├── TaskForm.tsx
│   └── ...
│
├── lib/
│   ├── supabase.ts
│   ├── types.ts
│   ├── colors.ts
│   └── utils.ts
│
└── styles/
    └── globals.css
```

---

## ✅ PASSO 5: Primeiro Commit

```bash
git add .
git commit -m "feat: initial BrandOS Command Center setup

- Next.js 15 + TypeScript + Tailwind
- Supabase integration (Auth + Database)
- Project structure with pages and components
- TODO: Implement pages and features"

git push origin main
```

---

## ✅ PASSO 6: Deploy Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy (conecta com GitHub automaticamente)
vercel

# Configurar domínio
vercel domains add brandos-cc.brandosystem.com

# Setup DNS no seu registrador
# (Vercel vai dar as instruções)
```

---

## 📋 CHECKLIST

- [ ] GitHub repo criado
- [ ] Clonado localmente
- [ ] Next.js 15 setup
- [ ] Supabase projeto criado
- [ ] .env.local configurado
- [ ] SQL migrations executadas
- [ ] Primeiro commit feito
- [ ] Push pra main
- [ ] Vercel deploy feito
- [ ] Domínio configurado

---

## 🎯 PRÓXIMAS FASES

**Depois de você executar este setup:**

1. **Jarbas (eu)** faço o desenvolvimento:
   - ✅ Componentes (Header, Sidebar, Cards)
   - ✅ Páginas (Home, Tasks, Projects, Sprints, Metrics)
   - ✅ API endpoints (CRUD)
   - ✅ Tema BrandOS (CSS)
   - ✅ Autenticação (Login)

2. **Você:**
   - ✅ Executa este setup
   - ✅ Manda os 6 docs Foundation OS (via tasks no Dashboard)
   - ✅ Testa local (`npm run dev`)
   - ✅ Aprova features enquanto desenvolvo

3. **Sprint 0:**
   - ✅ Foundation OS Module (enquanto BrandOS CC tá pronto)
   - ✅ Zero-Churn integrado
   - ✅ Documentação tudo

---

## ❓ DÚVIDAS?

Se algo não funcionar, me avisa! Posso debugar junto.

---

**Setup pronto!** 🚀 Manda quando terminar e começo o desenvolvimento!
