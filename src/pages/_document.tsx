import Box from '@mui/material/Box'
import { Head, Html, Main, NextScript } from 'next/document'

const Document: React.FC = () => {
  return (
    <Html lang='en'>
      <Head />
      <Box component={'body'}>
        <Main />
        <NextScript />
      </Box>
    </Html>
  )
}

export default Document
