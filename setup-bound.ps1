# setup-bound.ps1
# Script PowerShell para configurar o Neoformula Finance App bound à planilha

$SPREADSHEET_ID = "1nwEtOMb7uGm0ZXEM_xcQLAJQSOAjhgMSsve_7KXycjI"
$SCRIPT_ID = "1oCsDGmEApZkEDwpnK_ZNG3rKCPYXEgxK0me6bqbzLYXTUav1R1TBaoJC"

Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 79) -ForegroundColor Cyan
Write-Host "🚀 NEOFORMULA FINANCE APP - SETUP AUTOMÁTICO" -ForegroundColor Green
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 79) -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 ETAPA 1: Criar Script Bound na Planilha" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Vou abrir sua planilha no navegador..."
Start-Process "https://docs.google.com/spreadsheets/d/$SPREADSHEET_ID/edit"
Write-Host ""

Start-Sleep -Seconds 2

Write-Host "2. No menu da planilha, clique em:" -ForegroundColor White
Write-Host "   Extensões → Apps Script" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. O Google vai criar um novo script vinculado à planilha" -ForegroundColor White
Write-Host ""

Write-Host "4. Copie o Script ID que aparece na URL" -ForegroundColor White
Write-Host "   (Algo como: https://script.google.com/.../<SCRIPT_ID>/edit)" -ForegroundColor Gray
Write-Host ""

$BOUND_SCRIPT_ID = Read-Host "Cole aqui o Script ID do script bound da planilha"

if ([string]::IsNullOrWhiteSpace($BOUND_SCRIPT_ID)) {
    Write-Host "❌ Script ID não pode estar vazio!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Script ID recebido: $BOUND_SCRIPT_ID" -ForegroundColor Green
Write-Host ""

Write-Host "📋 ETAPA 2: Configurar Clasp para o Script Bound" -ForegroundColor Yellow
Write-Host ""

# Criar pasta temporária
$tempDir = "temp-bound"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Criar .clasp.json para o script bound
$claspConfig = @{
    scriptId = $BOUND_SCRIPT_ID
    rootDir = "./src"
} | ConvertTo-Json

Set-Content -Path "$tempDir\.clasp.json" -Value $claspConfig

Write-Host "✅ Configuração criada" -ForegroundColor Green
Write-Host ""

Write-Host "📋 ETAPA 3: Copiar Arquivos do Projeto" -ForegroundColor Yellow
Write-Host ""

Copy-Item -Path "src" -Destination "$tempDir\src" -Recurse
Copy-Item -Path ".claspignore" -Destination "$tempDir\.claspignore" -ErrorAction SilentlyContinue

Write-Host "✅ Arquivos copiados" -ForegroundColor Green
Write-Host ""

Write-Host "📋 ETAPA 4: Push para o Script Bound" -ForegroundColor Yellow
Write-Host ""

Set-Location $tempDir

Write-Host "Executando: npx clasp push --force" -ForegroundColor Gray
npx clasp push --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ PUSH CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
    Write-Host ""

    Set-Location ..

    Write-Host "=" -NoNewline -ForegroundColor Cyan
    Write-Host ("=" * 79) -ForegroundColor Cyan
    Write-Host "🎉 CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
    Write-Host "=" -NoNewline -ForegroundColor Cyan
    Write-Host ("=" * 79) -ForegroundColor Cyan
    Write-Host ""

    Write-Host "📝 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Recarregue a planilha (F5)" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Você verá o menu 'Neoformula Finance' aparecer!" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Clique em: Neoformula Finance → Abrir Dashboard" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Autorize o script quando solicitado" -ForegroundColor White
    Write-Host ""

    # Limpar pasta temporária
    Set-Location ..
    Remove-Item -Recurse -Force $tempDir

    Write-Host "🔗 Link da planilha:" -ForegroundColor Cyan
    Write-Host "   https://docs.google.com/spreadsheets/d/$SPREADSHEET_ID/edit" -ForegroundColor Blue
    Write-Host ""

} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifique se você está autenticado no clasp:" -ForegroundColor Yellow
    Write-Host "   npx clasp login" -ForegroundColor Cyan
    Write-Host ""
    Set-Location ..
}
