# ⚡ DEPLOY RÁPIDO — 5 Minutos

**Tudo que você precisa fazer:**

---

## PASSO 1: GitHub

```bash
cd /Users/arthurferreira/.openclaw/workspace

git init
git add .
git commit -m "feat: BrandOS Command Center MVP"
git remote add origin https://github.com/arthurfbrandos-opb/brandos-command-center.git
git branch -M main
git push -u origin main
```

**Resultado:** Projeto no GitHub ✅

---

## PASSO 2: Supabase

1. Ir pra https://supabase.com
2. Login com GitHub (arthurfbrandos-opb)
3. **New Project**
   - Nome: `brandos-command-center`
   - Senha: gerar forte
   - Region: `sa-east-1` (São Paulo)
4. **Settings → API**
   - Copiar: `NEXT_PUBLIC_SUPABASE_URL`
   - Copiar: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Guardar essas 2 credenciais!**

---

## PASSO 3: Vercel

1. Ir pra https://vercel.com
2. Login com GitHub
3. **Import Project**
   - Selecionar: `brandos-command-center`
4. **Environment Variables**
   - `NEXT_PUBLIC_SUPABASE_URL` = colar aqui
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = colar aqui
   - `NEXT_PUBLIC_APP_URL` = `https://brandos-cc.brandosystem.com`
5. **Deploy**

**Resultado:** App ao vivo em Vercel ✅

---

## PASSO 4: Domínio Customizado

1. No Vercel Dashboard
2. **Settings → Domains**
3. **Add Domain**
   - Adicionar: `brandos-cc.brandosystem.com`
4. Seguir instruções de DNS (apontar pro Vercel)

**Resultado:** App em brandos-cc.brandosystem.com ✅

---

## ✅ PRONTO!

Quando terminar, acessa:
```
https://brandos-cc.brandosystem.com
```

E vê:
- Header com logo BrandOS
- Sidebar colapsável
- 3 cards de projetos (Negócio Simples, CliniSales, PowerHouse)
- 2 gráficos (tasks + MRR)
- 4 KPI cards
- Atividade recente

---

**ETA:** ~5-10 minutos

**Depois:** Me avisa quando subir que adiciono auth + mais páginas!
