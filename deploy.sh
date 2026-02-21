#!/bin/bash

echo "🚀 BrandOS Command Center — Deploy Automático"
echo "=============================================="
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Verificar dependências
echo -e "${YELLOW}1️⃣  Verificando dependências...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado${NC}"
    exit 1
fi
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ git não encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm e git OK${NC}"
echo ""

# 2. Instalar dependências
echo -e "${YELLOW}2️⃣  Instalando dependências do projeto...${NC}"
npm install --legacy-peer-deps
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 3. Verificar/criar .env.local
echo -e "${YELLOW}3️⃣  Configurando variáveis de ambiente...${NC}"
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edite .env.local com suas credenciais:${NC}"
    echo "   NEXT_PUBLIC_SUPABASE_URL=sua_url"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key"
    echo ""
    read -p "Pressione ENTER quando terminar de editar .env.local..."
fi
echo -e "${GREEN}✅ .env.local configurado${NC}"
echo ""

# 4. Git init e commit
echo -e "${YELLOW}4️⃣  Inicializando Git...${NC}"
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "feat: BrandOS Command Center MVP - pronto para deploy"
    echo -e "${YELLOW}⚠️  Execute para conectar ao GitHub:${NC}"
    echo "   git remote add origin https://github.com/arthurfbrandos-opb/brandos-command-center.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
else
    echo -e "${GREEN}✅ Git já inicializado${NC}"
fi
echo ""

# 5. Vercel CLI
echo -e "${YELLOW}5️⃣  Preparando para Vercel...${NC}"
if command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Rodando: vercel${NC}"
    vercel
else
    echo -e "${YELLOW}Instale Vercel CLI:${NC}"
    echo "   npm i -g vercel"
    echo "   vercel"
fi

echo ""
echo -e "${GREEN}=============================================="
echo "✅ Deploy iniciado!"
echo "=============================================="
echo ""
echo "Próximas ações:"
echo "1. Se não fez push no GitHub, execute:"
echo "   git push -u origin main"
echo "2. No Vercel, conecte o repo (automático)"
echo "3. Adicione variáveis de ambiente no Vercel"
echo "4. Deploy automático quando fazer push"
echo ""
echo -e "${GREEN}Seu app estará em: https://brandos-cc.vercel.app${NC}"
