import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  backgroundColor: 'black',
  color: 'white',
  padding: theme => theme.spacing(2),
	marginTop: 'auto',
	position: 'fixed',
  bottom: 0,
  width: '100%',
	display: 'flex',
	padding: ' 6px ',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'


});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="md">
        <Typography variant="body1"  style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()}  amazon.com. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
