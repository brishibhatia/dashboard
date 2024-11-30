import { ReactNode } from 'react';
import { StoreProvider } from '../providers/StoreProvider';
import { Toaster } from 'react-hot-toast';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <Toaster position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
