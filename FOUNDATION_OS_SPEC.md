# 📐 Foundation OS — Especificação Técnica

**Módulo Jarvis que ajuda o dono de agência a estruturar seu modelo de negócio em 6 etapas**

---

## 🎯 Visão Geral

**O que é:** Wizard interativo que guia mentorado através de 6 pilares estruturadores

**Por que:** Sem Foundation, o resto (Sales, Delivery) não funciona bem. Precisa estar cristalino:
- Quem você vende?
- Para quem?
- Qual é a oferta?
- Como você diferencia?
- Como você executa?

**Resultado Final:** Documento estruturado + templates prontos + confiança pra começar Sales OS

---

## 6 PILARES DO FOUNDATION OS

### 1️⃣ NICHO
**Pergunta:** "Para quem você trabalha?"

**O que colher:**
- [ ] Nicho principal (ex: agências, clínicas, e-commerce, SaaS)
- [ ] Sub-nicho (ex: agências de tráfego, agências de design)
- [ ] Nível de especificidade (0-10)

**Validação IA:**
- "Seu nicho é específico o suficiente?"
- Se não, sugere refinamentos

**Output:**
- Nicho definido (1-2 frases)
- Dados do nicho (tamanho de mercado, growth rate)
- Competidores nesse nicho

**Exemplo:**
```
Nicho: Agências de marketing digital
Sub-nicho: Agências focadas em performance (ads)
Específico: SIM ✅
Output: "Ajudamos agências de tráfego pago a escalarem operação com IA"
```

---

### 2️⃣ ICP (Ideal Customer Profile)
**Pergunta:** "Quem é seu cliente perfeito?"

**O que colher:**
- [ ] Cargo do tomador de decisão (CEO, CMO, etc)
- [ ] Tamanho da empresa (faturamento, número de clientes)
- [ ] Localização (Brasil, LATAM, global?)
- [ ] Dor principal (operação, tráfego pago, vendas?)
- [ ] Orçamento típico (quanto gastam com similar?)
- [ ] Ciclo de venda (quanto tempo pra fechar?)

**Validação IA:**
- Verifica coerência (ex: startup de tech buying de agência de $500k não bate)
- Sugere refinamentos

**Output:**
- Persona detalhado (nome, contexto, desejos, dores)
- Matriz de critérios (high/medium/low fit)
- Exemplo de 3 ICPs ideais do seu nicho

**Exemplo:**
```
ICP: CEO de agência de tráfego
├── Faturamento anual: R$500k-R$2M
├── Dor: Operação caótica, margens apertadas
├── Orçamento mensal: R$2k-10k
├── Ciclo: 2-4 semanas
└── Localização: Brasil (preferência SP, MG)
```

---

### 3️⃣ OFERTA
**Pergunta:** "O que você vende?"

**O que colher:**
- [ ] Nome da oferta (ex: "Tríade Comercial 5.0")
- [ ] Descrição (1 parágrafo, benefit-focused)
- [ ] Formato (coaching, SaaS, agência, híbrido?)
- [ ] Preço (mensal/semestral/anual?)
- [ ] O que está incluído (3-5 deliverables principais)
- [ ] Tempo de implementação (horas, semanas?)
- [ ] Resultado esperado (em números)

**Validação IA:**
- "Sua oferta é clara o suficiente?"
- "Qual é o diferencial?"
- Sugere mejoras no copy

**Output:**
- Oferta one-liner (elevator pitch)
- Descrição detalhada (pra website/landing)
- Lista de entregáveis
- Projeção de resultado

**Exemplo:**
```
Oferta: "Assessoria Comercial para Clínicas Odontológicas + IA"
Formato: Híbrido (coaching + tech)
Preço: R$30k projeto ou R$5k/mês
Inclui:
  ✅ Estruturação funil comercial
  ✅ Treinamento vendedor/secretária
  ✅ IA para automação
  ✅ Acompanhamento mensal
  ✅ Relatório de KPIs
Resultado: Clínicas crescem 30-50% em pacientes
Implementação: 30 dias
```

---

### 4️⃣ ESTEIRA DE PRODUTOS
**Pergunta:** "Qual é sua sequência de venda?"

**O que colher:**
- [ ] Produto 1 (entry-level, menor preço)
- [ ] Produto 2 (mid-tier, maior valor)
- [ ] Produto 3 (premium, máximo valor)
- [ ] Cada um: nome, preço, margem, tempo
- [ ] Upsells/cross-sells possíveis

**Validação IA:**
- "Você tem lacunas na esteira?"
- Sugere produtos faltantes
- Verifica se preços fazem sentido (progressão)

**Output:**
- Tabela de esteira (visual)
- Fluxo de venda (qual vem primeiro?)
- Projeção de receita (LTV por cliente)

**Exemplo:**
```
Esteira CliniSales:
┌─────────────────────────────────────────┐
│ Produto 1: Diagnóstico Comercial        │
│ Preço: R$2.500 (one-time)               │
│ Margem: 80% (custo: R$500)              │
└─────────────────────────────────────────┘
         ↓ (se gostou)
┌─────────────────────────────────────────┐
│ Produto 2: Assessoria (3 meses)         │
│ Preço: R$30k (R$10k/mês)                │
│ Margem: 60% (custo: R$12k)              │
└─────────────────────────────────────────┘
         ↓ (se deu resultado)
┌─────────────────────────────────────────┐
│ Produto 3: Retainer (ongoing)           │
│ Preço: R$8k/mês (após projeto)          │
│ Margem: 70% (custo: R$2.4k)             │
└─────────────────────────────────────────┘

LTV por cliente: ~R$80k (diagnóstico + projeto + 12 meses retainer)
```

---

### 5️⃣ POSICIONAMENTO
**Pergunta:** "Por que clientes escolhem você e não outro?"

**O que colher:**
- [ ] Seu diferencial (o que você faz único?)
- [ ] Sua história (por que começou?)
- [ ] Sua expertise (quantos anos? quantos clientes?)
- [ ] Sua perspectiva (qual é sua visão?)
- [ ] Seu preço vs concorrência (premium? premium+ value?)

**Validação IA:**
- GPT gera 3 opções de positioning statement
- Valida se é diferente de concorrentes

**Output:**
- Positioning statement (1-2 frases fortes)
- Tagline (se quiser)
- Argumentos de venda (por que você?)
- Comparação vs concorrência

**Exemplo:**
```
Posicionamento CliniSales:
"A gente transforma clínicas odontológicas em máquinas de vendas
usando inteligência artificial + processo comercial estruturado."

Tagline: "Sua clínica vai crescer sem você trabalhar 10x mais"

Diferencial:
  ✅ Método de 3 pilares (Captação + Processo + Tech)
  ✅ Experiência com 200+ clínicas
  ✅ Garantia de resultado ou devolve parte do investimento

vs Concorrentes:
  ❌ Agência de tráfego: foca só em ads, ignora vendedor
  ❌ Coach: dá teoria, não implementa tech
  ❌ Outro consultor: não tem SaaS integrado

Preço: Premium (~2x que agência comum) + Value
  → Porque resultado é garantido
```

---

### 6️⃣ MÉTODO/MECANISMO ÚNICO
**Pergunta:** "Como você executa? Por que funciona?"

**O que colher:**
- [ ] Nome do método (ex: "Tríade Comercial 5.0")
- [ ] Em quantas fases você divide?
- [ ] Cada fase: objetivo, tempo, deliverables
- [ ] Por que esse método é único?
- [ ] Qual é a sequência (pode fazer tudo ao mesmo tempo?)
- [ ] Tempo total (dias/semanas)
- [ ] Quem executa (você, seu time, cliente, híbrido?)

**Validação IA:**
- "Seu método é bem documentado?"
- Sugere clarificações se vago
- Gera material pra você ensinar

**Output:**
- Documento visual (fases + timeline)
- SOPs de cada fase (pra treinar time)
- Critério de sucesso por fase
- Documentação pra vender/ensinar

**Exemplo:**
```
MÉTODO: Tríade Comercial 5.0 (30-90 dias)

Fase 1: DIAGNÓSTICO (Semana 1-2)
├── Objetivo: Entender operação atual
├── Deliverables: Relatório diagnóstico
├── Tempo: 20 horas
├── Resultado: Sabe aonde focar

Fase 2: ESTRUTURAÇÃO (Semana 2-4)
├── Objetivo: Montar funis + processo
├── Deliverables: Funil desenhado, SOP de vendas
├── Tempo: 40 horas
├── Resultado: Sistema pronto pra executar

Fase 3: IMPLEMENTAÇÃO (Semana 4-12)
├── Objetivo: Colocar em produção
├── Deliverables: Tech (IA), treinamento time
├── Tempo: 80 horas
├── Resultado: Máquina de vendas rodando

Fase 4: ACOMPANHAMENTO (Ongoing)
├── Objetivo: Optimizar + escalar
├── Deliverables: Relatório mensal, ajustes
├── Tempo: 10 horas/mês
├── Resultado: Crescimento sustentável

Razão do sucesso:
  ✅ 3 pilares atacam problema raiz (não só tráfego ou só vendedor)
  ✅ Integra humano + IA (não é 100% automatizado)
  ✅ Tempo de implementação curto (ROI rápido)
  ✅ Documentado (mentorado consegue replicar)
```

---

## 🖥️ INTERFACE — Foundation OS Wizard

### Fluxo Visual

```
┌─────────────────────────────────────┐
│ Foundation OS — 6 Pilares           │
│ Seu Modelo de Negócio em 1h         │
└─────────────────────────────────────┘

[Step 1/6] Nicho
Qual é o seu nicho de atuação?
[Dropdown: Selecionar]
[Input: Descrição livre]
[IA Suggestion: Você pensou em X?]
[Anterior] [Próximo]

[Step 2/6] ICP
Quem é seu cliente ideal?
[Form: 6 campos]
[IA Preview: Seu ICP é...]
[Anterior] [Próximo]

... (repete para Step 3-6)

[Step 6/6] Review
Revise seus dados:
  ✅ Nicho: Agências de tráfego
  ✅ ICP: CEO de agência, faturamento R$500k-2M
  ✅ Oferta: Assessoria Comercial + IA
  ✅ Esteira: 3 produtos (diagnóstico, projeto, retainer)
  ✅ Posicionamento: Transformamos agências em máquinas de venda
  ✅ Método: Tríade Comercial 5.0 (30-90 dias)

[Editar] [Gerar Documento] [Compartilhar]
```

---

## 📊 Database Schema

```sql
-- Foundation Profiles
CREATE TABLE foundation_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users,
  nicho TEXT NOT NULL,
  icp JSONB NOT NULL,
  oferta JSONB NOT NULL,
  esteira JSONB NOT NULL,
  posicionamento JSONB NOT NULL,
  metodo JSONB NOT NULL,
  status TEXT ('draft', 'completed'), -- 
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Foundation Steps (para tracking)
CREATE TABLE foundation_steps (
  id UUID PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES foundation_profiles,
  step INTEGER (1-6),
  data JSONB,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Foundation Templates (exemplos pré-feitos)
CREATE TABLE foundation_templates (
  id UUID PRIMARY KEY,
  nicho TEXT,
  icp JSONB,
  oferta JSONB,
  esteira JSONB,
  posicionamento JSONB,
  metodo JSONB,
  created_by UUID REFERENCES auth.users -- Quem criou (ex: Arthur)
);
```

---

## 🤖 IA Prompts (OpenAI)

### Prompt 1: Nicho Refinement
```
Você é um estrategista de negócio.
O mentorado disse que seu nicho é: "{input}"

Analise se esse nicho é específico o suficiente (0-10).
Se não, sugira 3 opções mais específicas.

Retorne JSON:
{
  "specificity_score": 0-10,
  "feedback": "...",
  "suggestions": ["...", "...", "..."]
}
```

### Prompt 2: Positioning Statement Generator
```
Crie 3 positioning statements baseado em:
- Nicho: {nicho}
- ICP: {icp}
- Oferta: {oferta}
- Diferencial: {diferencial}

Cada um deve:
1. Ser uma frase (máx 15 palavras)
2. Focar em benefit pro cliente
3. Diferenciar de concorrentes

Retorne JSON:
{
  "statements": ["...", "...", "..."]
}
```

---

## 📤 EXPORTAÇÕES

### 1. PDF Document
- Documento formatado (marca do mentorado)
- Pronto pra imprimir ou compartilhar
- Inclui: 6 pilares + templates

### 2. Markdown
- Pra colaboração (GitHub, Notion)
- Versioning amigo
- Fácil de editar

### 3. JSON
- Pra integração com Sales OS
- Automação de funis/templates
- Dados estruturados pra IA

---

## ✅ DoD (Definition of Done) — Foundation OS

Considerado pronto quando:

- [ ] 6 pilares documentados
- [ ] Wizard funcional end-to-end
- [ ] IA dando sugestões sensatas
- [ ] Exportações funcionando (PDF, MD, JSON)
- [ ] 100 mentorados completando o wizard
- [ ] NPS > 8 (feedback inicial)
- [ ] Documentação completa (vídeos + guias)
- [ ] Integrado com resto do Jarvis

---

_Especificação criada: 20 Fev 2026_
_Atualizar conforme feedback de mentorados_
