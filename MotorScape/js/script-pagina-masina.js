let slideIndex = 0;

const images = document.querySelectorAll(".gallery-image");
const totalImages = images.length;

function showSlides(n) {
  slideIndex += n;
  if (slideIndex >= totalImages) slideIndex = 0;
  if (slideIndex < 0) slideIndex = totalImages - 1;

  const gallery = document.querySelector(".gallery");
  gallery.style.transform = `translateX(-${slideIndex * 100}%)`;

  updateIndicators();
}

function moveSlide(n) {
  showSlides(n);
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  lightboxImage.src = src;
  lightbox.classList.add("show");
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("show");
}


// Adaugă eveniment de click pentru imagini
images.forEach(function(image) {
  image.addEventListener('click', function() {
    openLightbox(this.src);
  });
});

function createIndicators() {
  const indicatorContainer = document.getElementById("gallery-indicators");
  indicatorContainer.innerHTML = "";

  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === slideIndex) dot.classList.add("active");

    dot.addEventListener("click", function() {
      slideIndex = i;
      const gallery = document.querySelector(".gallery");
      gallery.style.transform = `translateX(-${slideIndex * 100}%)`;
      updateIndicators();
    });

    indicatorContainer.appendChild(dot);
  }
}

function updateIndicators() {
  const dots = document.querySelectorAll(".gallery-indicators .dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === slideIndex);
  });
}

createIndicators();
