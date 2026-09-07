import { Suspense, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { loadComponentWithRetry } from 'helpers/loadComponentWithRetry';
import { DropdownButtonHS } from './HeaderStyled';

const HeaderDropdownMenu = loadComponentWithRetry(() =>
  import('./HeaderDropdownMenu')
);

const HeaderDropdown = ({ id, title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // Чанк меню підвантажуємо наперед при наведенні, щоб перший клік не чекав.
  const [isMenuLoaded, setIsMenuLoaded] = useState(false);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setIsMenuLoaded(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <DropdownButtonHS
        className={isOpen ? 'open' : ''}
        onClick={handleOpen}
        onPointerEnter={() => setIsMenuLoaded(true)}
        onFocus={() => setIsMenuLoaded(true)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={isOpen ? id : undefined}
      >
        {title}
        <ExpandMoreIcon />
      </DropdownButtonHS>
      {isMenuLoaded && (
        <Suspense fallback={null}>
          <HeaderDropdownMenu
            id={id}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            items={items}
          />
        </Suspense>
      )}
    </>
  );
};

export default HeaderDropdown;
