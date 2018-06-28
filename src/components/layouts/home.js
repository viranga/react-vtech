import React from 'react';
import { Container, Row } from 'reactstrap';

const HomeLayout = ({children, ...rest}) => {
    return(    
        <div className="app flex-row align-items-center">
            <Container>
            <Row className="justify-content-center">
                {children}
            </Row>
            </Container>
        </div>
    )
  };
  
  
  export default HomeLayout;