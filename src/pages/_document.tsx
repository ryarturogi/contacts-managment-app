import { Head, Html, Main, NextScript } from 'next/document'

const Document: React.FC = () => {
  return (
    <Html lang='en'>
      <Head />
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
