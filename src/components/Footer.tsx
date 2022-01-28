import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      A Friday evening doodle by{' '}
      <a href="https://twitter.com/jhrtn" target="_blank" rel="noreferrer">
        @jhrtn
      </a>
      ✨
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  padding: 12px;
`;
