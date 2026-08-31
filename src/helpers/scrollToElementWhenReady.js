// Секції головної сторінки ліниві (loadComponentWithRetry + Suspense), тож на
// момент переходу з іншої сторінки потрібного елемента ще немає в DOM.
// Чекаємо його появи, поки не спливе таймаут.
const TIMEOUT_MS = 5000;

export const scrollToElementWhenReady = (id) => {
  const deadline = Date.now() + TIMEOUT_MS;
  let frameId = null;

  const tick = () => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (Date.now() > deadline) return;

    frameId = requestAnimationFrame(tick);
  };

  tick();

  return () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
  };
};
