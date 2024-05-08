let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');

function showSlides() {
  slides.forEach(slide => slide.style.display = 'none');
  slideIndex = (slideIndex + slides.length) % slides.length;
  slides[slideIndex].style.display = 'block';
}

function nextSlide() {
  slideIndex++;
  showSlides();
}

function prevSlide() {
  slideIndex--;
  showSlides();
}

showSlides();
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
