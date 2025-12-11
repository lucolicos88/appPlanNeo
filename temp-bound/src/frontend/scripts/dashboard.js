/**
 * dashboard.js
 *
 * Scripts específicos da view Dashboard.
 */

<script>
  'use strict';

  // ========================================================================
  // CARREGAMENTO DE DADOS
  // ========================================================================

  /**
   * Carrega dados do dashboard
   */
  async function loadDashboard() {
    try {
      // TODO: Descomentar quando backend estiver pronto
      // const data = await AppHelpers.callBackend('getDashboardData', {
      //   year: new Date().getFullYear(),
      //   month: new Date().getMonth() + 1
      // });

      // Mock data para desenvolvimento
      const data = {
        receitaBruta: 150000,
        receitaLiquida: 135000,
        ebitda: 25000,
        ebitdaPct: 18.5,
        saldoCaixa: 45000,
        kpis: [
          { metric: 'DESCONTO_MEDIO', value: 4.5, faixa: 'BOM', unit: '%' },
          { metric: 'MARGEM_BRUTA', value: 35.2, faixa: 'EXCELENTE', unit: '%' },
          { metric: 'EBITDA_PCT', value: 18.5, faixa: 'BOM', unit: '%' },
          { metric: 'MARGEM_LIQUIDA', value: 12.3, faixa: 'SENSACIONAL', unit: '%' }
        ],
        topDespesas: [
          { descricao: 'Folha de Pagamento', valor: 45000 },
          { descricao: 'Aluguel', valor: 12000 },
          { descricao: 'Marketing Digital', valor: 8500 }
        ]
      };

      renderDashboard(data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      AppHelpers.showError('resumo-financeiro', 'Erro ao carregar dados do dashboard');
    }
  }

  // ========================================================================
  // RENDERIZAÇÃO
  // ========================================================================

  /**
   * Renderiza KPIs no grid
   */
  function renderKPIs(kpis) {
    const grid = document.getElementById('kpis-grid');
    if (!grid) return;

    grid.innerHTML = '';

    kpis.forEach(kpi => {
      const card = document.createElement('div');
      card.className = 'card';

      const badgeClass = `kpi-badge-${kpi.faixa.toLowerCase()}`;

      card.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-sm text-secondary">${getKPILabel(kpi.metric)}</h3>
          <span class="${badgeClass}">${kpi.faixa}</span>
        </div>
        <div class="text-3xl font-bold mb-1">${formatKPIValue(kpi.value, kpi.unit)}</div>
        <div class="text-xs text-muted">${kpi.unit}</div>
      `;

      grid.appendChild(card);
    });
  }

  /**
   * Renderiza resumo financeiro
   */
  function renderResumoFinanceiro(data) {
    const tbody = document.getElementById('resumo-financeiro');
    if (!tbody) return;

    tbody.innerHTML = `
      <tr>
        <td class="font-semibold">Receita Bruta</td>
        <td class="text-right font-semibold">${AppHelpers.formatMoney(data.receitaBruta)}</td>
      </tr>
      <tr>
        <td class="font-semibold">Receita Líquida</td>
        <td class="text-right font-semibold">${AppHelpers.formatMoney(data.receitaLiquida)}</td>
      </tr>
      <tr>
        <td class="font-semibold">EBITDA</td>
        <td class="text-right font-semibold text-primary">${AppHelpers.formatMoney(data.ebitda)}</td>
      </tr>
      <tr>
        <td class="font-semibold">EBITDA %</td>
        <td class="text-right font-semibold text-primary">${AppHelpers.formatPercentage(data.ebitdaPct)}</td>
      </tr>
      <tr>
        <td class="font-semibold">Saldo em Caixa</td>
        <td class="text-right font-semibold">${AppHelpers.formatMoney(data.saldoCaixa)}</td>
      </tr>
    `;
  }

  /**
   * Renderiza top despesas
   */
  function renderTopDespesas(despesas) {
    const container = document.getElementById('top-despesas');
    if (!container) return;

    if (!despesas || despesas.length === 0) {
      container.innerHTML = '<p class="text-muted">Nenhuma despesa encontrada</p>';
      return;
    }

    const html = despesas.map(d => `
      <div class="flex justify-between items-center mb-2 p-2 bg-app" style="border-radius: var(--radius-sm);">
        <span class="text-sm">${d.descricao}</span>
        <span class="font-semibold">${AppHelpers.formatMoney(d.valor)}</span>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  /**
   * Renderiza dashboard completo
   */
  function renderDashboard(data) {
    renderKPIs(data.kpis);
    renderResumoFinanceiro(data);
    renderTopDespesas(data.topDespesas);
  }

  // ========================================================================
  // HELPERS
  // ========================================================================

  function getKPILabel(metric) {
    const labels = {
      DESCONTO_MEDIO: 'Desconto Médio',
      CMA: 'CMA',
      CMV: 'CMV',
      MARGEM_BRUTA: 'Margem Bruta',
      MARGEM_LIQUIDA: 'Margem Líquida',
      EBITDA_PCT: 'EBITDA %',
      DESPESAS_FIXAS_PCT: 'Despesas Fixas %',
      SALDO_CAIXA: 'Saldo em Caixa'
    };

    return labels[metric] || metric;
  }

  function formatKPIValue(value, unit) {
    if (unit === '%') {
      return value.toFixed(2).replace('.', ',');
    } else if (unit === 'R$') {
      return AppHelpers.formatMoney(value);
    } else {
      return value.toFixed(2).replace('.', ',');
    }
  }

  // ========================================================================
  // INICIALIZAÇÃO
  // ========================================================================

  document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
  });
</script>
