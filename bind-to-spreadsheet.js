#!/usr/bin/env node

/**
 * bind-to-spreadsheet.js
 *
 * Script para criar automaticamente um container-bound script na planilha
 * e fazer push do código para lá.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SPREADSHEET_ID = '1nwEtOMb7uGm0ZXEM_xcQLAJQSOAjhgMSsve_7KXycjI';
const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

console.log('\n' + '='.repeat(80));
console.log('🔗 NEOFORMULA FINANCE - VINCULAR SCRIPT À PLANILHA');
console.log('='.repeat(80) + '\n');

console.log('📊 Planilha:', SPREADSHEET_URL);
console.log('');

// Verificar se está logado no clasp
try {
    execSync('npx clasp login --status', { stdio: 'pipe' });
    console.log('✅ Você está autenticado no clasp\n');
} catch (error) {
    console.log('❌ Você NÃO está autenticado no clasp\n');
    console.log('Execute primeiro: npx clasp login\n');
    process.exit(1);
}

console.log('━'.repeat(80));
console.log('📋 INSTRUÇÕES PASSO A PASSO:');
console.log('━'.repeat(80));
console.log('');

console.log('Infelizmente, o clasp não consegue criar automaticamente um');
console.log('container-bound script em uma planilha existente.');
console.log('');
console.log('Você precisa fazer MANUALMENTE:');
console.log('');

console.log('PASSO 1: Criar script bound na planilha');
console.log('─'.repeat(80));
console.log('');
console.log('1. Abra a planilha (vou abrir para você agora...):');
console.log(`   ${SPREADSHEET_URL}`);
console.log('');

// Abrir planilha no navegador
const { exec } = require('child_process');
const platform = process.platform;

if (platform === 'win32') {
    exec(`start ${SPREADSHEET_URL}`);
} else if (platform === 'darwin') {
    exec(`open ${SPREADSHEET_URL}`);
} else {
    exec(`xdg-open ${SPREADSHEET_URL}`);
}

console.log('2. No menu da planilha: Extensões → Apps Script');
console.log('');
console.log('3. Um novo script será criado (vinculado à planilha)');
console.log('');
console.log('4. Copie o Script ID da URL:');
console.log('   https://script.google.com/.../projects/<ESTE_ID>/edit');
console.log('');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Cole aqui o Script ID do script bound: ', (boundScriptId) => {
    boundScriptId = boundScriptId.trim();

    if (!boundScriptId) {
        console.log('\n❌ Script ID não pode estar vazio!');
        rl.close();
        process.exit(1);
    }

    console.log('\n✅ Script ID recebido:', boundScriptId);
    console.log('');

    console.log('PASSO 2: Configurar e fazer push');
    console.log('─'.repeat(80));
    console.log('');

    // Criar pasta temporária
    const tempDir = path.join(__dirname, 'temp-bound');

    if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
    }
    fs.mkdirSync(tempDir);

    // Criar .clasp.json para o script bound
    const claspConfig = {
        scriptId: boundScriptId,
        rootDir: './src'
    };

    fs.writeFileSync(
        path.join(tempDir, '.clasp.json'),
        JSON.stringify(claspConfig, null, 2)
    );

    // Copiar arquivos src
    const srcDir = path.join(__dirname, 'src');
    const destSrcDir = path.join(tempDir, 'src');

    fs.cpSync(srcDir, destSrcDir, { recursive: true });

    // Copiar .claspignore se existir
    const claspignorePath = path.join(__dirname, '.claspignore');
    if (fs.existsSync(claspignorePath)) {
        fs.copyFileSync(claspignorePath, path.join(tempDir, '.claspignore'));
    }

    console.log('✅ Arquivos copiados para pasta temporária');
    console.log('');

    console.log('📤 Fazendo push para o script bound...');
    console.log('');

    try {
        // Fazer push
        execSync('npx clasp push --force', {
            cwd: tempDir,
            stdio: 'inherit'
        });

        console.log('');
        console.log('='.repeat(80));
        console.log('✅ SUCESSO! Script vinculado à planilha!');
        console.log('='.repeat(80));
        console.log('');

        console.log('📋 PRÓXIMOS PASSOS:');
        console.log('');
        console.log('1. Recarregue a planilha (F5)');
        console.log('2. O menu "Neoformula Finance" deve aparecer!');
        console.log('3. Teste: Neoformula Finance → Abrir Dashboard');
        console.log('4. Autorize o script quando solicitado');
        console.log('');

        console.log('🔗 Link da planilha:');
        console.log(`   ${SPREADSHEET_URL}`);
        console.log('');

        // Limpar pasta temporária
        fs.rmSync(tempDir, { recursive: true });

    } catch (error) {
        console.error('\n❌ Erro ao fazer push:', error.message);
        console.log('');
        console.log('Tente verificar se você tem permissão para editar o script.');
        console.log('');
    }

    rl.close();
});
