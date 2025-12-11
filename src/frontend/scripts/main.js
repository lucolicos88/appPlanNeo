/**
 * main.js
 *
 * Scripts principais compartilhados entre todas as views.
 * Inicialização, handlers globais, utilitários.
 */

<script>
  'use strict';

  // ========================================================================
  // INICIALIZAÇÃO
  // ========================================================================

  document.addEventListener('DOMContentLoaded', function() {
    console.log('Neoformula Finance App initialized');
    initCurrentPeriod();
  });

  // ========================================================================
  // PERÍODO ATUAL
  // ========================================================================

  function initCurrentPeriod() {
    const now = new Date();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const periodLabel = `${months[now.getMonth()]}/${now.getFullYear()}`;

    const periodEl = document.getElementById('current-period');
    if (periodEl) {
      periodEl.textContent = periodLabel;
    }
  }

  // ========================================================================
  // HELPERS DE UI
  // ========================================================================

  /**
   * Exibe loading em um elemento
   */
  function showLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = '<div class="text-center"><div class="loading"></div><p class="text-muted mt-2">Carregando...</p></div>';
    }
  }

  /**
   * Exibe mensagem de erro em um elemento
   */
  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = `<div class="alert alert-error">${message}</div>`;
    }
  }

  /**
   * Exibe mensagem de sucesso
   */
  function showSuccess(message) {
    // TODO: Implementar toast/notification
    alert(message);
  }

  /**
   * Recarrega dados da página atual
   */
  function reloadData() {
    window.location.reload();
  }

  // ========================================================================
  // HELPERS DE FORMATAÇÃO
  // ========================================================================

  /**
   * Formata valor monetário
   */
  function formatMoney(value) {
    if (value === null || value === undefined) return 'R$ 0,00';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  /**
   * Formata percentual
   */
  function formatPercentage(value) {
    if (value === null || value === undefined) return '0,00%';

    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  }

  /**
   * Formata data
   */
  function formatDate(dateStr) {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  }

  // ========================================================================
  // CHAMADAS AO BACKEND (google.script.run)
  // ========================================================================

  /**
   * Wrapper genérico para chamadas ao backend
   */
  function callBackend(functionName, params) {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [functionName](params);
    });
  }

  // ========================================================================
  // EXPORTAR HELPERS GLOBALMENTE
  // ========================================================================

  window.AppHelpers = {
    showLoading,
    showError,
    showSuccess,
    reloadData,
    formatMoney,
    formatPercentage,
    formatDate,
    callBackend
  };
</script>
