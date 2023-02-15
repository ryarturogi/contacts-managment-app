import CustomForm from '@/components/Form'
import {
  useGetContactDetailsQuery,
  useUpdateContactMutation,
} from '@/lib/contactsApi'
import { Container } from '@mui/material'
import { Formik, FormikProps } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface IContactForm {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const UpdateContactForm: React.FC = () => {
  const router = useRouter()
  const { contactId } = router.query
  const [initialData, setInitialData] = React.useState<IContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const { data, isLoading, isFetching } = useGetContactDetailsQuery(
    {
      id: contactId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !contactId,
    }
  )
  const [updateContact] = useUpdateContactMutation()

  const updateContactHandler = async (
    data: IContactForm,
    resetForm: Function
  ) => {
    // check if data changed or not
    if (
      initialData.firstName === data?.firstName &&
      initialData.lastName === data?.lastName &&
      initialData.email === data?.email &&
      initialData.phone === data?.phone
    ) {
      toast('No changes made', {
        type: 'info',
      })
      return
    }

    const res = await updateContact({ id: contactId, data })

    if (res?.data?._id) {
      router.push('/').then(() => {
        toast('Contact updated successfully', {
          type: 'success',
        })
      })
      return
    }

    if (res.error) {
      toast(res?.error?.data?.message, {
        type: 'error',
      })
      return
    }

    toast('Something went wrong', {
      type: 'error',
    })
  }

  // set initial data
  React.useEffect(() => {
    if (data) {
      setInitialData({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phone: data?.phone,
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>The Keeper's Book | Contact Editor</title>
        <meta name='description' content='Contact Editor' />
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
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            phone: data?.phone,
          }}
          onSubmit={(values: IContactForm, actions) => {
            updateContactHandler(values, actions.resetForm)
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
          {(props: FormikProps<IContactForm>) => {
            if (!isFetching) {
              return (
                <>
                  <CustomForm {...props} title='Update Contact' />
                </>
              )
            }
          }}
        </Formik>
      </Container>
    </>
  )
}

export default UpdateContactForm
