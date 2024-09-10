import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import styles from './layout.module.scss';
const inter = Inter({subsets: ['latin']})
import './global.scss';

export const metadata: Metadata = {
  title: 'Icecream so good',
  description: 'Regionnal Challenge for Benjamin Code',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet" href="https://use.typekit.net/rff6ght.css"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style={{margin: 0}} className={`${inter.className} ${styles.main}`}>{children}</body>
    </html>
  )
}
