# 🚀 BrandOS Command Center — Setup & Deployment

**Dashboard Visual dos 3 Negócios em Tempo Real**

---

## 📋 O QUE SERÁ CRIADO

```
BrandOS Command Center
├── 🏠 Overview (status dos 3 negócios)
├── 📊 Projects (Negócio Simples, CliniSales, PowerHouse)
├── 📈 Metrics (KPIs, gráficos de progresso)
├── 📅 Timeline (Sprints + Milestones)
├── 🤖 Agents (Quem tá rodando em cada frente)
├── 🚨 Risks (Bloqueadores + alertas)
├── 📝 Tasks (Lista de tasks + status)
└── ⚙️ Settings (Configurações do dashboard)
```

---

## 🛠️ TECH STACK

```
Frontend:
├── Next.js 15 (App Router)
├── React 19
├── TypeScript
├── Tailwind CSS
├── Shadcn/UI (componentes)
├── Recharts (gráficos)
├── React Query (data fetching)
├── Zod (validação de formulários)
└── Zustand (state management)

Backend:
├── Next.js API Routes
├── Supabase (PostgreSQL + Auth + RLS)
└── GitHub API (sync commits opcionais)

Database (Supabase PostgreSQL):
├── tasks (id, title, description, status, priority, project_id, assignee, deadline, created_at)
├── projects (id, name, emoji, status, progress, deadline, team, created_at)
├── sprints (id, project_id, name, start_date, end_date, tasks)
├── agents (id, name, emoji, project_id, allocation, status, availability)
├── metrics (id, project_id, metric_name, value, week, created_at)
└── comments (id, task_id, author, content, created_at)

Deployment:
├── Vercel (hosting)
├── GitHub (versionamento)
└── Vercel Cron (atualizações automáticas)

Auth:
├── Supabase Auth (magic link / email)
└── RLS (Row Level Security pra segurança)
```

---

## 📁 ESTRUTURA DO PROJETO

```
brandos-command-center/
├── .github/
│   └── workflows/
│       └── deploy.yml (CI/CD automático)
│
├── public/
│   ├── logo-brandos.svg (neon verde)
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx (layout principal)
│   │   ├── page.tsx (home/overview)
│   │   ├── projects/
│   │   │   ├── page.tsx (lista projetos)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (detalhe projeto)
│   │   ├── timeline/
│   │   │   └── page.tsx
│   │   ├── metrics/
│   │   │   └── page.tsx
│   │   ├── agents/
│   │   │   └── page.tsx
│   │   ├── tasks/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── projects/route.ts
│   │       ├── metrics/route.ts
│   │       ├── sync/route.ts (puxa dados)
│   │       └── cron/update.ts (atualiza automático)
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── OverviewCards.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── MetricsChart.tsx
│   │   ├── TimelineChart.tsx
│   │   ├── TaskList.tsx
│   │   └── AgentStatus.tsx
│   │
│   ├── lib/
│   │   ├── data.ts (dados mockados + tipos)
│   │   ├── colors.ts (tema BrandOS)
│   │   └── utils.ts
│   │
│   └── styles/
│       └── globals.css (tema neon verde)
│
├── data/
│   ├── projects.json
│   ├── tasks.json
│   ├── metrics.json
│   └── agents.json
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🎨 TEMA BRANDOS (Neon Verde)

```typescript
// src/lib/colors.ts
export const brandosTheme = {
  // Cores principais
  primary: "#00FF00",        // Neon verde
  secondary: "#00CC00",      // Neon verde escuro
  background: "#0A0E27",     // Preto profundo (navy)
  surface: "#1A1F3A",        // Cinza muito escuro
  border: "#2A2F4A",         // Cinza médio
  text: "#FFFFFF",           // Branco
  textSecondary: "#CCCCCC",  // Cinza claro
  
  // Status
  success: "#00FF00",        // Verde
  warning: "#FFD700",        // Amarelo
  danger: "#FF3333",         // Vermelho
  info: "#0099FF",           // Azul
  
  // Gradients
  gradientPrimary: "linear-gradient(135deg, #00FF00, #00CC00)",
  gradientBackground: "linear-gradient(135deg, #0A0E27, #1A1F3A)"
}
```

---

## 🏠 PÁGINA PRINCIPAL (Overview)

```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brandos-bg to-brandos-surface">
      {/* Header */}
      <header className="border-b border-brandos-border p-6">
        <h1 className="text-4xl font-bold text-brandos-primary">
          🟢 BrandOS Command Center
        </h1>
        <p className="text-brandos-text-secondary">Última atualização: {lastUpdate}</p>
      </header>

      {/* Overview Cards */}
      <section className="p-6 grid grid-cols-4 gap-4">
        <OverviewCard 
          title="Negócio Simples"
          progress={36}
          status="🟡 Em Progresso"
          metric="Sprint 0+1"
        />
        <OverviewCard 
          title="CliniSales"
          progress={62}
          status="🟢 Operacional"
          metric="Scaling Phase"
        />
        <OverviewCard 
          title="PowerHouse"
          progress={19}
          status="🔴 Embrionário"
          metric="Planejamento"
        />
        <OverviewCard 
          title="Jarbas Integration"
          progress={35}
          status="🟡 Em Progresso"
          metric="Kickoff"
        />
      </section>

      {/* Key Metrics */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">📊 Métricas Gerais</h2>
        <div className="grid grid-cols-4 gap-4">
          <MetricBox label="Tasks Total" value="48" delta={"+12 concluídas"} />
          <MetricBox label="Sprints Ativos" value="3" delta={"+4 próximos"} />
          <MetricBox label="Agentes Rodando" value="4" delta={"+8 disponíveis"} />
          <MetricBox label="MRR Negócio Simples" value="R$0" delta="→ R$30k (meta)" />
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">📅 Timeline 30 Dias</h2>
        <TimelineChart data={timelineData} />
      </section>

      {/* Quick Actions */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">⚡ Ações Rápidas</h2>
        <div className="grid grid-cols-3 gap-4">
          <QuickActionBtn title="Ver Projetos" href="/projects" />
          <QuickActionBtn title="Tasks Pendentes" href="/tasks" />
          <QuickActionBtn title="Agendar Standup" href="/settings" />
        </div>
      </section>
    </main>
  )
}
```

---

## 📊 PÁGINA DE PROJETOS

```typescript
// src/app/projects/page.tsx
export default function ProjectsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-brandos-primary mb-6">
        📦 Projetos
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Card: Negócio Simples */}
        <ProjectCard
          name="Negócio Simples"
          emoji="🎓"
          progress={36}
          status="Em Progresso"
          color="yellow"
          tasks={[
            { title: "Foundation OS", progress: 35 },
            { title: "Zero-Churn Integration", progress: 60 },
            { title: "Jarvis Dashboard", progress: 30 },
            { title: "Content Strategy", progress: 20 }
          ]}
          deadline="22 Mar 2026"
          team={["Arthur", "Jarbas", "Dev TBD", "Design TBD"]}
        />

        {/* Card: CliniSales */}
        <ProjectCard
          name="CliniSales"
          emoji="🏥"
          progress={62}
          status="Operacional"
          color="green"
          tasks={[
            { title: "IA para prospecção", progress: 60 },
            { title: "Landing page com IA", progress: 60 },
            { title: "Automação follow-up", progress: 0 },
            { title: "Case study", progress: 0 }
          ]}
          deadline="22 Mar 2026"
          team={["João Pedro", "Tech team", "Designer"]}
        />

        {/* Card: PowerHouse */}
        <ProjectCard
          name="PowerHouse"
          emoji="⚡"
          progress={19}
          status="Embrionário"
          color="red"
          tasks={[
            { title: "Mapear 8 agentes", progress: 0 },
            { title: "Modelo de coins", progress: 0 },
            { title: "Mockup UI", progress: 0 },
            { title: "MVP técnico", progress: 0 }
          ]}
          deadline="22 Mai 2026"
          team={["Arthur", "TBD"]}
        />
      </div>
    </main>
  )
}
```

---

## 📈 PÁGINA DE MÉTRICAS

```typescript
// src/app/metrics/page.tsx
export default function MetricsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-brandos-primary mb-6">
        📈 Métricas & KPIs
      </h1>

      {/* Negócio Simples Metrics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brandos-text mb-4">
          🎓 Negócio Simples (30 dias)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <MetricsLineChart
            data={[
              { week: "W1", dashboard: 0, mentorados: 0, views: 0, mrr: 0 },
              { week: "W2", dashboard: 30, mentorados: 20, views: 5000, mrr: 5000 },
              { week: "W3", dashboard: 70, mentorados: 60, views: 20000, mrr: 15000 },
              { week: "W4", dashboard: 100, mentorados: 100, views: 50000, mrr: 30000 }
            ]}
            title="Progresso Geral"
          />
          <MetricsTable
            data={[
              { metric: "Dashboard", target: "✅", status: "0%" },
              { metric: "Mentorados", target: "100+", status: "0" },
              { metric: "Views", target: "50k", status: "0" },
              { metric: "MRR", target: "R$30k", status: "R$0" },
              { metric: "NPS", target: "8+", status: "?" }
            ]}
          />
        </div>
      </section>

      {/* CliniSales Metrics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brandos-text mb-4">
          🏥 CliniSales (30 dias)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <MetricsTable
            data={[
              { metric: "Receita", target: "R$165k", status: "🟡 Tracking" },
              { metric: "Clientes", target: "12-15", status: "✅ 14 ativos" },
              { metric: "Margem", target: "60%+", status: "✅ 60%" },
              { metric: "NPS", target: "8+", status: "🟡 7.5" },
              { metric: "Churn", target: "<5%", status: "✅ 3%" }
            ]}
          />
        </div>
      </section>
    </main>
  )
}
```

---

## 🤖 PÁGINA DE AGENTES

```typescript
// src/app/agents/page.tsx
export default function AgentsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-brandos-primary mb-6">
        🤖 Agentes & Recursos
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Claude/Jarbas */}
        <AgentCard
          emoji="🤖"
          name="Claude/Jarbas (Eu mesmo!)"
          project="Negócio Simples"
          allocation="100%"
          tasks="Planejamento, documentação, arquitetura"
          status="online"
          availability="24/7"
        />

        {/* Dev Agent */}
        <AgentCard
          emoji="👨‍💻"
          name="Dev/Coding Agent"
          project="Negócio Simples"
          allocation="100%"
          tasks="Frontend, backend, integrações"
          status="⏳ Awaiting allocation"
          availability="TBD"
        />

        {/* Design Agent */}
        <AgentCard
          emoji="🎨"
          name="Design Agent"
          project="Negócio Simples (70%), CliniSales (30%)"
          allocation="70%"
          tasks="UI/UX, animações, branding"
          status="⏳ Awaiting allocation"
          availability="TBD"
        />

        {/* João Pedro */}
        <AgentCard
          emoji="👨‍💼"
          name="João Pedro (CliniSales CEO)"
          project="CliniSales (80%), Negócio Simples (20%)"
          allocation="80%"
          tasks="Execução, vendas, estratégia"
          status="online"
          availability="Business hours"
        />
      </div>

      {/* Capacity Analysis */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">
          📊 Análise de Capacidade
        </h2>
        <CapacityTable
          data={[
            { role: "Dev (Full-stack)", atual: "0 FTE", demanda: "1 FTE", gap: "-1" },
            { role: "Design", atual: "0 FTE", demanda: "0.5 FTE", gap: "-0.5" },
            { role: "Content", atual: "0.5 FTE", demanda: "0.5 FTE", gap: "✅ Ok" },
            { role: "DevOps", atual: "0 FTE", demanda: "0.3 FTE", gap: "-0.3" }
          ]}
        />
      </section>
    </main>
  )
}
```

---

## 🚀 DEPLOY NO VERCEL

### Passo 1: Setup GitHub

```bash
# Criar repo no GitHub
gh repo create brandos-command-center --public --source=. --remote=origin --push

# Fazer commit inicial
git add .
git commit -m "feat: initial BrandOS Command Center setup"
git push origin main
```

### Passo 2: Deploy no Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Ligar domínio customizado (opcional)
vercel domains add brandos-cc.brandosystem.com
```

### Passo 3: Configurar Auto-Update (Cron)

```typescript
// src/app/api/cron/update.ts
export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Sincronizar com GitHub (commits = progresso)
    const commits = await fetchGitHubCommits();
    
    // Atualizar JSON de progresso
    await updateProgressData(commits);
    
    return Response.json({ success: true, updated: new Date() });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 📦 COMANDOS PRINCIPAIS

```bash
# Instalar dependências
npm install

# Dev local
npm run dev
# Acessa: http://localhost:3000

# Build prod
npm run build

# Preview prod
npm run start

# Deploy Vercel
vercel deploy --prod
```

---

## ✅ CHECKLIST DE SETUP

- [ ] GitHub repo criado (`brandos-command-center`)
- [ ] Next.js 15 + TypeScript setup
- [ ] Tailwind CSS configurado
- [ ] Shadcn/UI instalado
- [ ] Recharts instalado
- [ ] Tema BrandOS (cores + CSS) definido
- [ ] 8 páginas criadas (overview, projects, timeline, metrics, agents, tasks, risks, settings)
- [ ] Componentes principais (cards, charts, tables, buttons)
- [ ] Data mockada (JSON local)
- [ ] Vercel deployment pronto
- [ ] Cron job configurado (atualização automática)
- [ ] Domínio customizado (opcional)

---

## 🎯 PRÓXIMAS FASES (Depois do MVP)

**Fase 2 (Abril):**
- ✅ Integração com Notion API (tarefas sincronizadas)
- ✅ Integração com GitHub API (commits = progresso automático)
- ✅ Supabase pra dados reais (não mock)
- ✅ Sistema de notificações (email/Discord)

**Fase 3 (Maio):**
- ✅ Filtros avançados (por projeto, agent, status)
- ✅ Relatórios exportáveis (PDF)
- ✅ Dark/Light mode toggle
- ✅ Mobile app (React Native)

---

**Setup criado:** 20 Fev 2026  
**ETA MVP:** 1-2 semanas (paralelo aos Sprints)  
**ETA Deploy:** Vercel (assim que pronto)  

Quer que eu comece o desenvolvimento agora? 🚀
