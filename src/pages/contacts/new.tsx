import { useCreateContactMutation } from '@/lib/contactsApi'
import { Container } from '@mui/material'
import { Formik, FormikProps } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import CustomForm from '../../components/Form/index'
interface IContactFormForm {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const CreateContactForm: React.FC = () => {
  const router = useRouter()
  const [createContact] = useCreateContactMutation()

  const createNewContact = async (
    data: IContactFormForm,
    resetForm: Function
  ) => {
    // lowercase the email
    data.email = data.email.toLowerCase()
    // format phone number
    data.phone = data.phone.replace(/[^0-9]/g, '')
    // create contact
    const res = await createContact(data)
    // if success, show toast and redirect to home page
    if (res?.data?._id) {
      toast('Contact updated successfully', {
        type: 'success',
      })
      resetForm()
      // redirect to home page
      return router.push('/')
    }

    // if error, show toast
    if (res.error) {
      toast(res?.error?.data?.message, {
        type: 'error',
      })
    }
  }

  return (
    <>
      <Head key='head'>
        <title>Contact Create | The Keeper's Book</title>
        <meta name='description' content='Contact Create' />
      </Head>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0.5rem',
          marginTop: 5,
        }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          }}
          onSubmit={(values: IContactFormForm, actions) => {
            createNewContact(values, actions.resetForm)
            setTimeout(() => {
              actions.setSubmitting(false)
            }, 500)
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('Please enter full name'),
            lastName: Yup.string().required('Please enter last name'),
            email: Yup.string().email().required('Enter valid email-id'),
            phone: Yup.string().required('Please enter phone number'),
          })}
        >
          {(props: FormikProps<IContactFormForm>) => {
            return <CustomForm {...props} title='Create' />
          }}
        </Formik>
      </Container>
    </>
  )
}

export default CreateContactForm
