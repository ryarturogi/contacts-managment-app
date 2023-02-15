import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  values: any
  errors: any
  touched: any
  handleChange: any
  handleBlur: any
  isSubmitting: any
  title: string
}

const CustomForm: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } =
    props

  const hasError = Object.keys(errors).length > 0

  return (
    <Form>
      <Box
        sx={{
          background: '#fff',
          padding: '1.5rem 1.25rem 2.5rem',
          width: '100%',
          maxWidth: '400px',
          minWidth: '300px',
          borderRadius: '1rem',
        }}
      >
        <Typography
          component='h1'
          fontWeight={600}
          fontSize={24}
          sx={{ margin: '0 auto 1.5rem', textAlign: 'left' }}
        >
          {props.title} Contact
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 2.25,
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <FormControl>
            <TextField
              name='firstName'
              id='firstName'
              label='First Name'
              value={values.firstName}
              type='text'
              error={errors.firstName && touched.firstName ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && touched.firstName && (
              <div style={{ color: 'red' }}>{errors.firstName}</div>
            )}
          </FormControl>

          <FormControl>
            <TextField
              name='lastName'
              id='lastName'
              label='Last Name'
              value={values.lastName}
              type='text'
              error={errors.lastName && touched.lastName ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && touched.lastName && (
              <div style={{ color: 'red' }}>{errors.lastName}</div>
            )}
          </FormControl>

          <FormControl>
            <TextField
              name='email'
              id='email'
              label='Email-id'
              value={values.email}
              type='email'
              error={errors.email && touched.email ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <div style={{ color: 'red' }}>{errors.email}</div>
            )}
          </FormControl>

          <FormControl>
            <TextField
              name='phone'
              id='phone'
              label='Phone'
              value={values.phone}
              type='text'
              error={errors.phone && touched.phone ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone && (
              <div style={{ color: 'red' }}>{errors.phone}</div>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {/* cancel button */}
            <Button
              type='button'
              variant='outlined'
              color='inherit'
              size='large'
              disabled={isSubmitting}
              sx={{
                cursor: `${hasError ? 'not-allowed' : 'default'}`,
              }}
              title={hasError ? 'Please fill all the fields' : ''}
              fullWidth
              onClick={() => {
                router.back()
              }}
            >
              <Typography
                variant='button'
                fontSize={20}
                fontWeight={600}
                textTransform='capitalize'
              >
                Cancel
              </Typography>
            </Button>

            <Button
              type='submit'
              variant={'contained'}
              color={hasError ? 'error' : 'primary'}
              size='large'
              disabled={isSubmitting}
              sx={{
                cursor: `${hasError ? 'not-allowed' : 'default'}`,
              }}
              title={hasError ? 'Please fill all the fields' : ''}
              fullWidth
            >
              <Typography
                variant='button'
                fontSize={20}
                fontWeight={600}
                textTransform='capitalize'
              >
                {props.title}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Form>
  )
}

export default CustomForm
