const slideshow = document.querySelector(".slideshow");

if (slideshow) {
    const track = slideshow.querySelector(".slideshow-track");
    const slides = Array.from(track.children);
    const controls = slideshow.querySelector(".slideshow-controls");
    const previousButton = controls.querySelector('[data-direction="-1"]');
    const nextButton = controls.querySelector('[data-direction="1"]');
    const dotsContainer = controls.querySelector(".slideshow-dots");
    const status = slideshow.querySelector(".slideshow-status");
    let currentIndex = 0;

    function showSlide(index) {
        const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
        track.scrollTo({ left: nextIndex * track.clientWidth });
    }

    const dots = slides.map((slide, index) => {
        slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "slideshow-dot";
        button.setAttribute("aria-label", `Show photo ${index + 1}`);
        button.setAttribute("aria-controls", track.id);
        button.addEventListener("click", () => showSlide(index));
        dotsContainer.append(button);
        return button;
    });

    function updateControls() {
        currentIndex = Math.max(0, Math.min(
            Math.round(track.scrollLeft / track.clientWidth),
            slides.length - 1
        ));
        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
        dots.forEach((dot, index) => {
            dot.setAttribute("aria-pressed", String(index === currentIndex));
        });
        status.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
    nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
    track.addEventListener("scroll", updateControls, { passive: true });
    track.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            showSlide(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
        }
    });

    updateControls();
    controls.hidden = slides.length < 2;
    status.hidden = false;
}
