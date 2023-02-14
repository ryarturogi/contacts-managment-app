import ContactsTable from '@/components/ContactsTable'
import Box from '@mui/material/Box'
import Head from 'next/head'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>The Keeper's Book</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='description' content={`The Keeper's Book`} />
        <meta name='keywords' content='contacts, management, app' />
        <meta name='author' content='Ricardo Guillen' />
      </Head>
      <Box sx={{ width: '100%' }} component='section'>
        <ContactsTable />
      </Box>
    </>
  )
}

export default Home
