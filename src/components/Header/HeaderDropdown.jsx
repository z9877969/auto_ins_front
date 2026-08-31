import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DropdownButtonHS, MenuHS, MenuItemHS } from './HeaderStyled';

const HeaderDropdown = ({ id, title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <DropdownButtonHS
        className={isOpen ? 'open' : ''}
        onClick={handleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={isOpen ? id : undefined}
      >
        {title}
        <ExpandMoreIcon />
      </DropdownButtonHS>
      <MenuHS
        id={id}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {items.map(({ uniqueName, title: itemTitle, href, target, rel }) => (
          <MenuItemHS
            key={uniqueName}
            component="a"
            href={href}
            target={target}
            rel={rel}
            onClick={handleClose}
          >
            {itemTitle}
          </MenuItemHS>
        ))}
      </MenuHS>
    </>
  );
};

export default HeaderDropdown;
