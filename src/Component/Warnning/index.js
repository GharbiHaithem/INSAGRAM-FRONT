import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {CiWarning} from  'react-icons/ci' 
function Warnning({title}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="warning">
        <Alert.Heading className='d-flex align-items-center gap-20'><CiWarning className='fs-2'/><span> Empty {title}</span></Alert.Heading>
        
      </Alert>
    );
  }

}

export default Warnning