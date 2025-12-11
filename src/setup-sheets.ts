/**
 * setup-sheets.ts
 *
 * Script para criar toda a estrutura de abas e dados iniciais da planilha
 */

import {
  SHEET_CFG_CONFIG,
  SHEET_CFG_BENCHMARKS,
  SHEET_CFG_LABELS,
  SHEET_CFG_THEME,
  SHEET_CFG_DFC,
  SHEET_CFG_VALIDATION,
  SHEET_REF_PLANO_CONTAS,
  SHEET_REF_FILIAIS,
  SHEET_REF_CANAIS,
  SHEET_REF_CCUSTO,
  SHEET_REF_NATUREZAS,
  SHEET_TB_LANCAMENTOS,
  SHEET_TB_EXTRATOS,
  SHEET_TB_DRE_MENSAL,
  SHEET_TB_DRE_RESUMO,
  SHEET_TB_DFC_REAL,
  SHEET_TB_DFC_PROJ,
  SHEET_TB_KPI_RESUMO,
  SHEET_TB_KPI_DETALHE,
  SHEET_RPT_COMITE_FATURAMENTO,
  SHEET_RPT_COMITE_DRE,
  SHEET_RPT_COMITE_DFC,
  SHEET_RPT_COMITE_KPIS,
} from './config/sheet-mapping';

/**
 * Cria todas as abas necessárias
 */
function setupAllSheets(): void {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetsToCreate = [
    // Configuração
    SHEET_CFG_CONFIG,
    SHEET_CFG_BENCHMARKS,
    SHEET_CFG_LABELS,
    SHEET_CFG_THEME,
    SHEET_CFG_DFC,
    SHEET_CFG_VALIDATION,

    // Referência
    SHEET_REF_PLANO_CONTAS,
    SHEET_REF_FILIAIS,
    SHEET_REF_CANAIS,
    SHEET_REF_CCUSTO,
    SHEET_REF_NATUREZAS,

    // Transacional
    SHEET_TB_LANCAMENTOS,
    SHEET_TB_EXTRATOS,
    SHEET_TB_DRE_MENSAL,
    SHEET_TB_DRE_RESUMO,
    SHEET_TB_DFC_REAL,
    SHEET_TB_DFC_PROJ,
    SHEET_TB_KPI_RESUMO,
    SHEET_TB_KPI_DETALHE,

    // Relatórios
    SHEET_RPT_COMITE_FATURAMENTO,
    SHEET_RPT_COMITE_DRE,
    SHEET_RPT_COMITE_DFC,
    SHEET_RPT_COMITE_KPIS,
  ];

  const existingSheets = ss.getSheets().map(s => s.getName());
  let created = 0;
  let skipped = 0;

  sheetsToCreate.forEach(sheetName => {
    if (!existingSheets.includes(sheetName)) {
      ss.insertSheet(sheetName);
      created++;
    } else {
      skipped++;
    }
  });

  SpreadsheetApp.getUi().alert(
    'Setup Completo',
    `Abas criadas: ${created}\nAbas já existentes: ${skipped}\n\nTotal: ${sheetsToCreate.length} abas`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Popula dados iniciais nas abas de configuração
 */
function setupInitialData(): void {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // CFG_CONFIG - Configurações gerais
  const cfgConfig = ss.getSheetByName(SHEET_CFG_CONFIG);
  if (cfgConfig) {
    cfgConfig.clear();
    cfgConfig.getRange('A1:E1').setValues([[
      'Chave', 'Valor', 'Tipo', 'Descrição', 'Ativo'
    ]]).setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');

    cfgConfig.getRange('A2:E10').setValues([
      ['EMPRESA_NOME', 'Neoformula', 'TEXT', 'Nome da empresa', 'TRUE'],
      ['MOEDA_PADRAO', 'BRL', 'TEXT', 'Moeda padrão', 'TRUE'],
      ['TIMEZONE', 'America/Sao_Paulo', 'TEXT', 'Fuso horário', 'TRUE'],
      ['DRE_FORMATO', 'GERENCIAL', 'TEXT', 'Formato da DRE', 'TRUE'],
      ['CACHE_TTL_MINUTOS', '60', 'NUMBER', 'Tempo de cache em minutos', 'TRUE'],
      ['PERMITIR_LANCAMENTO_FUTURO', 'FALSE', 'BOOLEAN', 'Permitir lançamentos futuros', 'TRUE'],
      ['DIAS_AVISO_VENCIMENTO', '3', 'NUMBER', 'Dias de aviso antes do vencimento', 'TRUE'],
      ['EMAIL_NOTIFICACOES', 'financeiro@neoformula.com', 'TEXT', 'Email para notificações', 'TRUE'],
      ['APROVACAO_NECESSARIA', 'TRUE', 'BOOLEAN', 'Lançamentos precisam aprovação', 'TRUE'],
    ]);

    cfgConfig.autoResizeColumns(1, 5);
  }

  // REF_FILIAIS - Filiais
  const refFiliais = ss.getSheetByName(SHEET_REF_FILIAIS);
  if (refFiliais) {
    refFiliais.clear();
    refFiliais.getRange('A1:D1').setValues([[
      'Código', 'Nome', 'CNPJ', 'Ativa'
    ]]).setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');

    refFiliais.getRange('A2:D5').setValues([
      ['MATRIZ', 'Matriz São Paulo', '00.000.000/0001-00', 'TRUE'],
      ['FILIAL_RJ', 'Filial Rio de Janeiro', '00.000.000/0002-00', 'TRUE'],
      ['FILIAL_BH', 'Filial Belo Horizonte', '00.000.000/0003-00', 'TRUE'],
      ['FILIAL_DF', 'Filial Brasília', '00.000.000/0004-00', 'TRUE'],
    ]);

    refFiliais.autoResizeColumns(1, 4);
  }

  // REF_PLANO_CONTAS - Plano de contas simplificado
  const refPlanoContas = ss.getSheetByName(SHEET_REF_PLANO_CONTAS);
  if (refPlanoContas) {
    refPlanoContas.clear();
    refPlanoContas.getRange('A1:H1').setValues([[
      'Código', 'Descrição', 'Tipo', 'Grupo DRE', 'Subgrupo DRE', 'Grupo DFC', 'Variável/Fixa', 'CMA/CMV'
    ]]).setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');

    refPlanoContas.getRange('A2:H20').setValues([
      // Receitas
      ['1.01.001', 'Receita de Serviços', 'RECEITA', 'RECEITA_BRUTA', 'Serviços', 'OPERACIONAL', 'VARIAVEL', ''],
      ['1.01.002', 'Receita de Produtos', 'RECEITA', 'RECEITA_BRUTA', 'Produtos', 'OPERACIONAL', 'VARIAVEL', ''],
      ['1.02.001', 'Descontos Concedidos', 'RECEITA', 'DEDUCOES', 'Descontos', 'OPERACIONAL', 'VARIAVEL', ''],
      ['1.02.002', 'Impostos sobre Vendas', 'RECEITA', 'DEDUCOES', 'Impostos', 'OPERACIONAL', 'VARIAVEL', ''],

      // Custos
      ['2.01.001', 'Custo de Pessoal Direto', 'CUSTO', 'CMV_CSP', 'Pessoal', 'OPERACIONAL', 'VARIAVEL', 'CMV'],
      ['2.01.002', 'Materiais Diretos', 'CUSTO', 'CMV_CSP', 'Materiais', 'OPERACIONAL', 'VARIAVEL', 'CMV'],
      ['2.01.003', 'Serviços de Terceiros', 'CUSTO', 'CMV_CSP', 'Terceiros', 'OPERACIONAL', 'VARIAVEL', 'CMV'],

      // Despesas Operacionais
      ['3.01.001', 'Salários Administrativos', 'DESPESA', 'DESPESAS_OPERACIONAIS', 'Pessoal', 'OPERACIONAL', 'FIXA', ''],
      ['3.01.002', 'Encargos Sociais', 'DESPESA', 'DESPESAS_OPERACIONAIS', 'Pessoal', 'OPERACIONAL', 'FIXA', ''],
      ['3.02.001', 'Aluguel', 'DESPESA', 'DESPESAS_OPERACIONAIS', 'Ocupação', 'OPERACIONAL', 'FIXA', ''],
      ['3.02.002', 'Energia Elétrica', 'DESPESA', 'DESPESAS_OPERACIONAIS', 'Ocupação', 'OPERACIONAL', 'VARIAVEL', ''],
      ['3.03.001', 'Marketing e Publicidade', 'DESPESA', 'DESPESAS_OPERACIONAIS', 'Comercial', 'OPERACIONAL', 'VARIAVEL', ''],
      ['3.03.002', 'Comissões de Vendas', 'DESPESA', 'DESPESAS_OPERACIONAIS', 'Comercial', 'OPERACIONAL', 'VARIAVEL', ''],

      // Despesas Financeiras
      ['4.01.001', 'Juros de Empréstimos', 'DESPESA', 'RESULTADO_FINANCEIRO', 'Despesas Financeiras', 'FINANCEIRO', 'VARIAVEL', ''],
      ['4.01.002', 'Tarifas Bancárias', 'DESPESA', 'RESULTADO_FINANCEIRO', 'Despesas Financeiras', 'FINANCEIRO', 'FIXA', ''],

      // Receitas Financeiras
      ['4.02.001', 'Juros Recebidos', 'RECEITA', 'RESULTADO_FINANCEIRO', 'Receitas Financeiras', 'FINANCEIRO', 'VARIAVEL', ''],
      ['4.02.002', 'Descontos Obtidos', 'RECEITA', 'RESULTADO_FINANCEIRO', 'Receitas Financeiras', 'FINANCEIRO', 'VARIAVEL', ''],

      // Outras
      ['5.01.001', 'Impostos s/ Lucro', 'DESPESA', 'IMPOSTOS', 'Impostos', 'OPERACIONAL', 'VARIAVEL', ''],
      ['6.01.001', 'Resultado Não Operacional', 'RECEITA', 'OUTROS', 'Outros', 'OUTROS', 'VARIAVEL', ''],
    ]);

    refPlanoContas.autoResizeColumns(1, 8);
  }

  // REF_CCUSTO - Centros de custo
  const refCcusto = ss.getSheetByName(SHEET_REF_CCUSTO);
  if (refCcusto) {
    refCcusto.clear();
    refCcusto.getRange('A1:C1').setValues([[
      'Código', 'Descrição', 'Ativo'
    ]]).setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');

    refCcusto.getRange('A2:C10').setValues([
      ['ADM', 'Administrativo', 'TRUE'],
      ['COM', 'Comercial', 'TRUE'],
      ['FIN', 'Financeiro', 'TRUE'],
      ['MKT', 'Marketing', 'TRUE'],
      ['OPS', 'Operações', 'TRUE'],
      ['TI', 'Tecnologia da Informação', 'TRUE'],
      ['RH', 'Recursos Humanos', 'TRUE'],
      ['JUR', 'Jurídico', 'TRUE'],
      ['LOG', 'Logística', 'TRUE'],
    ]);

    refCcusto.autoResizeColumns(1, 3);
  }

  // REF_CANAIS - Canais de venda
  const refCanais = ss.getSheetByName(SHEET_REF_CANAIS);
  if (refCanais) {
    refCanais.clear();
    refCanais.getRange('A1:C1').setValues([[
      'Código', 'Descrição', 'Ativo'
    ]]).setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');

    refCanais.getRange('A2:C6').setValues([
      ['DIRETO', 'Venda Direta', 'TRUE'],
      ['ONLINE', 'E-commerce', 'TRUE'],
      ['PARCEIRO', 'Parceiros/Revendas', 'TRUE'],
      ['MARKETPLACE', 'Marketplaces', 'TRUE'],
      ['LICITACAO', 'Licitações', 'TRUE'],
    ]);

    refCanais.autoResizeColumns(1, 3);
  }

  // TB_LANCAMENTOS - Cabeçalho
  const tbLancamentos = ss.getSheetByName(SHEET_TB_LANCAMENTOS);
  if (tbLancamentos) {
    tbLancamentos.clear();
    tbLancamentos.getRange('A1:U1').setValues([[
      'ID', 'Data Competência', 'Data Vencimento', 'Data Pagamento',
      'Tipo', 'Filial', 'Centro Custo', 'Conta Gerencial', 'Conta Contábil',
      'Grupo Receita', 'Canal', 'Descrição', 'Valor Bruto', 'Desconto',
      'Juros', 'Multa', 'Valor Líquido', 'Status', 'ID Extrato Banco',
      'Origem', 'Observações'
    ]]).setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');

    tbLancamentos.autoResizeColumns(1, 21);
  }

  SpreadsheetApp.getUi().alert(
    'Dados Iniciais Criados',
    'Estrutura da planilha configurada com sucesso!\n\n' +
    '✓ Configurações iniciais\n' +
    '✓ Filiais de exemplo\n' +
    '✓ Plano de contas básico\n' +
    '✓ Centros de custo\n' +
    '✓ Canais de venda\n' +
    '✓ Estrutura de lançamentos',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Função para executar o setup completo
 */
function runCompleteSetup(): void {
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    'Setup da Planilha',
    'Este processo irá:\n\n' +
    '1. Criar todas as abas necessárias\n' +
    '2. Configurar estrutura inicial\n' +
    '3. Adicionar dados de exemplo\n\n' +
    'Deseja continuar?',
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.YES) {
    setupAllSheets();
    setupInitialData();

    ui.alert(
      'Setup Completo!',
      'A planilha está pronta para uso!\n\n' +
      'Próximo passo: teste o Dashboard no menu\n' +
      'Neoformula Finance → Abrir Dashboard',
      ui.ButtonSet.OK
    );
  }
}

// Exporta as funções
export { setupAllSheets, setupInitialData, runCompleteSetup };
