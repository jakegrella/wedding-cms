import React from 'react'
import './styles.css'

export const metadata = {
  description: 'wedding website admin panel',
  title: 'JLO Wedding CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
