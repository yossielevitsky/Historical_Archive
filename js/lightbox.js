document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div id="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Zoom & Pan State
    let isZoomed = false;
    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;
    const zoomScale = 2.5;

    // Reset Zoom Function
    const resetZoom = () => {
        isZoomed = false;
        isDragging = false;
        currentX = 0;
        currentY = 0;
        lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
        lightboxImg.classList.remove('zoomed');
        lightboxImg.classList.remove('dragging');
    };

    // Close Lightbox Function
    const closeLightbox = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto';
        resetZoom();
    };

    // Initialize triggers
    const galleryImages = document.querySelectorAll('.synagogue-grid .card-image img, img.lightbox-trigger');

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            captionText.innerHTML = img.dataset.caption || img.alt;
            document.body.style.overflow = 'hidden';
            resetZoom(); // Ensure we start fresh
        });
    });

    // Toggle Zoom on Image Click
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing when clicking image

        if (isZoomed) {
            resetZoom();
        } else {
            isZoomed = true;
            lightboxImg.classList.add('zoomed');
            lightboxImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoomScale})`;
        }
    });

    // Mouse Down - Start Drag
    lightboxImg.addEventListener('mousedown', (e) => {
        if (!isZoomed) return;
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        lightboxImg.classList.add('dragging');
        e.preventDefault();
    });

    // Mouse Move - Dragging
    window.addEventListener('mousemove', (e) => {
        if (!isDragging || !isZoomed) return;
        e.preventDefault();
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        lightboxImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoomScale})`;
    });

    // Mouse Up - Stop Drag
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            lightboxImg.classList.remove('dragging');
        }
    });

    // Close Controls
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
});
