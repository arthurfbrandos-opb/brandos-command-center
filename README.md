# 🟢 BrandOS Command Center

Dashboard visual + CRUD Tasks integrado. Next.js 15 + Supabase + Tailwind CSS.

## 🚀 Quick Start

### 1. Clonar o repo
```bash
git clone https://github.com/arthurfbrandos-opb/brandos-command-center.git
cd brandos-command-center
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Setup Supabase
- Criar projeto em https://supabase.com (email: arthurf.brandos@gmail.com)
- Copiar URL + ANON_KEY
- Criar arquivo `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Executar migrations SQL
No Supabase SQL Editor, colar todo SQL de `BRANDOS_COMMAND_CENTER_FULL.md`

### 5. Rodar local
```bash
npm run dev
# Acessa: http://localhost:3000
```

## 📁 Estrutura

```
src/
├── app/          # Páginas (Next.js 15 App Router)
├── components/   # Componentes React
├── lib/          # Utils + tipos TypeScript
└── styles/       # CSS global (tema BrandOS)
```

## 🎨 Tema

- **Primary:** Neon Verde (#00FF00)
- **Background:** Preto (#0A0E27)
- **Surface:** #1A1F3A
- **Text:** Branco (#FFFFFF)

## 📊 O que tem

✅ Dashboard home com:
- 3 cards de projetos (progresso visual)
- Gráficos de metrics (tasks + MRR)
- Status rápido (KPIs)
- Atividade recente

✅ Componentes:
- Header (logo + status)
- Sidebar (navegação colapsável)
- OverviewCard (projeto card)
- TaskCard (task card)
- MetricsChart (gráficos Recharts)

✅ Layout + Estilos:
- Tema BrandOS (neon + dark mode)
- Animações (glow, slideIn, fadeIn)
- Componentes customizados (buttons, cards, badges)

## 🔜 Próximos Passos

- [ ] Criar 4 páginas adicionais (projects, tasks, sprints, metrics)
- [ ] Implementar autenticação GitHub OAuth
- [ ] Criar API routes (CRUD tasks/projects/sprints)
- [ ] Deploy Vercel
- [ ] Configurar domínio brandos-cc.brandosystem.com

## 🔗 Links

- **Repo:** https://github.com/arthurfbrandos-opb/brandos-command-center
- **Supabase:** https://supabase.com
- **Vercel:** https://vercel.com

---

**Desenvolvido por:** Jarbas do Negócio Simples  
**Data:** 21 Fev 2026  
**Versão:** 0.1.0 (MVP)
