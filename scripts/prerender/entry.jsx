// Рендериться окремим SSR-білдом (build-shell.mjs) і викликається з
// index.mjs. Тільки HeroTabs + HeroPicture — це все, що потрібно для
// першого екрана; форма (ByLicensePlate/ByParameters) лишається за межами
// прередеру, бо тягне Redux/Router/Formik.
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { renderToStaticMarkup } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../../src/theme.js';
import HeroTabs from '../../src/components/HeroTabs/HeroTabs.jsx';
import HeroPicture from '../../src/components/HeroPicture/HeroPicture.jsx';
import { HeroContainer } from '../../src/components/Hero/Hero.styled.js';

const cache = createCache({ key: 'ssg' });
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(cache);

function Shell() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline ставить box-sizing:border-box та інші глобальні скиди —
          без них статична розмітка порахує ширини по-іншому, ніж після
          монтування React, і дасть новий CLS. */}
      <CssBaseline />
      <section>
        <HeroContainer>
          <HeroTabs setActiveTab={() => {}} />
        </HeroContainer>
        <HeroPicture />
      </section>
    </ThemeProvider>
  );
}

export function renderShell() {
  const html = renderToStaticMarkup(
    <CacheProvider value={cache}>
      <Shell />
    </CacheProvider>
  );
  const chunks = extractCriticalToChunks(html);
  const css = constructStyleTagsFromChunks(chunks);
  return { html, css };
}
