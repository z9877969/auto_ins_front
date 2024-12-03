import { socialMediaDict } from 'assets/utils/socialMedia';

export const linksListOptions = [
  {
    key: 'інфо про СК',
    href: 'https://auto-ins.com.ua/pages/chomu-varto-obrati-avtoins/',
    target: '_blank',
    rel: 'nofollow',
    linkTitle: 'Про нас',
  },
  {
    key: 'інформація про страхового посередника ',
    href: 'https://auto-ins.com.ua/pages/info/',
    target: '_blank',
    rel: 'nofollow',
    linkTitle: 'Інформація про страхового посередника ',
  },
  {
    key: 'політика конфіденційності',
    href: 'https://auto-ins.com.ua/pages/policy/',
    target: '_blank',
    rel: 'nofollow',
    linkTitle: 'Політика конфіденційності',
  },
  {
    key: 'інформація про СК та страхові продукти',
    href: 'https://docs.ewa.ua/insurance-products',
    target: '_blank',
    rel: 'nofollow',
    linkTitle: 'Інформація про СК та страхові продукти',
  },
  {
    key: 'Публічна оферта',
    href: 'https://auto-ins.com.ua/pages/oferta/',
    target: '_blank',
    rel: 'nofollow',
    linkTitle: 'Публічна оферта',
  },
];

export const scrollLinksOptions = [
  {
    key: 'переваги',
    title: 'Переваги',
    itemClickTo: 'переваги',
    to: 'переваги',
    smooth: true,
    disablePadding: true,
  },
  {
    key: 'партнери',
    title: 'Партнери',
    itemClickTo: 'партнери',
    to: 'партнери',
    smooth: true,
    disablePadding: true,
  },
  {
    key: 'питання-відповіді',
    title: 'Питання-відповіді',
    itemClickTo: 'питання-відповіді',
    to: 'питання-відповіді',
    smooth: true,
    disablePadding: true,
  },
];

export const socialLinksOptions = [
  {
    key: socialMediaDict.instagram.icon,
    href: socialMediaDict.instagram.path,
    target: '_blank',
    rel: 'noreferrer noopener nofollow',
    ariaLabel: 'instagram',
    iconName: socialMediaDict.instagram.icon,
    linkTitle: 'instagram',
  },
  {
    key: socialMediaDict.facebook.icon,
    href: socialMediaDict.facebook.path,
    target: '_blank',
    rel: 'noreferrer noopener nofollow',
    ariaLabel: 'facebook',
    iconName: socialMediaDict.facebook.icon,
    linkTitle: 'facebook',
  },
  {
    key: 'icon-telegram-send',
    href: socialMediaDict.telegram.path,
    target: '_blank',
    rel: 'noreferrer noopener nofollow',
    ariaLabel: 'telegram',
    iconName: 'icon-telegram-send',
    linkTitle: 'telegram',
  },
  {
    key: socialMediaDict.phone.icon,
    href: socialMediaDict.phone.path,
    target: '_blank',
    rel: 'noreferrer noopener nofollow',
    ariaLabel: 'mail',
    iconName: socialMediaDict.phone.icon,
    linkTitle: '+380999362925',
    fill: '#212121',
  },
  {
    key: socialMediaDict.mail.icon,
    href: socialMediaDict.mail.path,
    target: '_blank',
    rel: 'noreferrer noopener nofollow',
    ariaLabel: 'mail',
    iconName: socialMediaDict.mail.icon,
    linkTitle: 'admin@auto-ins.com.ua',
  },
];
