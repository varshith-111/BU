'use client';

import { useEffect, useState } from 'react';
import MobileLayout from './layout/MobileLayout';
import DesktopLayout from './layout/DesktopLayout';
import MobileComponent from './components/mobile/MobileComponent';
import DesktopComponent from './components/desktop/DesktopComponent';

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDeviceType(); // Check on initial load
    window.addEventListener('resize', checkDeviceType); // Check on resize

    return () => window.removeEventListener('resize', checkDeviceType); // Cleanup
  }, []);

  if (isMobile === null) {
    return <div>Loading...</div>; // Show loading state while determining device type
  }

  return (
    <>
      {isMobile ? (
        <MobileLayout>
          <MobileComponent />
        </MobileLayout>
      ) : (
        <DesktopLayout>
          <DesktopComponent />
        </DesktopLayout>
      )}
    </>
  );
}