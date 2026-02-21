# ⚡ SETUP FINAL — BrandOS Command Center

**Tudo pronto. Segue apenas 5 passos:**

---

## 1️⃣ GitHub Repo

```bash
# Ir pra https://github.com/new
# Repository name: brandos-command-center
# Make it public
# Criar!

# Depois:
git init
git add .
git commit -m "initial: BrandOS Command Center MVP"
git remote add origin https://github.com/arthurfbrandos-opb/brandos-command-center.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Supabase

```
1. https://supabase.com → New Project
2. Email: arthurf.brandos@gmail.com
3. Database password: (generate)
4. Region: sa-east-1 (São Paulo)

Depois:
- Settings → API
- Copy: SUPABASE_URL + SUPABASE_ANON_KEY
```

---

## 3️⃣ .env.local

```bash
# Copiar .env.example pra .env.local
cp .env.example .env.local

# Editar com suas credenciais Supabase:
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 4️⃣ Instalar + Rodar

```bash
npm install
npm run dev

# Abre: http://localhost:3000
# Deve ver: Header + Sidebar + 3 cards + gráficos
```

---

## 5️⃣ Depois (Vercel Deploy)

```bash
# Quando estiver pronto:
vercel

# Configurar domínio:
vercel domains add brandos-cc.brandosystem.com
```

---

## ✅ É Isso!

MVP funcional. Home page com:
- Sidebar colapsável
- Header com status
- 3 projeto cards (progresso visual)
- 2 gráficos (tasks + MRR)
- 4 KPI cards
- Atividade recente

---

**Dúvidas?** Me avisa!

**Próximo:** Adicionar páginas + auth (depois que confirmar que local tá rodando)
