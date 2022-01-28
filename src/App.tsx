import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';
import Button from './components/Button';
import EmojiGrid from './components/EmojiGrid';
import EmojiPicker from './components/EmojiPicker';

import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import { Grid } from './types';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Main />
        <Footer />
        <GlobalStyle />
        <Toaster position="bottom-center" />
      </ThemeProvider>
    </>
  );
};

export default App;

const initialSquare = '⬛️';

const createGrid = (): Grid => {
  // rows then cols
  return Array.from({ length: 6 }, () => {
    return Array.from({ length: 5 }, () => initialSquare);
  });
};
const Main = () => {
  const [grid, setGrid] = useState(createGrid);
  const [currEmoji, setCurrEmoji] = useState('🟩');
  const [bgEmoji, setBgEmoji] = useState('⬛️');

  const clearGrid = () => setGrid(createGrid);

  const copyGrid = () => {
    const gridString = grid.map((row) => row.join('')).join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gridString).then(() => {
        toast('Go out and paste your masterpiece into the world!', {
          icon: '🎨',
          style: {
            fontSize: '16px',
            fontWeight: '700',
            border: '2px dashed black',
          },
        });
      });
    } else {
      toast.error('couldnt access clipbaord');
    }
  };

  return (
    <Container>
      <EmojiPicker
        currentEmoji={currEmoji}
        setCurrentEmoji={setCurrEmoji}
        secondaryEmoji={bgEmoji}
        setSecondaryEmoji={setBgEmoji}
      />
      <EmojiGrid
        currentEmoji={currEmoji}
        secondaryEmoji={bgEmoji}
        grid={grid}
        setGrid={setGrid}
      />
      <ButtonContainer>
        <Button buttonType="secondary" onClick={clearGrid}>
          clear
        </Button>
        <Button buttonType="primary" onClick={copyGrid}>
          copy
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 32px;

  min-height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 32px;
`;
