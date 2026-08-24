// ============================================================
// HARGA-CALCULATOR.JS - KALKULATOR BORE PILE
// ============================================================

(function() {
    'use strict';

    // ===== KALKULATOR BORE PILE =====
    // ============================================================

    // ELEMEN
    const diameterSelect = document.getElementById('diameterSelect');
    const priceInput = document.getElementById('priceInput');
    const depthInput = document.getElementById('depthInput');
    const pointsInput = document.getElementById('pointsInput');
    const totalPrice = document.getElementById('totalPrice');
    const detailPrice = document.getElementById('detailPrice');
    const estimationTime = document.getElementById('estimationTime');
    const orderInfo = document.getElementById('orderInfo');
    const methodBtns = document.querySelectorAll('.method-btn');
    const machineSelect = document.getElementById('machineSelect');
    const machineChoices = document.getElementById('machineChoices');
    const diameterChoices = document.getElementById('diameterChoices');

    // ===== HARGA PER METER =====
    const pricing = window.__PRICING__;
    const hargaMesin = pricing
        ? Object.fromEntries(pricing.mesin.map(item => [item.diameter, item.price]))
        : { 30: 120000, 40: 135000, 50: 190000, 60: 0, 80: 0 };
    const hargaManual = pricing
        ? Object.fromEntries(pricing.manual.map(item => [item.diameter, item.price]))
        : { 20: 75000, 25: 85000, 30: 100000, 40: 120000 };

    // ===== DIAMETER OPTIONS =====
    const diameterMesin = pricing ? pricing.mesin.map(item => item.diameter) : [30, 40, 50, 60, 80];
    const diameterManual = pricing ? pricing.manual.map(item => item.diameter) : [20, 25, 30, 40];

    // ===== STATE =====
    let currentMethod = 'mesin';
    let currentMachine = 'minicrane';

    // ===== FUNCTIONS =====
    function formatRupiah(angka) {
        if (isNaN(angka) || angka === 0) return 'Rp 0';
        return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // ===== UPDATE MACHINE OPTIONS (TAMBAH/SEMBUNYIIN OPSI) =====
    function updateMachineOptions() {
        if (!machineSelect) return;

        // Hapus semua opsi yang ada (kecuali opsi default yang mau dipertahankan)
        // Kita rebuild ulang
        const currentValue = currentMachine;
        
        // Kosongkan dulu
        machineSelect.innerHTML = '';

        // Tentukan opsi berdasarkan metode
        let options = [];
        if (currentMethod === 'manual') {
            // Kalo manual, cuma 1 opsi: Strauss
            options = [
                { value: 'strauss', label: 'Strauss Pile (Manual)' }
            ];
            // Ubah label jadi "Pilih Jenis Alat" (karena cuma 1 opsi)
            const label = document.querySelector('#machineSelectRow label');
            if (label) label.textContent = 'Pilih Jenis Alat';
        } else {
            // Kalo mesin, tampilin semua opsi mesin
            options = [
                { value: 'minicrane', label: 'Mini Crane' },
                { value: 'gawangan', label: 'Gawangan' }
            ];
            // Ubah label balik ke "Pilih Jenis Mesin"
            const label = document.querySelector('#machineSelectRow label');
            if (label) label.textContent = 'Pilih Jenis Mesin';
        }

        // Tambahkan opsi ke dropdown
        options.forEach(function(opt) {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            machineSelect.appendChild(option);
        });

        // Set value yang sesuai
        const isAvailable = options.some(function(opt) { return opt.value === currentValue; });
        if (isAvailable) {
            machineSelect.value = currentValue;
        } else if (options.length > 0) {
            machineSelect.value = options[0].value;
            currentMachine = options[0].value;
        }

        renderChoices(machineChoices, options, currentMachine, function(value) {
            currentMachine = value;
            machineSelect.value = value;
            updateDiameterOptions();
        });
    }

    function renderChoices(container, options, selectedValue, onSelect) {
        if (!container) return;
        container.innerHTML = '';
        options.forEach(function(optionData) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'choice-button' + (optionData.value === selectedValue ? ' active' : '');
            button.textContent = optionData.label || optionData + ' cm';
            button.setAttribute('aria-pressed', optionData.value === selectedValue ? 'true' : 'false');
            button.addEventListener('click', function() {
                onSelect(optionData.value);
                renderChoices(container, options, optionData.value, onSelect);
            });
            container.appendChild(button);
        });
    }

    function updateDiameterOptions() {
        if (!diameterSelect) return;

        let options = [];
        if (currentMethod === 'manual') {
            options = diameterManual;
        } else {
            options = diameterMesin;
        }

        const currentValue = parseInt(diameterSelect.value);
        const currentAvailable = options.includes(currentValue);
        
        diameterSelect.innerHTML = '';

        options.forEach(function(d) {
            const option = document.createElement('option');
            option.value = d;
            option.textContent = d + ' cm';
            if (d === currentValue && currentAvailable) {
                option.selected = true;
            }
            diameterSelect.appendChild(option);
        });

        if (!currentAvailable && options.length > 0) {
            diameterSelect.value = options[0];
        }

        if (priceInput) {
            priceInput.value = '';
            priceInput.dataset.numeric = '';
        }

        renderChoices(diameterChoices, options.map(function(d) { return { value: String(d), label: d + ' cm' }; }), String(diameterSelect.value), function(value) {
            diameterSelect.value = value;
            if (priceInput) {
                priceInput.value = '';
                priceInput.dataset.numeric = '';
            }
            hitungTotal();
        });

        hitungTotal();
    }

    function getHargaPerMeter(diameter) {
        if (currentMethod === 'manual' || currentMachine === 'strauss') {
            return hargaManual[diameter] || 0;
        } else {
            return hargaMesin[diameter] || 0;
        }
    }

    function getMinimalOrder() {
        if (currentMethod === 'manual' || currentMachine === 'strauss') return 100;
        if (pricing && pricing.equipment[currentMachine]) return pricing.equipment[currentMachine].minOrder;
        if (currentMachine === 'gawangan') return 200;
        return 200;
    }

    function getKecepatanPerHari() {
        if (pricing && pricing.equipment[currentMachine]) return pricing.equipment[currentMachine].speed;
        if (currentMethod === 'manual' || currentMachine === 'strauss') return { min: 2, max: 3 };
        return { min: 2, max: 4 };
    }

    function getNamaAlat() {
        if (currentMethod === 'manual' || currentMachine === 'strauss') return 'Strauss Pile (Manual)';
        if (currentMachine === 'gawangan') return 'Gawangan';
        return 'Mini Crane';
    }

    function hitungTotal() {
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
            if (totalPrice) totalPrice.textContent = 'Hubungi Kami';
            if (detailPrice) detailPrice.textContent = 'Hubungi Kami untuk harga diameter ' + diameter + ' cm';
            if (estimationTime) estimationTime.textContent = 'Estimasi waktu: konsultasi';
            if (orderInfo) orderInfo.textContent = 'Minimal order: ' + getMinimalOrder() + 'm (' + alatName + ')';
            return;
        }

        if (kedalaman === 0 || jumlahTitik === 0) {
            if (totalPrice) totalPrice.textContent = 'Rp 0';
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

        if (totalPrice) totalPrice.textContent = formatRupiah(total);

        if (detailPrice) {
            detailPrice.textContent = formatRupiah(hargaPerMeter) + '/m × ' + depthForCalc + 'm × ' + jumlahTitik + ' titik' + warningMsg;
        }

        // ===== ESTIMASI WAKTU (per TITIK) =====
const kecepatan = getKecepatanPerHari();

let estimasiMin, estimasiMax;

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
                orderInfo.className = 'order-info alert';
            } else {
                orderInfo.textContent = '✅ Volume order: ' + totalMeter + 'm (' + alatName + ' - cukup)';
                orderInfo.className = 'order-info success';
            }
        }
    }

    // ===== UPDATE UI =====
    function updateUI() {
        // Update dropdown machine options (tambah/sembunyiin)
        updateMachineOptions();
        
        // Update diameter options
        updateDiameterOptions();

        if (priceInput) {
            priceInput.value = '';
            priceInput.dataset.numeric = '';
        }

        hitungTotal();
    }

    // ===== EVENT LISTENERS =====

    // METHOD BTN
    methodBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            methodBtns.forEach(function(b) {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            currentMethod = this.dataset.method;

            // Set default machine
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
        machineSelect.addEventListener('change', function() {
            currentMachine = this.value;
            updateUI();
        });
    }

    // DIAMETER SELECT
    if (diameterSelect) {
        diameterSelect.addEventListener('change', function() {
            if (priceInput) {
                priceInput.value = '';
                priceInput.dataset.numeric = '';
            }
            hitungTotal();
        });
    }

    // PRICE INPUT
    if (priceInput) {
        priceInput.addEventListener('input', function() {
            const raw = this.value.replace(/[^0-9]/g, '');
            if (raw && parseInt(raw) > 0) {
                this.dataset.numeric = raw;
                this.value = 'Rp ' + parseInt(raw).toLocaleString('id-ID');
            } else {
                this.dataset.numeric = '';
                this.value = '';
            }
            hitungTotal();
        });

        priceInput.addEventListener('focus', function() {
            if (this.value.startsWith('Rp ')) {
                this.value = this.dataset.numeric || '';
            }
        });

        priceInput.addEventListener('blur', function() {
            const num = this.dataset.numeric;
            if (num && parseInt(num) > 0) {
                this.value = 'Rp ' + parseInt(num).toLocaleString('id-ID');
            } else {
                this.value = '';
            }
        });
    }

    // DEPTH INPUT
    if (depthInput) {
        depthInput.addEventListener('input', function() {
            let val = this.value.replace(/[^0-9.]/g, '');
            if (parseFloat(val) < 0) val = '0';
            this.value = val;
            hitungTotal();
        });
    }

    // POINTS INPUT
    if (pointsInput) {
        pointsInput.addEventListener('input', function() {
            let val = this.value.replace(/[^0-9]/g, '');
            if (parseInt(val) < 0) val = '0';
            this.value = val;
            hitungTotal();
        });
    }

    // ===== SEND TO WA =====
    window.sendToWA = function() {
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

        window.open('https://wa.me/6285710277854?text=' + pesan, '_blank');
    };

    // ===== INIT =====
    currentMethod = 'mesin';
    currentMachine = 'minicrane';
    
    methodBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
        if (b.dataset.method === 'mesin') {
            b.classList.add('active');
            b.setAttribute('aria-pressed', 'true');
        }
    });

    updateUI();

})();