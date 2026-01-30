// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Slider functionality
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (sliderTrack && slides.length > 0) {
    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth;
    const totalSlides = slides.length;
    
    // Set initial position
    updateSliderPosition();
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSliderPosition();
        });
    }
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
    }, 5000);
    
    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Update slide width on window resize
    window.addEventListener('resize', () => {
        updateSliderPosition();
    });
}

// Motif selection
const motifOptions = document.querySelectorAll('.motif-option');
const selectedMotifElement = document.getElementById('summary-motif');

motifOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        motifOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update summary
        if (selectedMotifElement) {
            selectedMotifElement.textContent = option.querySelector('p').textContent;
        }
        
        // Update price estimate
        updatePriceEstimate();
    });
});

// Quantity input
const jumlahInput = document.getElementById('jumlah');
const minusBtn = document.querySelector('.jumlah-btn.minus');
const plusBtn = document.querySelector('.jumlah-btn.plus');
const summaryJumlah = document.getElementById('summary-jumlah');

if (minusBtn && plusBtn && jumlahInput) {
    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(jumlahInput.value);
        if (currentValue > 1) {
            jumlahInput.value = currentValue - 1;
            updateQuantitySummary();
            updatePriceEstimate();
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(jumlahInput.value);
        if (currentValue < 1000) {
            jumlahInput.value = currentValue + 1;
            updateQuantitySummary();
            updatePriceEstimate();
        }
    });
    
    jumlahInput.addEventListener('input', () => {
        let value = parseInt(jumlahInput.value);
        if (value < 1) jumlahInput.value = 1;
        if (value > 1000) jumlahInput.value = 1000;
        updateQuantitySummary();
        updatePriceEstimate();
    });
}

function updateQuantitySummary() {
    if (summaryJumlah && jumlahInput) {
        summaryJumlah.textContent = `${jumlahInput.value} pcs`;
    }
}

// Size selection
const sizeSelect = document.getElementById('ukuran');
const summaryUkuran = document.getElementById('summary-ukuran');

if (sizeSelect && summaryUkuran) {
    sizeSelect.addEventListener('change', () => {
        const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].text;
        summaryUkuran.textContent = selectedSize;
        updatePriceEstimate();
    });
}

// Price calculation
const summaryHarga = document.getElementById('summary-harga');

function updatePriceEstimate() {
    if (!summaryHarga) return;
    
    const basePrice = 250000; // Harga dasar per unit
    let quantity = parseInt(jumlahInput.value) || 1;
    let sizeMultiplier = 1;
    
    // Adjust price based on size
    if (sizeSelect) {
        const selectedSize = sizeSelect.value;
        if (selectedSize === 'XL') sizeMultiplier = 1.1;
        if (selectedSize === 'XXL') sizeMultiplier = 1.2;
        if (selectedSize === 'Jumbo') sizeMultiplier = 1.3;
    }
    
    // Calculate total
    let totalPrice = basePrice * sizeMultiplier * quantity;
    
    // Apply discount for bulk orders
    if (quantity >= 50) {
        totalPrice *= 0.9; // 10% discount for 50+ units
    } else if (quantity >= 20) {
        totalPrice *= 0.95; // 5% discount for 20+ units
    }
    
    // Format and display price
    summaryHarga.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}

// WhatsApp order button
const waButton = document.getElementById('kirim-wa');

if (waButton) {
    waButton.addEventListener('click', () => {
        // Get form values
        const nama = document.getElementById('nama').value || 'Pelanggan';
        const wa = document.getElementById('wa').value || '';
        const motif = selectedMotifElement ? selectedMotifElement.textContent : 'Parang';
        const ukuran = summaryUkuran ? summaryUkuran.textContent : '-';
        const jumlah = jumlahInput ? jumlahInput.value : '1';
        const catatan = document.getElementById('catatan').value || '';
        const harga = summaryHarga ? summaryHarga.textContent : 'Rp 0';
        
        // Create WhatsApp message
        const message = `Halo Admin Arfat by Riziq, saya ingin memesan seragam batik dengan detail berikut:%0A%0A` +
                       `Nama: ${nama}%0A` +
                       `No. WA: ${wa}%0A` +
                       `Motif: ${motif}%0A` +
                       `Ukuran: ${ukuran}%0A` +
                       `Jumlah: ${jumlah} pcs%0A` +
                       `Estimasi Harga: ${harga}%0A` +
                       `Catatan: ${catatan}%0A%0A` +
                       `Mohon info lebih lanjut mengenai pemesanan ini. Terima kasih.`;
        
        // Open WhatsApp
        window.open(`https://wa.me/6285879562367?text=${message}`, '_blank');
    });
}

// Initialize price estimate on page load
document.addEventListener('DOMContentLoaded', () => {
    updateQuantitySummary();
    updatePriceEstimate();
});

document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const productsGrid = document.querySelector('.products-grid');
    const productCards = document.querySelectorAll('.product-card');
    
    showMoreBtn.addEventListener('click', function() {
        // // Tampilkan semua produk
        // productsGrid.classList.add('all-shown');
        
        // // Sembunyikan tombol setelah semua produk ditampilkan
        // showMoreBtn.style.display = 'none';
        
        // Atau ubah teks tombol jika ingin toggle
        if (productsGrid.classList.contains('all-shown')) {
            productsGrid.classList.remove('all-shown');
            showMoreBtn.innerHTML = 'Tampilkan Lebih Banyak <i class="fas fa-chevron-down"></i>';
        } else {
            productsGrid.classList.add('all-shown');
            showMoreBtn.innerHTML = 'Tampilkan Lebih Sedikit <i class="fas fa-chevron-up"></i>';
        }
    });
});