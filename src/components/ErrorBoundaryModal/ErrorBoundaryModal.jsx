import { Box } from '@mui/material';
import { BoxIconHS, LiItemHS, LinkS } from '../Header/HeaderStyled';
import { BoxIconS } from '../../forms/Buttons/BtnBackStyled';
import { SpriteSVG } from '../../images/SpriteSVG';

const ErrorBoundaryModal = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '32px',
        padding: '60px',
        borderRadius: '16px',
        backgroundColor: '#00000020',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #fff',
        // maxWidth: '500px'
      }}
    >
      <Box component={'h1'} sx={{ lineHeight: 1.2 }}>
        {'Щось пішло не так :('}
      </Box>
      <Box display={'flex'} columnGap={'16px'}>
        <Box component={'p'} alignSelf={'center'}>
          Зв`&apos;`яжіться будь-ласка з нами
        </Box>
        <LiItemHS disablePadding={true}>
          <LinkS
            href="https://t.me/auto_ins_ua"
            target="_blank"
            rel="noreferrer noopener nofollow"
            aria-label="telegram"
          >
            <BoxIconHS className="socialIconBox">
              <SpriteSVG name={'icon-telegram-send'} />
            </BoxIconHS>
          </LinkS>
        </LiItemHS>
      </Box>
      <Box
        component={'a'}
        sx={{
          display: 'flex',
          columnGap: '16px',
          padding: '20px 32px',
          backgroundColor: '#fff',
          borderRadius: '100px',
          color: '#000',
          fontWeight: 600,
          fontSize: '20px',
          textDecoration: 'none',
        }}
        href="/"
      >
        <BoxIconS>
          <SpriteSVG name={'icon-arrow-left'} />
        </BoxIconS>
        Назад
      </Box>
    </Box>
  );
};

export default ErrorBoundaryModal;
