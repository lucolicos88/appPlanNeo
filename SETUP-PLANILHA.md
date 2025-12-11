# 🚀 SETUP - Vincular Script à Planilha

O menu não aparece porque o script está **standalone** (separado da planilha). Precisamos vinculá-lo.

---

## ✅ MÉTODO MAIS SIMPLES (Copiar & Colar)

### **Passo 1: Abra a planilha**
👉 https://docs.google.com/spreadsheets/d/1nwEtOMb7uGm0ZXEM_xcQLAJQSOAjhgMSsve_7KXycjI/edit

### **Passo 2: Abra o Apps Script da planilha**
- Menu: **Extensões** → **Apps Script**
- Uma nova aba vai abrir com um editor de código

### **Passo 3: Limpe o código atual**
- Selecione TODO o código que está lá (Ctrl+A)
- Delete (Delete ou Backspace)

### **Passo 4: Abra o script standalone**
👉 https://script.google.com/home/projects/1oCsDGmEApZkEDwpnK_ZNG3rKCPYXEgxK0me6bqbzLYXTUav1R1TBaoJC/edit

### **Passo 5: Copie TODO o código**

No script standalone, você verá vários arquivos (.gs) no lado esquerdo:

1. Clique em cada arquivo `.gs` (main, config-service, etc.)
2. Copie TODO o conteúdo (Ctrl+A, Ctrl+C)
3. Cole no editor da planilha (Ctrl+V)

**OU** use o atalho:

1. No script standalone, clique em **"Arquivo"** → **"Fazer download"** → **"ZIP"**
2. Extraia o ZIP
3. Abra os arquivos `.gs` e copie o conteúdo

### **Passo 6: Salve e Teste**
- Salve o código (Ctrl+S)
- **Volte para a planilha** e recarregue (F5)
- O menu **"Neoformula Finance"** deve aparecer!

---

## 🔧 MÉTODO AUTOMÁTICO (PowerShell)

Se preferir automação, execute:

```bash
npm run setup-bound
```

O script vai:
1. Abrir a planilha no navegador
2. Pedir o Script ID do script bound
3. Fazer o push automático do código

**Siga as instruções na tela!**

---

## 📋 Criar Abas da Planilha

Depois que o menu aparecer, crie as seguintes abas manualmente:

### Configuração (CFG_*)
- CFG_CONFIG
- CFG_BENCHMARKS
- CFG_LABELS
- CFG_THEME
- CFG_DFC
- CFG_VALIDATION

### Referência (REF_*)
- REF_PLANO_CONTAS
- REF_FILIAIS
- REF_CANAIS
- REF_CCUSTO
- REF_NATUREZAS

### Transacional (TB_*)
- TB_LANCAMENTOS
- TB_EXTRATOS
- TB_DRE_MENSAL
- TB_DRE_RESUMO
- TB_DFC_REAL
- TB_DFC_PROJ
- TB_KPI_RESUMO
- TB_KPI_DETALHE

### Relatórios (RPT_*)
- RPT_COMITE_FATURAMENTO
- RPT_COMITE_DRE
- RPT_COMITE_DFC
- RPT_COMITE_KPIS

---

## ❓ Problemas?

### "Não consigo copiar todo o código"
- Use: Menu → Arquivo → Fazer download → ZIP
- Extraia e copie os arquivos .gs

### "O menu ainda não aparece"
- Recarregue a planilha (F5)
- Limpe cache (Ctrl+Shift+R)
- Verifique se salvou o código (Ctrl+S)

### "Erro de permissão"
- Na primeira vez, o Google vai pedir autorização
- Clique em "Autorizar" e siga os passos

---

## 🎯 Próximos Passos

Depois que o menu aparecer:

1. **Neoformula Finance** → **Administração** → **Instalar Triggers**
2. Autorize quando solicitado
3. Comece a usar! 🚀

---

**Links Rápidos:**
- 📊 Planilha: https://docs.google.com/spreadsheets/d/1nwEtOMb7uGm0ZXEM_xcQLAJQSOAjhgMSsve_7KXycjI/edit
- 📜 Script: https://script.google.com/home/projects/1oCsDGmEApZkEDwpnK_ZNG3rKCPYXEgxK0me6bqbzLYXTUav1R1TBaoJC/edit
