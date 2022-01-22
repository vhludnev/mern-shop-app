import React from 'react'
import { Container, Row, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  const styles = {
    opacity: '.9',
  }

  return (
    <Container className='mt-5'>
      <Row className='text-center' style={styles}>
        <h2>This page could not be found</h2>
      </Row>
      <Row md={2} className='justify-content-center'>
        <Image src='https://i.imgur.com/qIufhof.png' alt='not-found' fluid />
        {/* <Image
        className='img-fluid'
        style={stylesImg}
        src='https://i.imgur.com/qIufhof.png'
        alt='not-found'
      /> */}
      </Row>
      <Row md={6} className='justify-content-md-center'>
        <Button
          size='lg'
          className='mb-4'
          variant='light'
          style={{ fontSize: '1rem' }}
          onClick={() => navigate('/', { replace: true })}
        >
          Visit Homepage
        </Button>
      </Row>
    </Container>
  )
}

export default PageNotFound
