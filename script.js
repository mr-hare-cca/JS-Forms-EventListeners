// Unit 8.7 – Forms & EventListeners solution

(function () {
  // --- Element refs ---
  const nameInput = document.getElementById('myInput');
  const out = document.getElementById('myPara');
  const btnCalc = document.getElementById('btnCalc');
  const btnClear = document.getElementById('clearBtn');
  const serviceSelect = document.getElementById('serviceSelect');

  // Radios (sizes)
  const r1 = document.getElementById('r1'); // Small
  const r2 = document.getElementById('r2'); // Medium
  const r3 = document.getElementById('r3'); // Large (default)
  const r4 = document.getElementById('r4'); // XL

  // Checkboxes (toppings cb1..cb8)
  const toppings = [];
  for (let i = 1; i <= 8; i++) {
    toppings.push(document.getElementById('cb' + i));
  }

  // --- Pricing constants (as spec/test expects) ---
  const PRICE = {
    size: { r1: 7.5, r2: 10.0, r3: 12.5, r4: 15.0 },
    topping: 0.5,
    delivery: 3.0
  };

  function getSizePrice() {
    if (r1 && r1.checked) return PRICE.size.r1;
    if (r2 && r2.checked) return PRICE.size.r2;
    if (r3 && r3.checked) return PRICE.size.r3;
    if (r4 && r4.checked) return PRICE.size.r4;
    // Fallback to Large if nothing selected
    return PRICE.size.r3;
  }

  function countToppings() {
    let count = 0;
    for (const cb of toppings) {
      if (cb && cb.checked) count++;
    }
    return count;
  }

  function calcTotal() {
    const base = getSizePrice();
    const extra = countToppings() * PRICE.topping;
    const svc = serviceSelect && serviceSelect.value === 'delivery' ? PRICE.delivery : 0;
    return base + extra + svc;
  }

  // --- Event listeners (no inline onclick) ---
  btnCalc?.addEventListener('click', () => {
    const name = (nameInput?.value || '').trim();
    const total = calcTotal();

    // Output text must include the numeric total (tests read the first number)
    // Keep it simple and deterministic:
    const who = name ? `Hello, ${name}. ` : '';
    out.textContent = `${who}Total: ${total.toFixed(2)}`;
  });

  btnClear?.addEventListener('click', () => {
    if (nameInput) nameInput.value = '';
    if (out) out.textContent = '';

    // Reset size to Large (r3) as default
    if (r1) r1.checked = false;
    if (r2) r2.checked = false;
    if (r3) r3.checked = true;
    if (r4) r4.checked = false;

    // Reset dropdown to dine-in
    if (serviceSelect) serviceSelect.value = 'dinein';

    // Uncheck all toppings
    for (const cb of toppings) {
      if (cb) cb.checked = false;
    }
  });
})();
