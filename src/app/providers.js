"use client"
import { useEffect, useState } from 'react';
import { Content, Theme } from '@carbon/react';
import TutorialHeader from './components/TutorialHeader/TutorialHeader';

export function Providers({ children }) {
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    const checkHomePage = () => {
      setIsHomePage(window.location.pathname === '/');
    };

    checkHomePage();
    const intervalId = setInterval(checkHomePage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {!isHomePage && (
        <Theme theme="g100">
          <TutorialHeader />
        </Theme>
      )}
      <Content>{children}</Content>
    </div>
  );
}
