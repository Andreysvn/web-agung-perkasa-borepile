// ============================================================
// HARGA-CALCULATOR (v2 port) — KALKULATOR BORE PILE
// Port 1:1 dari public/js/harga-calculator.js (legacy).
// Perilaku, angka, dan teks keluaran disalin persis;
// yang berubah hanya cara pemasangan (modul Astro) dan nama class.
// ============================================================

import config from '../data/config.json';

interface PricingItem {
  diameter: number;
  price: number;
}

interface EquipmentInfo {
  name?: string;
  minOrder: number;
  speed: { min: number; max: number };
}

interface PricingData {
  mesin: PricingItem[];
  manual: PricingItem[];
  equipment?: Record<string, EquipmentInfo>;
}

declare global {
  interface Window {
    sendToWA?: () => void;
  }
}

// Nomor WA dari satu sumber data (config.json), menggantikan hardcoded legacy.
const WA_NUMBER = config.company.whatsapp;

// ===== ELEMEN (diisi saat initCalculator) =====
let diameterSelect: HTMLSelectElement | null = null;
let priceInput: HTMLInputElement | null = null;
let depthInput: HTMLInputElement | null = null;
let pointsInput: HTMLInputElement | null = null;
let totalPrice: HTMLElement | null = null;
let detailPrice: HTMLElement | null = null;
let estimationTime: HTMLElement | null = null;
let orderInfo: HTMLElement | null = null;
let machineSelect: HTMLSelectElement | null = null;
let machineChoices: HTMLElement | null = null;
let diameterChoices: HTMLElement | null = null;

// ===== HARGA PER METER =====
let pricing: PricingData | null = null;
let hargaMesin: Record<string, number> = {};
let hargaManual: Record<string, number> = {};

const DEFAULT_HARGA_MESIN: Record<string, number> = { '30': 120000, '40': 135000, '50': 190000, '60': 0, '80': 0 };
const DEFAULT_HARGA_MANUAL: Record<string, number> = { '20': 75000, '25': 85000, '30': 100000, '40': 120000 };
const DEFAULT_DIAMETER_MESIN: number[] = [30, 40, 50, 60, 80];
const DEFAULT_DIAMETER_MANUAL: number[] = [20, 25, 30, 40];

function getPricing(root?: HTMLElement | null): PricingData | null {
  const scope =
    root ??
    document.getElementById('calculator-heading')?.closest('section') ??
    null;
  const holder = scope?.querySelector('[data-pricing]') as HTMLElement | null;
  const raw = holder?.dataset.pricing;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PricingData;
  } catch {
    return null;
  }
}

// ===== DIAMETER OPTIONS =====
function getDiameterMesin(): number[] {
  return pricing ? pricing.mesin.map((item) => item.diameter) : DEFAULT_DIAMETER_MESIN;
}
function getDiameterManual(): number[] {
  return pricing ? pricing.manual.map((item) => item.diameter) : DEFAULT_DIAMETER_MANUAL;
}

// ===== STATE =====
let currentMethod = 'mesin';
let currentMachine = 'minicrane';

// ===== FUNCTIONS =====
function formatRupiah(angka: number): string {
  if (isNaN(angka) || angka === 0) return 'Rp 0';
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

interface ChoiceOption {
  value: string;
  label: string;
}

// ===== UPDATE MACHINE OPTIONS (TAMBAH/SEMBUNYIIN OPSI) =====
function updateMachineOptions(): void {
  if (!machineSelect) return;

  const currentValue = currentMachine;

  // Kosongkan dulu
  machineSelect.innerHTML = '';

  // Tentukan opsi berdasarkan metode
  let options: ChoiceOption[] = [];
  if (currentMethod === 'manual') {
    options = [{ value: 'strauss', label: 'Strauss Pile (Manual)' }];
    const label = document.querySelector('#machineSelectRow label');
    if (label) label.textContent = 'Pilih Jenis Alat';
  } else {
    options = [
      { value: 'minicrane', label: 'Mini Crane' },
      { value: 'gawangan', label: 'Gawangan' }
    ];
    const label = document.querySelector('#machineSelectRow label');
    if (label) label.textContent = 'Pilih Jenis Mesin';
  }

  options.forEach(function (opt) {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    machineSelect!.appendChild(option);
  });

  const isAvailable = options.some(function (opt) {
    return opt.value === currentValue;
  });
  if (isAvailable) {
    machineSelect.value = currentValue;
  } else if (options.length > 0) {
    machineSelect.value = options[0].value;
    currentMachine = options[0].value;
  }

  renderChoices(machineChoices, options, currentMachine, function (value) {
    currentMachine = value;
    if (machineSelect) machineSelect.value = value;
    updateDiameterOptions();
  });
}

function renderChoices(
  container: HTMLElement | null,
  options: ChoiceOption[],
  selectedValue: string,
  onSelect: (value: string) => void
): void {
  if (!container) return;
  container.innerHTML = '';
  options.forEach(function (optionData) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'apx-calc-choice' + (optionData.value === selectedValue ? ' apx-calc-active' : '');
    button.textContent = optionData.label || optionData.value + ' cm';
    button.setAttribute('aria-pressed', optionData.value === selectedValue ? 'true' : 'false');
    button.addEventListener('click', function () {
      onSelect(optionData.value);
      renderChoices(container, options, optionData.value, onSelect);
    });
    container.appendChild(button);
  });
}

function updateDiameterOptions(): void {
  if (!diameterSelect) return;

  let options: number[] = [];
  if (currentMethod === 'manual') {
    options = getDiameterManual();
  } else {
    options = getDiameterMesin();
  }

  const currentValue = parseInt(diameterSelect.value);
  const currentAvailable = options.includes(currentValue);

  diameterSelect.innerHTML = '';

  options.forEach(function (d) {
    const option = document.createElement('option');
    option.value = String(d);
    option.textContent = d + ' cm';
    if (d === currentValue && currentAvailable) {
      option.selected = true;
    }
    diameterSelect!.appendChild(option);
  });

  if (!currentAvailable && options.length > 0) {
    diameterSelect.value = String(options[0]);
  }

  if (priceInput) {
    priceInput.value = '';
    priceInput.dataset.numeric = '';
  }

  renderChoices(
    diameterChoices,
    options.map(function (d) {
      return { value: String(d), label: d + ' cm' };
    }),
    String(diameterSelect.value),
    function (value) {
      if (diameterSelect) diameterSelect.value = value;
      if (priceInput) {
        priceInput.value = '';
        priceInput.dataset.numeric = '';
      }
      hitungTotal();
    }
  );

  hitungTotal();
}

function getHargaPerMeter(diameter: number): number {
  if (currentMethod === 'manual' || currentMachine === 'strauss') {
    return hargaManual[diameter] || 0;
  }
  return hargaMesin[diameter] || 0;
}

function getMinimalOrder(): number {
  if (currentMethod === 'manual' || currentMachine === 'strauss') return 100;
  if (pricing && pricing.equipment && pricing.equipment[currentMachine]) {
    return pricing.equipment[currentMachine].minOrder;
  }
  if (currentMachine === 'gawangan') return 200;
  return 200;
}

function getKecepatanPerHari(): { min: number; max: number } {
  if (pricing && pricing.equipment && pricing.equipment[currentMachine]) {
    return pricing.equipment[currentMachine].speed;
  }
  if (currentMethod === 'manual' || currentMachine === 'strauss') return { min: 2, max: 3 };
  return { min: 2, max: 4 };
}

function getNamaAlat(): string {
  if (currentMethod === 'manual' || currentMachine === 'strauss') return 'Strauss Pile (Manual)';
  if (currentMachine === 'gawangan') return 'Gawangan';
  return 'Mini Crane';
}

function hitungTotal(): void {
  if (!diameterSelect || !depthInput || !pointsInput || !totalPrice) {
    return;
  }

  const diameter = parseInt(diameterSelect.value) || 0;
  const kedalaman = parseFloat(depthInput.value) || 0;
  const jumlahTitik = parseInt(pointsInput.value) || 0;
  const priceRaw = priceInput ? priceInput.dataset.numeric || '' : '';

  let hargaPerMeter = 0;

  if (priceRaw) {
    hargaPerMeter = parseInt(priceRaw);
  } else {
    hargaPerMeter = getHargaPerMeter(diameter);
  }

  const alatName = getNamaAlat();

  if (hargaPerMeter === 0) {
    totalPrice.textContent = 'Hubungi Kami';
    if (detailPrice) detailPrice.textContent = 'Hubungi Kami untuk harga diameter ' + diameter + ' cm';
    if (estimationTime) estimationTime.textContent = 'Estimasi waktu: konsultasi';
    if (orderInfo) orderInfo.textContent = 'Minimal order: ' + getMinimalOrder() + 'm (' + alatName + ')';
    return;
  }

  if (kedalaman === 0 || jumlahTitik === 0) {
    totalPrice.textContent = 'Rp 0';
    if (detailPrice) detailPrice.textContent = 'Masukkan kedalaman & jumlah titik';
    if (estimationTime) estimationTime.textContent = 'Estimasi waktu: -';
    if (orderInfo) orderInfo.textContent = '';
    return;
  }

  let depthForCalc = kedalaman;
  let warningMsg = '';

  if ((currentMethod === 'manual' || currentMachine === 'strauss') && depthForCalc > 10) {
    depthForCalc = 10;
    warningMsg = ' (dibatasi 10m maksimal)';
  } else if (currentMethod === 'mesin' && currentMachine !== 'sany' && depthForCalc > 30) {
    depthForCalc = 30;
    warningMsg = ' (dibatasi 30m maksimal)';
  } else if (currentMachine === 'sany' && depthForCalc > 27) {
    depthForCalc = 27;
    warningMsg = ' (dibatasi 27m maksimal)';
  }

  const totalMeter = depthForCalc * jumlahTitik;
  const total = hargaPerMeter * totalMeter;

  totalPrice.textContent = formatRupiah(total);

  if (detailPrice) {
    detailPrice.textContent = formatRupiah(hargaPerMeter) + '/m × ' + depthForCalc + 'm × ' + jumlahTitik + ' titik' + warningMsg;
  }

  // ===== ESTIMASI WAKTU (per TITIK) =====
  const kecepatan = getKecepatanPerHari();

  let estimasiMin: number;
  let estimasiMax: number;

  if (jumlahTitik === 0) {
    estimasiMin = 0;
    estimasiMax = 0;
  } else if (currentMachine === 'sany') {
    estimasiMin = 0;
    estimasiMax = 0;
  } else {
    estimasiMin = Math.ceil(jumlahTitik / kecepatan.max);
    estimasiMax = Math.ceil(jumlahTitik / kecepatan.min);
  }

  if (estimationTime) {
    if (jumlahTitik === 0) {
      estimationTime.textContent = 'Estimasi waktu: -';
    } else if (currentMachine === 'sany') {
      estimationTime.textContent = 'Estimasi waktu: konsultasi';
    } else if (estimasiMin < 1 && estimasiMax < 1) {
      estimationTime.textContent = 'Estimasi waktu: 1 hari kerja';
    } else if (estimasiMin === estimasiMax) {
      estimationTime.textContent = 'Estimasi waktu: ' + estimasiMin + ' hari kerja';
    } else {
      estimationTime.textContent = 'Estimasi waktu: ' + estimasiMin + ' - ' + estimasiMax + ' hari kerja';
    }
  }

  const minimalOrder = getMinimalOrder();
  if (orderInfo) {
    if (totalMeter < minimalOrder) {
      orderInfo.textContent = '⚠️ Order di bawah ' + minimalOrder + 'm (' + alatName + '), hubungi admin untuk penawaran khusus atau borongan';
      orderInfo.className = 'apx-calc-order-info apx-calc-warn';
    } else {
      orderInfo.textContent = '✅ Volume order: ' + totalMeter + 'm (' + alatName + ' - cukup)';
      orderInfo.className = 'apx-calc-order-info apx-calc-ok';
    }
  }
}

// ===== UPDATE UI =====
function updateUI(): void {
  updateMachineOptions();
  updateDiameterOptions();

  if (priceInput) {
    priceInput.value = '';
    priceInput.dataset.numeric = '';
  }

  hitungTotal();
}

// ===== SEND TO WA =====
export function sendToWA(): void {
  const alatName = getNamaAlat();
  const diameter = diameterSelect ? diameterSelect.value : '-';
  let pricePerM = priceInput ? priceInput.dataset.numeric || '(harga standar)' : '(harga standar)';
  if (pricePerM !== '(harga standar)') {
    pricePerM = 'Rp ' + parseInt(pricePerM).toLocaleString('id-ID');
  }
  const depth = depthInput ? depthInput.value || '(belum diisi)' : '(belum diisi)';
  const points = pointsInput ? pointsInput.value : '-';
  const total = totalPrice ? totalPrice.textContent : '-';
  const estimasi = estimationTime ? estimationTime.textContent : '-';
  const order = orderInfo ? orderInfo.textContent : '';

  const pesan = 'Halo Agung Perkasa,%0A%0A' +
    'Saya mau tanya soal bore pile diameter 30cm.%0A%0A' +
    'Spesifikasi:%0A' +
    '- Alat: ' + alatName + '%0A' +
    '- Diameter: ' + diameter + ' cm%0A' +
    '- Harga jasa/m: ' + pricePerM + '%0A' +
    '- Kedalaman: ' + depth + ' m%0A' +
    '- Jumlah titik: ' + points + ' titik%0A%0A' +
    'Estimasi total: ' + total + '%0A' +
    'Estimasi waktu: ' + estimasi + '%0A' +
    (order ? order + '%0A' : '') +
    '%0A' +
    'Mohon info penawaran harga dari Agung Perkasa.%0A' +
    'Terima kasih.';

  window.open('https://wa.me/' + WA_NUMBER + '?text=' + pesan, '_blank');
}

// ===== INIT =====
let initialized = false;

export function initCalculator(root?: HTMLElement | null): void {
  if (initialized) return;

  diameterSelect = document.getElementById('diameterSelect') as HTMLSelectElement | null;
  priceInput = document.getElementById('priceInput') as HTMLInputElement | null;
  depthInput = document.getElementById('depthInput') as HTMLInputElement | null;
  pointsInput = document.getElementById('pointsInput') as HTMLInputElement | null;
  totalPrice = document.getElementById('totalPrice');
  detailPrice = document.getElementById('detailPrice');
  estimationTime = document.getElementById('estimationTime');
  orderInfo = document.getElementById('orderInfo');
  machineSelect = document.getElementById('machineSelect') as HTMLSelectElement | null;
  machineChoices = document.getElementById('machineChoices');
  diameterChoices = document.getElementById('diameterChoices');

  pricing = getPricing(root);
  hargaMesin = pricing
    ? Object.fromEntries(pricing.mesin.map((item) => [item.diameter, item.price]))
    : { ...DEFAULT_HARGA_MESIN };
  hargaManual = pricing
    ? Object.fromEntries(pricing.manual.map((item) => [item.diameter, item.price]))
    : { ...DEFAULT_HARGA_MANUAL };

  currentMethod = 'mesin';
  currentMachine = 'minicrane';

  const scope =
    root ??
    document.getElementById('calculator-heading')?.closest('section') ??
    document;
  const methodBtns = scope.querySelectorAll<HTMLElement>('.apx-calc-method');

  methodBtns.forEach(function (b) {
    b.classList.remove('apx-calc-active');
    b.setAttribute('aria-pressed', 'false');
    if (b.dataset.method === 'mesin') {
      b.classList.add('apx-calc-active');
      b.setAttribute('aria-pressed', 'true');
    }
  });

  // METHOD BTN
  methodBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      methodBtns.forEach(function (b) {
        b.classList.remove('apx-calc-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('apx-calc-active');
      btn.setAttribute('aria-pressed', 'true');

      currentMethod = btn.dataset.method || 'mesin';

      if (currentMethod === 'manual') {
        currentMachine = 'strauss';
      } else {
        currentMachine = 'minicrane';
      }

      updateUI();
    });
  });

  // MACHINE SELECT
  if (machineSelect) {
    machineSelect.addEventListener('change', function () {
      currentMachine = machineSelect ? machineSelect.value : 'minicrane';
      updateUI();
    });
  }

  // DIAMETER SELECT
  if (diameterSelect) {
    diameterSelect.addEventListener('change', function () {
      if (priceInput) {
        priceInput.value = '';
        priceInput.dataset.numeric = '';
      }
      hitungTotal();
    });
  }

  // PRICE INPUT
  if (priceInput) {
    priceInput.addEventListener('input', function () {
      const raw = priceInput ? priceInput.value.replace(/[^0-9]/g, '') : '';
      if (raw && parseInt(raw) > 0 && priceInput) {
        priceInput.dataset.numeric = raw;
        priceInput.value = 'Rp ' + parseInt(raw).toLocaleString('id-ID');
      } else if (priceInput) {
        priceInput.dataset.numeric = '';
        priceInput.value = '';
      }
      hitungTotal();
    });

    priceInput.addEventListener('focus', function () {
      if (priceInput && priceInput.value.startsWith('Rp ')) {
        priceInput.value = priceInput.dataset.numeric || '';
      }
    });

    priceInput.addEventListener('blur', function () {
      if (!priceInput) return;
      const num = priceInput.dataset.numeric;
      if (num && parseInt(num) > 0) {
        priceInput.value = 'Rp ' + parseInt(num).toLocaleString('id-ID');
      } else {
        priceInput.value = '';
      }
    });
  }

  // DEPTH INPUT
  if (depthInput) {
    depthInput.addEventListener('input', function () {
      if (!depthInput) return;
      let val = depthInput.value.replace(/[^0-9.]/g, '');
      if (parseFloat(val) < 0) val = '0';
      depthInput.value = val;
      hitungTotal();
    });
  }

  // POINTS INPUT
  if (pointsInput) {
    pointsInput.addEventListener('input', function () {
      if (!pointsInput) return;
      let val = pointsInput.value.replace(/[^0-9]/g, '');
      if (parseInt(val) < 0) val = '0';
      pointsInput.value = val;
      hitungTotal();
    });
  }

  window.sendToWA = sendToWA;

  updateUI();

  initialized = true;
}
