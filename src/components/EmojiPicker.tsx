import styled from 'styled-components';

import { emojis } from '../types';
import EmojiTile, { Tile } from './EmojiTile';

interface EmojiPickerProps {
  currentEmoji: string;
  setCurrentEmoji: (e: string) => void;
  secondaryEmoji: string;
  setSecondaryEmoji: (e: string) => void;
}

const EmojiPicker = ({
  currentEmoji,
  setCurrentEmoji,
  secondaryEmoji,
  setSecondaryEmoji,
}: EmojiPickerProps) => {
  const handleClick = (side: 'right' | 'left', emoji: string) => {
    if (side === 'left') {
      setCurrentEmoji(emoji);
    } else if (side === 'right') {
      setSecondaryEmoji(emoji);
    }
  };

  return (
    <Container>
      <Palette>
        {emojis.map((emoji) => (
          <EmojiTile
            onLeftClick={(d) => handleClick('left', d)}
            onRightClick={(d) => handleClick('right', d)}
            onLongPress={(d) => handleClick('right', d)}
            key={emoji.color}
            data={emoji.raw}
          >
            {emoji.raw}
          </EmojiTile>
        ))}
      </Palette>
      <CurrentCols>
        <FG>{currentEmoji}</FG>
        <BG>{secondaryEmoji}</BG>
      </CurrentCols>
    </Container>
  );
};

export default EmojiPicker;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
`;

const Palette = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const CurrentCols = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  span {
    font-size: 64px;
  }
`;

const BG = styled(Tile)`
  position: absolute;
  cursor: auto;
`;

const FG = styled(Tile)`
  transform: translate(33%, 33%);
  position: absolute;
  cursor: auto;
  z-index: 2;
`;
