import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

// const Message = ({ variant, children }) => {
//   return <Alert variant={variant}>{children}</Alert>
// }

const Message = ({ variant, closeBtn = false, children }) => {
  const [show, setShow] = useState(true)

  return (
    <>
      <Alert className='alert-dismissible' variant={variant} show={show}>
        <div className='d-flex justify-content-end'>
          <Button
            style={{ display: closeBtn ? 'flex' : 'none' }}
            className='btn-close nohover-btn'
            /* data-bs-dismiss='alert-dismissible' */
            onClick={() => setShow(false)}
            variant={variant}
          ></Button>
        </div>
        <div>{children}</div>
      </Alert>
    </>
  )
}

Message.defaultProps = {
  variant: 'info', // info - t.i. blue color in bootstrap
}

export default Message
