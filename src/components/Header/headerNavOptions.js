import { FRONT_URL } from '@constants/index';

// Пункти, для яких сторінка ще не створена, лишаємо тут без href — вони не
// рендеряться, поки не зʼявиться маршрут.
const servicesItems = [
  {
    uniqueName: 'дцв',
    title: 'ДЦВ',
    href: `${FRONT_URL}/pages/dcv/`,
  },
  {
    uniqueName: 'повне-каско',
    title: 'Повне КАСКО',
    href: `${FRONT_URL}/pages/kasko/`,
  },
  {
    uniqueName: 'часткове-каско',
    title: 'Часткове КАСКО',
    href: `${FRONT_URL}/pages/chastkove-kasko/`,
  },
  {
    uniqueName: 'міні-каско',
    title: 'Міні КАСКО',
    href: `${FRONT_URL}/pages/mini-kasko/`,
  },
  {
    uniqueName: 'залізний-купол',
    title: 'КАСКО від військових ризиків «Залізний купол»',
    href: `${FRONT_URL}/pages/kasko-vijskovi-ryzyky/`,
  },
  {
    uniqueName: 'дтп-адвокат',
    title: 'ДТП адвокат',
    href: `${FRONT_URL}/pages/dtp-advokat-vid-auto-ins/`,
  },
];

// Єдине джерело пунктів навігації для десктопного хедера і бургер-меню.
// type: 'scroll' — якір на секцію головної сторінки (id збігається з to);
// type: 'link' — посилання на сторінку сайту поза SPA;
// type: 'dropdown' — випадаючий список посилань (children).
export const headerNavOptions = [
  {
    uniqueName: 'сервіси',
    title: 'Сервіси',
    type: 'dropdown',
    children: servicesItems
      .filter(({ href }) => Boolean(href))
      .map((item) => ({ ...item, target: '_blank', rel: 'nofollow' })),
  },
  {
    uniqueName: 'статті',
    title: 'Статті',
    type: 'link',
    href: `${FRONT_URL}/pages/blog/`,
    target: '_blank',
    rel: 'nofollow',
  },
  {
    uniqueName: 'переваги',
    title: 'Переваги',
    type: 'scroll',
    to: 'переваги',
  },
  {
    uniqueName: 'відгуки',
    title: 'Відгуки',
    type: 'scroll',
    to: 'відгуки',
  },
  {
    uniqueName: 'партнери',
    title: 'Партнери',
    type: 'scroll',
    to: 'партнери',
  },
  {
    uniqueName: 'питання-відповіді',
    title: 'Питання-відповіді',
    type: 'scroll',
    to: 'питання-відповіді',
  },
].filter((item) => item.type !== 'dropdown' || item.children.length > 0);
