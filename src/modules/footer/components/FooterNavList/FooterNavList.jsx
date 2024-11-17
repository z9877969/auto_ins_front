import * as S from './FooterNavList.styled';

const FooterNavList = ({
  options,
  onItemClick = null,
  linkComponent: Component,
  sx,
  itemsJustifyContent = 'flex-start',
}) => {
  return (
    <S.List sx={sx}>
      {options.map((o) => (
        <S.ListItem
          key={o.to}
          disablePadding={o.disablePadding}
          onClick={() => onItemClick(o.to)}
          justifyContent={itemsJustifyContent}
        >
          <Component {...o} />
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default FooterNavList;
