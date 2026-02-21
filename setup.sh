#!/bin/bash

echo "🟢 BrandOS Command Center — Setup Automático"
echo "=============================================="
echo ""

# 1. Verificar se npm tá instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale Node.js primeiro."
    exit 1
fi

echo "✅ npm encontrado"
echo ""

# 2. Instalar dependências
echo "📦 Instalando dependências..."
npm install --legacy-peer-deps
echo "✅ Dependências instaladas"
echo ""

# 3. Copiar .env.example
echo "🔑 Criando .env.local..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "⚠️  Edite .env.local com suas credenciais Supabase!"
    echo "   NEXT_PUBLIC_SUPABASE_URL=seu_url"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key"
else
    echo "✅ .env.local já existe"
fi
echo ""

# 4. GitHub
echo "📂 Inicializando Git..."
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "initial: BrandOS Command Center MVP"
    echo ""
    echo "⚠️  Faça push manualmente:"
    echo "   git remote add origin https://github.com/arthurfbrandos-opb/brandos-command-center.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
else
    echo "✅ Git já inicializado"
fi
echo ""

# 5. Pronto
echo "=============================================="
echo "✅ Setup completo!"
echo ""
echo "Próximos passos:"
echo "1. Edite .env.local com credenciais Supabase"
echo "2. npm run dev"
echo "3. Abra http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
