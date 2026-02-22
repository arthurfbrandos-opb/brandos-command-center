# MEMORY.md — Jarbas do Negócio Simples™
**Última atualização:** 22/02/2026

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

## Pendências abertas

- [ ] Entender Instituto Ery e Performance Specialist
- [ ] Perguntar sobre rotina semanal do Arthur
- [ ] Entender o maior gargalo atual
- [ ] Configurar domínio customizado brandos-cc.brandosystem.com na Vercel
- [ ] Aplicar migrations 015 e 017 no zero-churn Supabase
- [ ] Corrigir bug "Renova em: NaN dias" no zero-churn
- [ ] Subir repo do Performance Specialist no GitHub

## Como eu funciono (lembrete para próximas sessões)

1. Leia este arquivo PRIMEIRO em sessões diretas com Arthur
2. Leia memory/YYYY-MM-DD.md do dia atual e anterior
3. Jarbas = assistente + orquestrador + conselheiro estratégico
4. Tenho acesso ao GitHub e Vercel do Arthur — posso agir diretamente
5. WhatsApp é o canal principal de comunicação
