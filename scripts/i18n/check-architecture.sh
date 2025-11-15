#!/bin/bash

echo "🔍 Vérification de l'architecture Types et Endpoints..."

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour vérifier la compilation TypeScript
check_typescript() {
    echo -e "${YELLOW}📘 Vérification TypeScript...${NC}"
    npx tsc --noEmit
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Compilation TypeScript OK${NC}"
    else
        echo -e "${RED}❌ Erreurs TypeScript détectées${NC}"
        return 1
    fi
}

# Vérifier que les endpoints sont utilisés correctement
check_endpoints_usage() {
    echo -e "${YELLOW}🌐 Vérification utilisation endpoints centralisés...${NC}"
    
    # Chercher les anciens patterns (imports directs d'endpoints)
    old_patterns=$(grep -r "import.*auth.*from.*endpoints" features/ services/ 2>/dev/null || true)
    
    if [ -z "$old_patterns" ]; then
        echo -e "${GREEN}✅ Aucun import direct d'endpoint trouvé${NC}"
    else
        echo -e "${RED}❌ Imports directs trouvés:${NC}"
        echo "$old_patterns"
        return 1
    fi
    
    # Vérifier l'utilisation des endpoints centralisés
    endpoint_usage=$(grep -r "endpoints\." features/ services/ | wc -l)
    echo -e "${GREEN}✅ ${endpoint_usage} utilisations d'endpoints centralisés trouvées${NC}"
}

# Vérifier l'utilisation des types centralisés
check_types_usage() {
    echo -e "${YELLOW}📋 Vérification utilisation types centralisés...${NC}"
    
    # Compter les imports de types
    auth_types=$(grep -r "from.*auth\.types" features/ | wc -l)
    home_types=$(grep -r "from.*home\.types" features/ | wc -l)
    onboarding_types=$(grep -r "from.*onboarding\.types" features/ | wc -l)
    
    echo -e "${GREEN}✅ Types auth utilisés: ${auth_types} fois${NC}"
    echo -e "${GREEN}✅ Types home utilisés: ${home_types} fois${NC}"
    echo -e "${GREEN}✅ Types onboarding utilisés: ${onboarding_types} fois${NC}"
}

# Vérifier les doublons de types
check_duplicate_types() {
    echo -e "${YELLOW}🔍 Vérification doublons de types...${NC}"
    
    # Chercher les interfaces dupliquées
    duplicates=$(grep -r "interface.*User\|interface.*Product\|interface.*Category" features/ services/ | grep -v "types\.ts" || true)
    
    if [ -z "$duplicates" ]; then
        echo -e "${GREEN}✅ Aucun doublon de type trouvé${NC}"
    else
        echo -e "${YELLOW}⚠️ Doublons potentiels trouvés:${NC}"
        echo "$duplicates"
    fi
}

# Exécuter toutes les vérifications
echo "🚀 Démarrage des vérifications..."
echo "=================================="

all_good=true

if ! check_typescript; then
    all_good=false
fi

echo ""
if ! check_endpoints_usage; then
    all_good=false
fi

echo ""
check_types_usage

echo ""
check_duplicate_types

echo ""
echo "=================================="

if [ "$all_good" = true ]; then
    echo -e "${GREEN}🎉 Toutes les vérifications sont OK !${NC}"
    echo -e "${GREEN}L'architecture Types et Endpoints est propre.${NC}"
else
    echo -e "${RED}❌ Des problèmes ont été détectés.${NC}"
    echo -e "${YELLOW}Consultez les messages ci-dessus pour les corrections.${NC}"
fi