import ContactsTable from '@/components/ContactsTable'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Head from 'next/head'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Contacts Management App</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='description' content='Contacts Management App' />
        <meta name='keywords' content='contacts, management, app' />
        <meta name='author' content='Ricardo Guillen' />
      </Head>
      <main>
        <DefaultLayout>
          <ContactsTable />
        </DefaultLayout>
      </main>
    </>
  )
}
