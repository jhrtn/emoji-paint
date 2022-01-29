import styled from 'styled-components';

import { Grid } from '../types';
import EmojiTile from './EmojiTile';

interface EmojiGridProps {
  currentEmoji: string;
  secondaryEmoji: string;
  grid: Grid;
  setGrid: (g: Grid) => void;
}

export type Pos = [number, number];

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
    const gridCopy = [...grid];
    gridCopy[rowIndex][colIndex] = e === 'left' ? currentEmoji : secondaryEmoji;
    setGrid(gridCopy);
  };

  return (
    <Container>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((block, colIndex) => (
            <EmojiTile
              key={`${block}${colIndex}`}
              onLeftClick={([x, y]) => handleClick('left', x, y)}
              onRightClick={([x, y]) => handleClick('right', x, y)}
              onLongPress={([x, y]) => handleClick('right', x, y)}
              data={[rowIndex, colIndex]}
            >
              {block}
            </EmojiTile>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default EmojiGrid;

const Container = styled.div``;

const Row = styled.div`
  display: flex;
`;
