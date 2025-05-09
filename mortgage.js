document.addEventListener('DOMContentLoaded', () => {
  const importeInput = document.getElementById('importe');
  const comunidadInput = document.getElementById('comunidad');
  const ibiInput = document.getElementById('ibi');
  const resultDiv = document.getElementById('result');

  function calcular() {
    const importe = parseFloat(importeInput.value);
    const anios = 30; 
    const comunidad = parseFloat(comunidadInput.value) || 0;
    const seguros = 800;
    const ibi = parseFloat(ibiInput.value) || 0;
    if (isNaN(importe) || importe <= 0) {
      resultDiv.style.display = 'none';
      resultDiv.classList.remove('warning');
      return;
    }
    const impuestos = importe * 0.12;
    const entrada = importe * 0.10;
    const totalAportar = impuestos + entrada;
    const capitalHipoteca = importe - entrada;
    const interesAnual = 0.0225;
    const nPeriodos = anios * 12;
    const interesMensual = interesAnual / 12;
    // Fórmula de cuota fija: C = P * [i(1+i)^n] / [(1+i)^n - 1]
    const cuota = capitalHipoteca * (interesMensual * Math.pow(1 + interesMensual, nPeriodos)) / (Math.pow(1 + interesMensual, nPeriodos) - 1);
    const cuotaTotalMensual = cuota + comunidad + (ibi/12) + (seguros/12);
    // Fondo rojo solo si la cuota mensual total estimada supera 850
    if (cuotaTotalMensual > 850) {
      resultDiv.classList.add('warning');
    } else {
      resultDiv.classList.remove('warning');
    }
    let extraInfo = '';
    if (totalAportar > 40000) {
      const restante = totalAportar - 40000;
      extraInfo = `
        <div class="extra-info">
          <strong>Dinero extra necesario:</strong> ${restante.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}
        </div>
      `;
    }
    resultDiv.innerHTML = `
      <div style="margin-bottom:1em;">
        <p><strong>Impuestos (12%):</strong> ${impuestos.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
        <p><strong>Entrada (10%):</strong> ${entrada.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
        <p class="highlight"><strong>Total a aportar inicialmente:</strong> ${totalAportar.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
        ${extraInfo}
      </div>
      <hr>
      <div style="margin-bottom:1em;">
        <p><strong>IBI anual:</strong> ${ibi.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
        <p><strong>Seguros anuales:</strong> ${seguros.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
      </div>
      <hr>
      <p><strong>Cuota de hipoteca:</strong> ${cuota.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
      <p><strong>Gastos de comunidad:</strong> ${comunidad.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
      <p><strong>IBI mensual:</strong> ${(ibi/12).toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
      <p><strong>Seguro mensual:</strong> ${(seguros/12).toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
      <hr>
      <p class="highlight"><strong>Cuota mensual total estimada:</strong> ${cuotaTotalMensual.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
      <p style="font-size:0.9em;color:#888;">Interés: 2,250% | TAE: 2,271% | Plazo: ${nPeriodos} meses (30 años)</p>
    `;
    resultDiv.style.display = 'block';
  }

  importeInput.addEventListener('input', calcular);
  comunidadInput.addEventListener('input', calcular);
  ibiInput.addEventListener('input', calcular);
  calcular();
});
