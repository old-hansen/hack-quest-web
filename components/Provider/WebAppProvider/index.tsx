'use client';
import { FC, PropsWithChildren } from 'react';
import LangProvider from '../Lang';
import { Lang } from '@/i18n/config';
import { Analytics } from '@vercel/analytics/react';
import WagmiConfigProvider from '../WagmiConfigProvider';
import GlobalModal from '@/components/Web/GlobalModal';
import ThemeContextProvider from '@/store/context/theme';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface WebAppProviderProps {
  lang: Lang;
}

const WebAppProvider: FC<PropsWithChildren<WebAppProviderProps>> = ({ lang, children }) => {
  return (
    <LangProvider lang={lang}>
      <ThemeContextProvider>
        <WagmiConfigProvider>
          {children}
          <ProgressBar
            height="8px"
            color="#FFE866"
            options={{ showSpinner: false, positionUsing: '' }}
            shallowRouting
          />
          <GlobalModal />
          <Analytics mode="production" debug={false} />
        </WagmiConfigProvider>
      </ThemeContextProvider>
    </LangProvider>
  );
};

export default WebAppProvider;
