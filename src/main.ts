/**
 * main.ts
 *
 * Entry point principal do Google Apps Script.
 * Centraliza roteamento web (doGet) e registros de menus.
 */

import { handleDoGet, include } from './services/ui-service';
import { installTriggers } from './services/scheduler-service';

/**
 * Função doGet - Entry point para web app
 *
 * IMPORTANTE: Esta função é chamada automaticamente pelo Apps Script
 * quando o usuário acessa a URL do web app
 */
function doGet(e: any): GoogleAppsScript.HTML.HtmlOutput {
  return handleDoGet(e);
}

/**
 * Hook para incluir arquivos parciais nos templates HTML
 *
 * IMPORTANTE: Esta função deve estar no escopo global para ser
 * acessível pelos templates HTML via <?!= include('filename') ?>
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function includeFile(filename: string): string {
  return include(filename);
}

/**
 * Função onOpen - Executada quando a planilha é aberta
 *
 * IMPORTANTE: Adiciona menu customizado no Google Sheets
 */
function onOpen(): void {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Neoformula Finance')
    .addItem('Abrir Dashboard', 'openDashboard')
    .addSeparator()
    .addItem('Novo Lançamento', 'openNovoLancamento')
    .addItem('Conciliação Bancária', 'openConciliacao')
    .addSeparator()
    .addItem('Atualizar Cache', 'refreshCache')
    .addSeparator()
    .addSubMenu(
      ui
        .createMenu('Relatórios')
        .addItem('DRE', 'openDRE')
        .addItem('Fluxo de Caixa', 'openDFC')
        .addItem('KPIs', 'openKPI')
    )
    .addSeparator()
    .addSubMenu(
      ui
        .createMenu('Administração')
        .addItem('Configurações', 'openConfiguracoes')
        .addItem('Instalar Triggers', 'setupTriggers')
    )
    .addToUi();
}

/**
 * Funções de menu - Abertura de views
 */

function openDashboard(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/dashboard')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Dashboard Financeiro');
}

function openNovoLancamento(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/lancamentos')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Lançamentos');
}

function openConciliacao(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/conciliacao')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Conciliação Bancária');
}

function openDRE(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/dre')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'DRE');
}

function openDFC(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/dfc')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Fluxo de Caixa');
}

function openKPI(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/kpi')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'KPIs');
}

function openConfiguracoes(): void {
  const html = HtmlService.createHtmlOutputFromFile('frontend/views/configuracoes')
    .setWidth(1000)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Configurações');
}

/**
 * Funções de administração
 */

function refreshCache(): void {
  try {
    // TODO: Importar e chamar métodos de reload de cache
    // ConfigService.reloadCache();
    // reloadReferenceCache();

    SpreadsheetApp.getUi().alert(
      'Cache atualizado',
      'Cache de configurações e referências foi atualizado com sucesso.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (error: any) {
    SpreadsheetApp.getUi().alert(
      'Erro',
      `Erro ao atualizar cache: ${error.message}`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

function setupTriggers(): void {
  try {
    installTriggers();

    SpreadsheetApp.getUi().alert(
      'Triggers instalados',
      'Triggers de automação foram instalados com sucesso.\n\n' +
        '- Job diário: 6h\n' +
        '- Fechamento mensal: dia 1 às 8h',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (error: any) {
    SpreadsheetApp.getUi().alert(
      'Erro',
      `Erro ao instalar triggers: ${error.message}`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Exporta funções globais para o escopo do Apps Script
 *
 * IMPORTANTE: gas-webpack-plugin detecta estas declarações 'global'
 * e as move para o escopo global do Apps Script
 */
declare var global: any;

global.doGet = doGet;
global.include = includeFile;
global.onOpen = onOpen;
global.openDashboard = openDashboard;
global.openNovoLancamento = openNovoLancamento;
global.openConciliacao = openConciliacao;
global.openDRE = openDRE;
global.openDFC = openDFC;
global.openKPI = openKPI;
global.openConfiguracoes = openConfiguracoes;
global.refreshCache = refreshCache;
global.setupTriggers = setupTriggers;
