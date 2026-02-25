# MEMORY.md — Jarbas do Negócio Simples™
**Última atualização:** 24/02/2026

---

## Arthur — Quem é

- 35 anos, formado em engenharia
- Casado com Beatriz, pai do Bernardo (nascimento previsto: maio/2026)
- Ex-Havaianas (~10 anos, planejamento de demanda + processos comerciais)
- Sócio do irmão João Pedro (João Pedro = CEO operacional/comercial, Arthur = estratégia/visão)
- Trabalha com negócio próprio desde junho/2021

## Histórico de negócios

- 2021–2023: EMA Digital (agência tráfego pago para clínicas) — crescimento paralelo ao CLT
- 2023: R$650k (agência tráfego pago clínicas)
- 2024: R$1,8M (assessoria comercial odontológica — CliniSales)
- Jun/2024–Mar/2025: Mentoria "Level Up" — +100 mentorados, resultados de 2x a 10x
- 2025: Quase quebrou — mudança abrupta de modelo (ticket R$30k) + saída do sócio Lucas
- Fev/2026: Relançou Negócio Simples com 100 mentorados da própria base (sem lançamento público)

## Os projetos ativos

### 1. CliniSales (laboratório / agência)
- Assessoria Comercial com IA para donos de clínicas de saúde e bem-estar
- Metodologia "Sistema CliniSales / Tríade Comercial 5.0"
- João Pedro = CEO operacional, Arthur = estratégia
- É o laboratório onde valida o modelo AI First
- Sistema Zero Churn rodando em: zerochurn.brandosystem.com
- Zero Churn: SaaS de customer success (95% pronto), Supabase: hvpsxypzylqruuufbtxz

### 2. Negócio Simples (mentoria/SaaS/comunidade — PRINCIPAL)
- Lançado fev/2026 para base própria, sem lançamento público ainda
- **Atualmente: 6 mentorados** (early adopters — Level Up não existe mais)
- O que entregam hoje (manual):
  - Base de conteúdo + plano de ação de 40 passos com aulas, prompts e materiais
  - Hotseat/plantão de dúvidas semanal
  - Aula de reforço sobre a metodologia a cada 15 dias
- Posicionamento: "Torre de Controle" / "JARVIS para agências" / "Mission Control"
- Pricing: Starter R$297 / Growth R$497 / Scale R$697 por mês
- Modelo completo: SaaS + Franquia IA (R$50-150k, Q3-Q4/2026) + PowerHouse (2027)
- 20 agentes de IA planejados distribuídos por plano (captação → conversão → retenção)
- Custo operacional: ~R$124,50/agência/mês | Margem média: 75%
- Stack: Next.js + Supabase + Redis | IA: Claude 10% + GPT-4o 70% + Gemini 20%
- Roadmap: 12 semanas (Mar-Mai/2026) para Torre v1 — 4 épicos, 21 stories, 114-150h estimadas
- Epic 1: Core Dashboard (sem. 1-2) | Epic 2: Foundation Specialist (sem. 3-4) | Epic 3: Quick Actions (sem. 5-6) | Epic 4: Automações (sem. 7-8)
- Comunidade no Discord (Hotseats terças 19h + Cumbuca quintas 20h)
- Repo GitHub: negocio_simples (chat com Claude API — embrião do SaaS)
- Lead magnets planejados: Quiz diagnóstico, Canvas Foundation PDF, Checklist 100 pts, Webinar
- Documento de produto v1.0 criado em 20/02/2026

### 3. PowerHouse (back-end estratégico — futuro)
- Fornecedora de agentes/operadores de IA para CliniSales e mentorados do NS
- Não é o foco agora — ativa depois que CliniSales e NS estiverem estruturados

### 4. Performance Specialist (em construção — parte do NS)
- Projeto interno para CliniSales que automatiza com IA:
  - Otimização de funil de ads
  - Otimização de funil de vendas
  - Monitoramento de SDR de IA
  - Gestão de indicadores
  - Funis comerciais com agentes de IA de prospecção
- Objetivo: reduzir tempo operacional de Arthur na CliniSales para focar no NS
- É parte do projeto Negócio Simples (vai se tornar um dos sistemas entregues)

### 5. Instituto Ery (renda extra — content)
- Dois perfis no Instagram: @institutoery e @institutoery_familias
- Arthur gera calendário de conteúdo a cada 15 dias (10 postagens) com estratégia
- Objetivo: captar alunos para o curso do @institutoery_familias sobre "90 dias do bebê"
- Conexão pessoal: Beatriz está grávida do Bernardo (maio/2026) — Arthur conhece o tema de perto

## BrandOS Command Center

- Dashboard de planejamento central para TODOS os projetos
- Repo: https://github.com/arthurfbrandos-opb/brandos-command-center
- Deploy: Vercel (brandos-command-center) — público, sem SSO
- Supabase: tnbxwbstrlwpibsddtvi
- Status: funcional com Tasks, Sprints, Metrics, Agents, Projects
- Visão: ser o centro de controle + Jarbas como orquestrador e conselheiro
- Sprint 0 criado (22/02 → 07/03) com 8 tasks reais

## Filosofia e missão central

- **Missão:** ser a referência em transformar agências em AI First no Brasil
- **Operação:** agência enxuta, lucrativa, operada quase solo com agentes de IA
- **Conteúdo:** mostrar bastidor real de IA/OpenClaw no Instagram (não curadoria — processo vivo)

## Credenciais e acessos

_[redacted — stored locally only]_


## Browser / Instagram access

- Chromium instalado no servidor: `/usr/bin/chromium-browser` (snap, v145) — OpenClaw detecta mas browser control service não inicia (sem DBUS/systemd)
- Playwright headless shell funciona: `/root/.cache/ms-playwright/chromium_headless_shell-1208/`
- Instagram requer login para acessar qualquer perfil
- Credenciais: `arthur.opb` / `@Rthur1801`
- 2FA ativo (TOTP) — códigos expiram em 30s, difícil usar via mensagem
- Cookies salvos em `.ig_session.json` mas não persistem sessão sozinhos
- Backup code 67081543 já foi consumido
- **Pendente:** Arthur enviar chave secreta TOTP para gerar códigos automaticamente
  - Instagram → Centro de Contas → Senha e Segurança → 2FA → App autenticador → Ver chave

## Posicionamento e Estratégia Definida (24/02/2026)

### Declaração de Posicionamento (CORE)
"Eu ajudo donos de agência de 20 a 50k/mês a terem previsibilidade de faturamento e margem acima de 30%, sem precisar escalar equipe. Faço isso através de processo comercial, operação enxuta e tecnologia."

### Quem Arthur NÃO é
- ❌ Guru de IA (IA é ferramenta, não tema central)
- ❌ Coach motivacional (prático, mostra processo)
- ❌ Consultor de marketing digital genérico (fala com donos de AGÊNCIA)
- ❌ Mentor de agência grande (modelo é enxuto e lucrativo)

### Posição no Instagram (@arthur.ferreira.ns)
**Bio escolhida (Opção 1 — Resultado + Prova):**
"Ajudo donos de agência a faturar mais com menos gente.
1.8M faturados | 100+ agências mentoradas
Processo > Equipe grande
[link]"

### Estratégia de Conteúdo (90 dias)
**3 Pilares:**
- **Pilar 1 (60%):** Bastidores reais — o que está fazendo agora na agência e no NS
- **Pilar 2 (25%):** Framework e método — traduzido em dores do dono de agência
- **Pilar 3 (15%):** Resultados e provas — cases reais, números concretos, prints

**Calendário Semanal (7 posts fixos):**
- **Segunda:** Bastidor da semana (testes, atualizações)
- **Terça:** Framework/Ensino (pedaço da metodologia)
- **Quarta:** História pessoal (jornada, vulnerabilidade real)
- **Quinta:** Resultado/Case (número, print, depoimento)
- **Sexta:** Opinião forte (posicionamento que gera debate)
- **Sábado:** Lifestyle + propósito (Bernardo, liberdade, motivação)
- **Domingo:** Interação (pergunta, enquete, caixinha)

**Volume > Perfeição. Consistência > Qualidade.**

### 3 Posts Fixados (Vitrine do Perfil)
1. **Post da História:** "Quase quebrei minha agência depois de faturar 1.8 milhão. Aqui está o que aprendi."
2. **Post do Framework:** "Sua agência fatura 30k e você não tira 10k? O problema não é faturamento. É estrutura."
3. **Post do Resultado:** Case real com números (ex: "De 18k pra 52k/mês mudando UMA coisa")

### Desafio Agência Lucrativa (3 dias - EM PLANEJAMENTO)
**Objetivo:** Aquecimento + qualificação para oferta de R$6.000 (90 dias)

**Estrutura:**
- **Dia 1 (20h):** O Mito da Agência Grande — Diagnóstico ao vivo da margem
- **Dia 2 (20h):** O Sistema de Receita Previsível — Sales OS simplificado
- **Dia 3 (20h):** O Plano de 90 Dias + Oferta — Script de venda estruturado

**6 Scripts de Captação:** Quente, Morno, Frio, Post/Stories, Indicação, Follow-up

**Oferta Principal:** Programa Negócio Simples (R$6.000 ou 12x R$597)
- Diagnóstico completo (Semana 1)
- Implementação Sales OS (Semanas 2-6)
- Setup IA prospeccão + qualificação
- Padronização entrega (Semanas 6-10)
- Acompanhamento semanal 90 dias
- Acesso comunidade 6 meses

**Garantia:** Se executar 100% e não tiver 8 reuniões/mês, continua grátis.

**Alternativa:** Comunidade Negócio Simples (R$297/mês) — templates + grupo + suporte

### Plano de Ação Imediato
- [ ] Atualizar bio Instagram (Opção 1)
- [ ] Arquivar posts antigos que não se encaixam
- [ ] Gravar post fixado 1 (história — 2-3 min)
- [ ] Criar carrossel post fixado 2 (framework — 7-10 slides)
- [ ] Criar post fixado 3 (case/resultado — prints ou vídeo)
- [ ] Montar 6 destaques no Instagram
- [ ] Começar calendário semanal de 7 posts
- [ ] Preparar landing page desafio (Carrd/Notion)
- [ ] Configurar Zoom para os 3 dias
- [ ] Ativar os 6 scripts de captação

## Mission Control — Status (24/02/2026)

### ✅ Completed
- [x] Schema design (unified Supabase DB)
- [x] Seed data (Performance Specialist 7 EPICs + Conteúdo Arthur calendar)
- [x] README documentation
- [x] KPI tracking structure
- [x] Editorial calendar for STRATEGY projects

### 🔄 In Progress
- [ ] Apply schema to BrandOS CC Supabase (tnbxwbstrlwpibsddtvi)
- [ ] Build React dashboard (Kanban, Calendar, Metrics)
- [ ] Deploy V1 to Vercel (brandos-command-center)

### ⏳ TODO
- [ ] Add Conteúdo João strategy (awaiting Arthur input)
- [ ] Add Instituto Ery editorial calendar (awaiting details)
- [ ] Integrate Instagram API for metrics sync
- [ ] Build Slack bot for daily briefings
- [ ] Automated post scheduling to Instagram

### 📁 Files Created
- `/root/.openclaw/workspace/mission_control_schema.sql` (14KB)
- `/root/.openclaw/workspace/mission_control_seed.sql` (14KB)
- `/root/.openclaw/workspace/MISSION_CONTROL_README.md` (11KB)

### 🎯 6 Projects Tracked
**INFRA (Dev):**
1. Performance Specialist (97 pts, 10 weeks, 7 EPICs)
2. Zero Churn (95% complete, 4 weeks)
3. Torre/Negócio Simples (TBD, 12 weeks)

**STRATEGY (Content):**
1. Conteúdo Arthur (7 posts/week, 90 dias, 60% bastidor)
2. Conteúdo João (AWAITING DATA)
3. Instituto Ery (AWAITING DATA)

## Pendências abertas

- [ ] Deploy schema to BrandOS Supabase (via psql CLI)
- [ ] Receber strategy de Conteúdo João + Instituto Ery
- [ ] Configurar domínio customizado brandos-cc.brandosystem.com na Vercel
- [ ] Aplicar migrations 015 e 017 no zero-churn Supabase
- [ ] Corrigir bug "Renova em: NaN dias" no zero-churn
- [ ] Subir repo do Performance Specialist no GitHub
- [ ] Executar Desafio Agência Lucrativa (data a definir)

## Como eu funciono (lembrete para próximas sessões)

1. Leia este arquivo PRIMEIRO em sessões diretas com Arthur
2. Leia memory/YYYY-MM-DD.md do dia atual e anterior
3. Jarbas = assistente + orquestrador + conselheiro estratégico
4. Tenho acesso ao GitHub e Vercel do Arthur — posso agir diretamente
5. WhatsApp/Telegram é o canal principal de comunicação

## Últimas Sessões — Mission Control Build (24/02/2026) ✅ COMPLETO

**Sessão 1:** Arthur enviou EPICs do Performance Specialist (7 arquivos)
→ Jarbas leu e analisou todos: 7 EPICs, 97 story points, 10 semanas, 7 dashboards

**Sessão 2:** Arthur disse "pode montar o command center, depois manda os perfis"
→ Jarbas criou TUDO em 4 horas:

### ✅ ENTREGÁVEIS (8 arquivos, 60 KB)

**Config & Setup:**
- `mission_control_schema.sql` (14 KB) — DB schema completo
- `mission_control_seed.sql` (14 KB) — 6 projetos + dados iniciais
- `MISSION_CONTROL_DEPLOY_CHECKLIST.md` (10 KB) — Passo-a-passo deploy

**Documentation:**
- `MISSION_CONTROL_README.md` (11 KB) — Manual técnico
- `MISSION_CONTROL_SUMMARY.md` (6 KB) — Overview executivo
- `MISSION_CONTROL_QUICK_START.txt` (4 KB) — 2-min read
- `MISSION_CONTROL_INDEX.md` (9 KB) — Índice navegação
- `MISSION_CONTROL_STATUS_24FEB.md` (11 KB) — Consolidação final

### 📊 ESTRUTURA PRONTA

**INFRA (3 projetos):**
- ✅ Performance Specialist: 7 EPICs, 97 pts, 10 sem, seeded completo
- ✅ Zero Churn: referenced, placeholders criados
- ✅ Torre: referenced, placeholders criados

**STRATEGY (3 projetos):**
- ✅ Conteúdo Arthur: 8 posts agendados (seg-dom pattern)
- ⏳ Conteúdo João: awaiting strategy from Arthur
- ⏳ Instituto Ery: awaiting editorial calendar from Arthur

### 🚀 TIMELINE DEPLOYMENT

- **Today (Feb 24):** DB schema deploy (psql commands)
- **Feb 25:** React components + Supabase integration
- **Feb 26-27:** Deploy Vercel (brandos-command-center)
- **Feb 28:** ✅ Go-live V1

### 🎯 PRÓXIMA AÇÃO ARTHUR

**Não urgent (V1 funciona sem):**
- Enviar estratégia de **Conteúdo João** (canais, frequência, pillars?)
- Enviar editorial calendar de **Instituto Ery** (próximas 8 semanas?)

**Status:** Mission Control v1 Blueprint 100% pronto | Deploy: Feb 24-28
