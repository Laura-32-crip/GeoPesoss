// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'GeoPesoss',
  description: 'Datos geográficos en vivo desde Google Sheets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
