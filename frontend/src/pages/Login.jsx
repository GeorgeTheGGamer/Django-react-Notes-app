import React from 'react'
import Form from '../components/Form'

const Login = () => {
  return (
    // Pass in the props
    <Form route="/api/user/login/" method="login"></Form>
  )
}

export default Login