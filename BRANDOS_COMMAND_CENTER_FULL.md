# 🟢 BrandOS Command Center — Micro SaaS Completo

**Dashboard Visual + CRUD de Tasks Integrado**

---

## 📋 O QUE SERÁ CRIADO

### Páginas
1. **Home/Overview** — Status dos 3 negócios em tempo real
2. **Projects** — Lista de projetos com progresso
3. **Tasks** — CRUD completo de tasks (criar, editar, deletar, marcar pronto)
4. **Sprints** — Gerenciar sprints (semanas) com tasks
5. **Timeline** — Visualização de Gantt dos 30 dias
6. **Metrics** — KPIs e gráficos de progresso
7. **Agents** — Quem tá rodando em cada frente
8. **Settings** — Configurações da app

### Features Core
- ✅ **Tasks CRUD** — Criar/editar/deletar tasks diretamente no app
- ✅ **Drag & Drop** — Arrastar tasks entre colunas (kanban)
- ✅ **Filtros** — Por projeto, prioridade, assignee, status
- ✅ **Comentários** — Adicionar notes nas tasks
- ✅ **Notificações** — Alertas de tarefas vencidas
- ✅ **Relatórios** — Exportar progresso (PDF)
- ✅ **Auth** — Login seguro (Supabase)
- ✅ **Real-time** — Dados sincronizados automaticamente

---

## 🛠️ TECH STACK

```
FRONTEND:
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI (components)
- Recharts (charts)
- React Query (data fetching)
- React Beautiful DnD (drag & drop)
- Zustand (state management)

BACKEND:
- Next.js API Routes
- Supabase (PostgreSQL + Auth + RLS)
- Vercel Postgres (backup)

DATABASE (Supabase):
- users (id, email, name, avatar, created_at)
- projects (id, name, emoji, status, progress, deadline, created_by)
- tasks (id, project_id, sprint_id, title, description, status, priority, assignee, deadline, created_at, updated_at)
- sprints (id, project_id, name, start_date, end_date, status, created_at)
- agents (id, name, emoji, project_id, allocation, status, availability)
- metrics (id, project_id, metric_name, value, week, created_at)
- comments (id, task_id, author_id, content, created_at)

AUTH:
- Supabase Auth (email magic link)
- Row Level Security (RLS) — só vê dados próprios

DEPLOYMENT:
- Vercel (hosting)
- GitHub (versionamento)
- Cron Jobs (sync automático)
```

---

## 📁 ESTRUTURA FINAL

```
brandos-command-center/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (home/overview)
│   │   ├── projects/
│   │   │   ├── page.tsx (lista projetos)
│   │   │   └── [id]/page.tsx (detalhe projeto)
│   │   ├── tasks/
│   │   │   ├── page.tsx (kanban board)
│   │   │   ├── [id]/edit.tsx (editar task)
│   │   │   └── new.tsx (criar task)
│   │   ├── sprints/
│   │   │   ├── page.tsx (lista sprints)
│   │   │   └── [id]/page.tsx (detalhe sprint)
│   │   ├── timeline/page.tsx
│   │   ├── metrics/page.tsx
│   │   ├── agents/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── callback/route.ts
│   │   │   └── logout/route.ts
│   │   └── api/
│   │       ├── tasks/route.ts (CRUD)
│   │       ├── tasks/[id]/route.ts
│   │       ├── sprints/route.ts
│   │       ├── projects/route.ts
│   │       ├── metrics/route.ts
│   │       ├── comments/route.ts
│   │       └── cron/sync.ts (auto-update)
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── OverviewCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── KanbanBoard.tsx (drag & drop)
│   │   ├── TaskForm.tsx (create/edit)
│   │   ├── MetricsChart.tsx
│   │   ├── TimelineChart.tsx
│   │   ├── AgentStatus.tsx
│   │   ├── CommentSection.tsx
│   │   └── FilterBar.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts (client)
│   │   ├── supabase-server.ts (server)
│   │   ├── colors.ts (tema BrandOS)
│   │   ├── utils.ts
│   │   ├── schemas.ts (Zod validations)
│   │   └── types.ts (TypeScript types)
│   │
│   └── styles/
│       └── globals.css
│
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql
│
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🗄️ DATABASE SCHEMA (SQL)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user', -- admin, user
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  status TEXT DEFAULT 'active', -- active, completed, on_hold
  progress INTEGER DEFAULT 0, -- 0-100
  deadline TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Sprints
CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- Sprint 0, Sprint 1, etc
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'active', -- active, completed
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sprint_id UUID REFERENCES sprints(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo', -- todo, in_progress, in_review, done
  priority TEXT DEFAULT 'medium', -- low, medium, high, critical
  assignee_id UUID REFERENCES users(id),
  deadline TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Comments on Tasks
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Agents
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  project_id UUID REFERENCES projects(id),
  allocation INTEGER DEFAULT 0, -- 0-100%
  status TEXT DEFAULT 'offline', -- online, offline, busy
  availability TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Metrics (KPIs por projeto)
CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL, -- "dashboard_progress", "mentorados", "mrr", etc
  value NUMERIC NOT NULL,
  week INTEGER, -- semana 1, 2, 3, 4
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

-- RLS Policies (examples)
CREATE POLICY "Users can read all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can read projects they created" ON projects
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can read tasks in their projects" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.created_by = auth.uid()
    )
  );
```

---

## 📝 PÁGINAS PRINCIPAIS

### 1. Home/Overview

```typescript
// src/app/page.tsx
export default async function Home() {
  const session = await getServerSession();
  if (!session) redirect('/auth/login');

  const projects = await supabase
    .from('projects')
    .select('*')
    .eq('created_by', session.user.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brandos-bg to-brandos-surface">
      <Header />
      <main className="p-6">
        <h1 className="text-4xl font-bold text-brandos-primary mb-8">
          🟢 BrandOS Command Center
        </h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {projects.data.map(p => (
            <OverviewCard key={p.id} project={p} />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Tasks Total" value="48" />
          <StatCard label="Sprints Ativos" value="3" />
          <StatCard label="Agentes" value="4" />
          <StatCard label="MRR" value="R$30k" />
        </div>

        {/* Recent Tasks */}
        <RecentTasksSection />
      </main>
    </div>
  );
}
```

### 2. Tasks (Kanban Board)

```typescript
// src/app/tasks/page.tsx
export default async function TasksPage() {
  const tasks = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  const columns = {
    todo: tasks.data?.filter(t => t.status === 'todo') || [],
    in_progress: tasks.data?.filter(t => t.status === 'in_progress') || [],
    in_review: tasks.data?.filter(t => t.status === 'in_review') || [],
    done: tasks.data?.filter(t => t.status === 'done') || [],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandos-primary">📋 Tasks</h1>
        <Button href="/tasks/new" variant="primary">+ Nova Task</Button>
      </div>

      <FilterBar /> {/* Filters: project, priority, assignee, sprint */}

      {/* Kanban Board */}
      <KanbanBoard 
        columns={columns}
        onDragEnd={async (source, destination, draggableId) => {
          const newStatus = destination.droppableId;
          await updateTaskStatus(draggableId, newStatus);
        }}
      />
    </div>
  );
}
```

### 3. Criar/Editar Task

```typescript
// src/app/tasks/new.tsx
export default function NewTaskPage() {
  const [loading, setLoading] = useState(false);
  
  async function onSubmit(data: TaskFormData) {
    setLoading(true);
    const { error } = await supabase
      .from('tasks')
      .insert([{
        title: data.title,
        description: data.description,
        project_id: data.projectId,
        sprint_id: data.sprintId,
        priority: data.priority,
        assignee_id: data.assigneeId,
        deadline: data.deadline,
        status: 'todo',
        created_by: session.user.id,
      }]);
    
    if (!error) {
      toast.success('Task criada!');
      router.push('/tasks');
    }
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-brandos-primary mb-6">
        ➕ Nova Task
      </h1>
      <TaskForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
}
```

---

## 🎨 TEMA BRANDOS (CSS)

```css
/* src/styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors */
  --brandos-primary: #00FF00; /* Neon verde */
  --brandos-primary-dark: #00CC00;
  --brandos-secondary: #0099FF;
  --brandos-bg: #0A0E27; /* Preto profundo */
  --brandos-surface: #1A1F3A;
  --brandos-border: #2A2F4A;
  --brandos-text: #FFFFFF;
  --brandos-text-secondary: #CCCCCC;

  /* Status */
  --status-success: #00FF00;
  --status-warning: #FFD700;
  --status-danger: #FF3333;
  --status-info: #0099FF;
}

body {
  @apply bg-brandos-bg text-brandos-text;
}

/* Glow effect para botões primários */
.btn-glow {
  @apply bg-brandos-primary text-brandos-bg font-bold py-2 px-4 rounded;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  transition: all 0.3s ease;
}

.btn-glow:hover {
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.8);
  transform: scale(1.05);
}

/* Cards */
.card {
  @apply bg-brandos-surface border border-brandos-border rounded-lg p-4;
}

.card:hover {
  border-color: var(--brandos-primary);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
}

/* Progress bar */
.progress-bar {
  @apply h-2 bg-brandos-border rounded-full overflow-hidden;
}

.progress-bar-fill {
  @apply h-full bg-gradient-to-r from-brandos-primary to-brandos-primary-dark;
  transition: width 0.3s ease;
}
```

---

## 📊 API ENDPOINTS

```
Tasks:
POST   /api/tasks              — Criar task
GET    /api/tasks              — Listar tasks (com filtros)
GET    /api/tasks/[id]         — Get task
PATCH  /api/tasks/[id]         — Editar task
DELETE /api/tasks/[id]         — Deletar task

Projects:
GET    /api/projects           — Listar projetos
POST   /api/projects           — Criar projeto
PATCH  /api/projects/[id]      — Editar projeto

Sprints:
GET    /api/sprints            — Listar sprints
POST   /api/sprints            — Criar sprint

Comments:
POST   /api/comments           — Adicionar comment
GET    /api/tasks/[id]/comments — Listar comments

Metrics:
GET    /api/metrics            — Listar métricas
POST   /api/metrics            — Registrar métrica

Auth:
POST   /auth/login             — Magic link
POST   /auth/logout            — Logout
```

---

## 🚀 DEPLOYMENT

### 1. Setup Supabase
```bash
# Criar projeto no https://supabase.com
# Copiar SUPABASE_URL e SUPABASE_ANON_KEY
# Criar arquivo .env.local
```

### 2. Criar Next.js App
```bash
npx create-next-app@latest brandos-command-center --typescript --tailwind

cd brandos-command-center

# Instalar dependências
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-beautiful-dnd recharts zod react-query zustand react-toastify
```

### 3. Setup GitHub
```bash
git init
git add .
git commit -m "initial: BrandOS Command Center"
git remote add origin https://github.com/YOUR_USERNAME/brandos-command-center.git
git branch -M main
git push -u origin main
```

### 4. Deploy Vercel
```bash
npm i -g vercel
vercel

# Adicionar env vars no Vercel dashboard
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## ✅ CHECKLIST MVP

- [ ] GitHub repo criado
- [ ] Next.js boilerplate pronto
- [ ] Supabase setup (tabelas criadas)
- [ ] Auth funcional (login/logout)
- [ ] Home/Overview página
- [ ] Tasks CRUD funcional
- [ ] Kanban board (drag & drop)
- [ ] Sprints CRUD
- [ ] Projects CRUD
- [ ] Filtros de tasks
- [ ] Comentários em tasks
- [ ] Tema BrandOS aplicado
- [ ] API endpoints testados
- [ ] Deploy Vercel ao vivo
- [ ] Domínio customizado (opcional)

**ETA MVP:** 2-3 semanas

---

## 📈 ROADMAP (Depois do MVP)

**V1.1 (Semana 3-4):**
- ✅ Notificações (email quando task vence)
- ✅ Relatórios PDF
- ✅ Integração GitHub (commits = progresso)
- ✅ Webhooks para Slack/Discord

**V1.2 (Maio):**
- ✅ Mobile app (React Native)
- ✅ Gráficos avançados (Burndown, velocity)
- ✅ Sistema de permissões (quem vê o quê)
- ✅ Histórico/changelog de tasks

**V2 (Junho):**
- ✅ Integração com outros SaaS (Airtable, Monday)
- ✅ AI (sugestões de tarefas, estimativas)
- ✅ Templates de projetos

---

**Setup criado:** 20 Fev 2026  
**Pronto pra começar o desenvolvimento!** 🚀
