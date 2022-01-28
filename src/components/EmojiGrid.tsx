import styled from 'styled-components';
import { Grid } from '../types';

interface EmojiGridProps {
  currentEmoji: string;
  secondaryEmoji: string;
  grid: Grid;
  setGrid: (g: Grid) => void;
}

const EmojiGrid = ({
  currentEmoji,
  secondaryEmoji,
  grid,
  setGrid,
}: EmojiGridProps) => {
  const handleClick = (
    e: 'right' | 'left',
    rowIndex: number,
    colIndex: number
  ) => {
    console.log('block', rowIndex, colIndex, 'clicked');
    const gridCopy = [...grid];
    gridCopy[rowIndex][colIndex] = e === 'left' ? currentEmoji : secondaryEmoji;
    setGrid(gridCopy);
  };

  return (
    <Container>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((block, colIndex) => (
            <Tile
              key={`${block}${colIndex}`}
              onClick={() => handleClick('left', rowIndex, colIndex)}
              onAuxClick={() => handleClick('right', rowIndex, colIndex)}
            >
              {block}
            </Tile>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default EmojiGrid;

const Container = styled.div`
  /* width: 100%; */
  /* height: 100%; */
`;

const Row = styled.div`
  display: flex;
`;

const Tile = styled.span`
  cursor: pointer;
  user-select: none;
  font-size: 2rem;
`;
