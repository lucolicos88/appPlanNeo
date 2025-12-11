/**
 * forms.js
 *
 * Scripts para validação e submissão de formulários.
 */

<script>
  'use strict';

  // ========================================================================
  // VALIDAÇÃO DE FORMULÁRIOS
  // ========================================================================

  /**
   * Valida campo obrigatório
   */
  function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
      return `${fieldName} é obrigatório`;
    }
    return null;
  }

  /**
   * Valida valor monetário
   */
  function validateMoney(value, fieldName) {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return `${fieldName} deve ser um valor positivo`;
    }
    return null;
  }

  /**
   * Valida data
   */
  function validateDate(value, fieldName) {
    if (!value) {
      return `${fieldName} é obrigatório`;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return `${fieldName} não é uma data válida`;
    }

    return null;
  }

  /**
   * Exibe erros de validação no formulário
   */
  function showFormErrors(errors) {
    // Limpa erros anteriores
    document.querySelectorAll('.form-error').forEach(el => {
      el.textContent = '';
    });

    // Exibe novos erros
    for (const [field, message] of Object.entries(errors)) {
      const errorEl = document.getElementById(`${field}-error`);
      if (errorEl) {
        errorEl.textContent = message;
      }
    }
  }

  // ========================================================================
  // SUBMISSÃO DE FORMULÁRIOS
  // ========================================================================

  /**
   * Submit handler genérico
   */
  async function handleFormSubmit(formId, backendFunction) {
    const form = document.getElementById(formId);
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await AppHelpers.callBackend(backendFunction, data);

      if (result.success) {
        AppHelpers.showSuccess(result.message);
        form.reset();
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      alert(`Erro ao processar formulário: ${error.message}`);
    }
  }

  // ========================================================================
  // EXPORTAR GLOBALMENTE
  // ========================================================================

  window.FormHelpers = {
    validateRequired,
    validateMoney,
    validateDate,
    showFormErrors,
    handleFormSubmit
  };
</script>
