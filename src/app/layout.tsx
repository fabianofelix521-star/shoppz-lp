import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shoppz Digital – Lojas Online Premium',
  description:
    'Crie sua loja online profissional em minutos. Plataforma completa com checkout rápido, analytics, pagamentos integrados e suporte 24/7.',
  openGraph: {
    title: 'Shoppz Digital – Lojas Online Premium',
    description:
      'Crie sua loja online profissional em minutos. Plataforma completa para vender mais.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg-deep text-white font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
