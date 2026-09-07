import { Menu, MenuItem, styled } from '@mui/material';

// Menu тягне за собою Modal, Popover, TrapFocus і три анімації — близько
// 110 КБ вихідників. Тому і сам компонент, і його стилі живуть в окремому
// модулі, який вантажиться лише при першому наведенні/кліку на пункт меню.
const MenuHS = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: '8px',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'none',
    border: `1px solid ${theme.palette.primary.secondaryWhite}`,
    borderRadius: '10px',
    maxWidth: '360px',
  },
  '& .MuiList-root': {
    padding: '8px 0',
  },
}));

const MenuItemHS = styled(MenuItem)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: 1.5,
  color: theme.palette.primary.white,
  whiteSpace: 'normal',
  padding: '10px 24px',
  transition: 'color 250ms linear',
  '&:hover': {
    color: theme.palette.primary.blue,
    backgroundColor: 'transparent',
  },
}));

const HeaderDropdownMenu = ({ id, anchorEl, open, onClose, items }) => (
  <MenuHS
    id={id}
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  >
    {items.map(({ uniqueName, title, href, target, rel }) => (
      <MenuItemHS
        key={uniqueName}
        component="a"
        href={href}
        target={target}
        rel={rel}
        onClick={onClose}
      >
        {title}
      </MenuItemHS>
    ))}
  </MenuHS>
);

export default HeaderDropdownMenu;
