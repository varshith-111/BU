'use client';

import MobileLayout from './layout/MobileLayout';
import DesktopLayout from './layout/DesktopLayout';
import MobileComponent from './components/mobile/MobileComponent';
import DesktopComponent from './components/desktop/DesktopComponent';

export default function Page() {
  return (
    <>
      <MobileLayout>
        <MobileComponent />
      </MobileLayout>
      <DesktopLayout>
        <DesktopComponent />
      </DesktopLayout>
    </>
  );
}