import { addLogApi } from 'services/api';

// Обмежуємо потік логів: один і той самий збій може повторюватись щосекунди.
const MAX_REPORTS_PER_SESSION = 20;
const reported = new Set();

const report = (type, message, extra) => {
  if (!message || reported.size >= MAX_REPORTS_PER_SESSION) return;

  const key = `${type}:${message}`;
  if (reported.has(key)) return;
  reported.add(key);

  addLogApi({
    type,
    message,
    url: window.location.href,
    userAgent: window.navigator.userAgent,
    ...extra,
  });
};

const getMessage = (reason) => {
  if (!reason) return '';
  if (reason instanceof Error) return reason.message;
  if (typeof reason === 'string') return reason;
  return JSON.stringify(reason);
};

export const initGlobalErrorLogging = () => {
  window.addEventListener('unhandledrejection', (event) => {
    report('unhandledrejection', getMessage(event.reason), {
      stack: event.reason?.stack,
    });
  });

  // Третій аргумент true — без capture не долітають помилки завантаження
  // ресурсів (скрипти, зображення, чанки), бо вони не спливають.
  window.addEventListener(
    'error',
    (event) => {
      if (event.error) {
        report('error', event.error.message, { stack: event.error.stack });
        return;
      }

      const target = event.target;
      const src = target?.src || target?.href;
      if (src && target !== window) {
        report('resource', `Failed to load ${target.tagName}: ${src}`);
      }
    },
    true
  );
};
