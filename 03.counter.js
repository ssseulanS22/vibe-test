function initApp() {
  const countEl  = document.getElementById('count');
  const btnPlus  = document.getElementById('btnPlus');
  const btnMinus = document.getElementById('btnMinus');
  const btnReset = document.getElementById('btnReset');

  let value = 0;

  // 숫자 표시 및 색상 갱신
  function render() {
    countEl.textContent = value;
    countEl.className = 'count ' + (value > 0 ? 'positive' : value < 0 ? 'negative' : 'zero');
  }

  // 짧은 bump 애니메이션
  function bump() {
    countEl.classList.add('bump');
    setTimeout(() => countEl.classList.remove('bump'), 120);
  }

  btnPlus.addEventListener('click', () => {
    value++;
    bump();
    render();
  });

  btnMinus.addEventListener('click', () => {
    value--;
    bump();
    render();
  });

  btnReset.addEventListener('click', () => {
    value = 0;
    render();
  });

  render();
}

initApp();
