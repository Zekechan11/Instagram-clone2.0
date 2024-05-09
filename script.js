document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelector(".slides");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;
  const totalSlides = slides.children.length;

  nextBtn.addEventListener("click", function() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      slideTo(currentIndex);
    }
  });

  prevBtn.addEventListener("click", function() {
    if (currentIndex > 0) {
      currentIndex--;
      slideTo(currentIndex);
    }
  });

  function slideTo(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }
});
