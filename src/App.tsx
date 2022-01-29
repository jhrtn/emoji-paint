import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';
import Button from './components/Button';
import EmojiGrid from './components/EmojiGrid';
import EmojiPicker from './components/EmojiPicker';

import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import { Grid } from './types';
import Footer from './components/Footer';
import useHitCount from './utils/useHitCount';

const App = () => {
  const { addHit } = useHitCount();
  useEffect(() => addHit(), []);
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
  const { addCopy } = useHitCount();

  // const resetGrid = () => setGrid(createGrid);

  const clearGrid = () =>
    setGrid([...grid.map((i) => i.map(() => initialSquare))]);

  const copyGrid = () => {
    addCopy();
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

  const changeSize = (
    type: 'add' | 'remove',
    area: 'top' | 'bottom' | 'right' | 'left'
  ) => {
    const MAX_ROWS = 18;
    const gridCopy = [...grid];
    if (type === 'add') {
      const empty: string[] = [];
      const oneDimGrid = empty.concat(...gridCopy);
      console.log('num twitter chars = ', oneDimGrid.length * 2);
      console.log('num rows', gridCopy.length);
      if (oneDimGrid.length * 2 + gridCopy[0].length < 260) {
        if (true) {
          if (area === 'bottom') {
            gridCopy.push(
              Array.from({ length: gridCopy[0].length }, () => initialSquare)
            );
          } else if (area === 'top') {
            gridCopy.unshift(
              Array.from({ length: gridCopy[0].length }, () => initialSquare)
            );
          }
        }
        if (gridCopy[0].length < MAX_ROWS) {
          if (area === 'left') {
            gridCopy.forEach((row) => row.unshift(initialSquare));
          } else if (area === 'right') {
            gridCopy.forEach((row) => row.push(initialSquare));
          }
        }
      }
    } else if (type === 'remove') {
      if (gridCopy.length > 1) {
        if (area === 'bottom') {
          gridCopy.pop();
        } else if (area === 'top') {
          gridCopy.shift();
        }
      }
      if (gridCopy[0].length > 1) {
        if (area === 'left') {
          gridCopy.forEach((row) => row.shift());
        } else if (area === 'right') {
          gridCopy.forEach((row) => row.pop());
        }
      }
    }
    setGrid(gridCopy);
  };

  return (
    <Container>
      <EmojiPicker
        currentEmoji={currEmoji}
        setCurrentEmoji={setCurrEmoji}
        secondaryEmoji={bgEmoji}
        setSecondaryEmoji={setBgEmoji}
      />
      <DrawAreaContainer>
        <Top dir="row">
          <ChangeSizeButton onClick={() => changeSize('add', 'top')}>
            +
          </ChangeSizeButton>
          <ChangeSizeButton red onClick={() => changeSize('remove', 'top')}>
            -
          </ChangeSizeButton>
        </Top>
        <Right>
          <ChangeSizeButton onClick={() => changeSize('add', 'right')}>
            +
          </ChangeSizeButton>
          <ChangeSizeButton red onClick={() => changeSize('remove', 'right')}>
            -
          </ChangeSizeButton>
        </Right>
        <EmojiGridContainer>
          <EmojiGrid
            currentEmoji={currEmoji}
            secondaryEmoji={bgEmoji}
            grid={grid}
            setGrid={setGrid}
          />
        </EmojiGridContainer>
        <Bottom dir="row">
          <ChangeSizeButton
            style={{}}
            onClick={() => changeSize('add', 'bottom')}
          >
            +
          </ChangeSizeButton>
          <ChangeSizeButton red onClick={() => changeSize('remove', 'bottom')}>
            -
          </ChangeSizeButton>
        </Bottom>
        <Left>
          <ChangeSizeButton onClick={() => changeSize('add', 'left')}>
            +
          </ChangeSizeButton>
          <ChangeSizeButton red onClick={() => changeSize('remove', 'left')}>
            -
          </ChangeSizeButton>
        </Left>
      </DrawAreaContainer>
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

const DrawAreaContainer = styled.div`
  display: grid;
  grid-template-columns: auto max(1fr, 580px) auto;
  grid-template-rows: auto 1fr auto;

  min-width: 100%;
  min-height: auto;
`;

const GridAreaBase = styled.div<{ dir?: 'row' | 'col' }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(p) => (p.dir === 'row' ? 'row' : 'column')};
`;
const EmojiGridContainer = styled(GridAreaBase)`
  grid-column: 2/3;
  grid-row: 2/3;

  overflow: auto;
`;
const Top = styled(GridAreaBase)`
  grid-column: 2/3;
  grid-row: 1/2;
`;
const Right = styled(GridAreaBase)`
  grid-column: 3/4;
  grid-row: 2/3;
  width: 100%;
`;
const Bottom = styled(GridAreaBase)`
  grid-column: 2/3;
  grid-row: 3/4;
  width: 100%;
`;
const Left = styled(GridAreaBase)`
  grid-column: 1/2;
  grid-row: 2/3;
  width: 100%;
`;

const ChangeSizeButton = styled.button<{ red?: boolean }>`
  border: none;
  outline: none;
  background: none;
  width: 40px;
  height: 40px;
  border: 2px dashed
    ${(p) => (p.red ? p.theme.colors.secondaryAcc : p.theme.colors.primaryAcc)};
  border-radius: 50%;
  color: ${(p) => p.theme.colors.fg};
  padding: 8px;
  margin: 8px;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
