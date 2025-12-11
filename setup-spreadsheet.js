/**
 * setup-spreadsheet.js
 *
 * Script para configurar automaticamente a planilha do Neoformula Finance App
 *
 * Uso: node setup-spreadsheet.js
 */

const SPREADSHEET_ID = '1nwEtOMb7uGm0ZXEM_xcQLAJQSOAjhgMSsve_7KXycjI';
const SCRIPT_ID = '1oCsDGmEApZkEDwpnK_ZNG3rKCPYXEgxK0me6bqbzLYXTUav1R1TBaoJC';

console.log('='.repeat(80));
console.log('🚀 NEOFORMULA FINANCE APP - SETUP AUTOMÁTICO');
console.log('='.repeat(80));
console.log('');

console.log('📋 INSTRUÇÕES PARA VINCULAR O SCRIPT À PLANILHA:');
console.log('');
console.log('Infelizmente, o Google Apps Script não permite vincular automaticamente');
console.log('um script standalone a uma planilha via CLI.');
console.log('');
console.log('Você precisa fazer MANUALMENTE os seguintes passos:');
console.log('');

console.log('─'.repeat(80));
console.log('OPÇÃO 1: COPIAR SCRIPT PARA A PLANILHA (RECOMENDADO)');
console.log('─'.repeat(80));
console.log('');
console.log('1. Abra sua planilha:');
console.log(`   https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`);
console.log('');
console.log('2. Menu: Extensões → Apps Script');
console.log('');
console.log('3. No editor que abrir, DELETE todo o código existente');
console.log('');
console.log('4. Abra o script standalone:');
console.log(`   https://script.google.com/home/projects/${SCRIPT_ID}/edit`);
console.log('');
console.log('5. COPIE TODO o código de TODOS os arquivos (.gs) do projeto standalone');
console.log('');
console.log('6. COLE no editor da planilha');
console.log('');
console.log('7. Salve (Ctrl+S)');
console.log('');
console.log('8. Recarregue a planilha (F5)');
console.log('');
console.log('9. O menu "Neoformula Finance" aparecerá!');
console.log('');

console.log('─'.repeat(80));
console.log('OPÇÃO 2: USAR CLASP CLONE (MAIS TÉCNICO)');
console.log('─'.repeat(80));
console.log('');
console.log('Vou criar um script automático para você...');
console.log('');

// Gerar script de setup
const setupScript = `
#!/bin/bash

echo "🔧 Configurando Neoformula Finance App..."
echo ""

# Passo 1: Criar script bound na planilha
echo "📝 Passo 1: Você precisa criar um script bound manualmente"
echo "   1. Abra: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit"
echo "   2. Menu: Extensões → Apps Script"
echo "   3. Copie o ID do script que foi criado"
echo ""

read -p "Cole aqui o Script ID do script bound: " BOUND_SCRIPT_ID

echo ""
echo "📦 Passo 2: Clonando código para o script bound..."

# Criar nova pasta temporária
mkdir -p temp-bound
cd temp-bound

# Configurar clasp para o script bound
echo "{\\"scriptId\\": \\"$BOUND_SCRIPT_ID\\"}" > .clasp.json

# Copiar arquivos
echo "📁 Copiando arquivos..."
cp -r ../src/* .

# Push para o script bound
echo "⬆️  Fazendo push..."
npx clasp push --force

echo ""
echo "✅ CONCLUÍDO!"
echo ""
echo "🔄 Agora recarregue a planilha (F5) e o menu aparecerá!"
`;

console.log('Salvando script de setup...');
require('fs').writeFileSync('setup-bound.sh', setupScript);
console.log('✅ Script salvo em: setup-bound.sh');
console.log('');

console.log('─'.repeat(80));
console.log('OPÇÃO 3: SCRIPT AUTOMÁTICO SIMPLIFICADO');
console.log('─'.repeat(80));
console.log('');
console.log('Execute: npm run setup-bound');
console.log('');

console.log('='.repeat(80));
console.log('');
console.log('💡 DICA: Use a OPÇÃO 1 que é mais simples e garantida!');
console.log('');
