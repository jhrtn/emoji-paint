import { useRef } from 'react';
import styled from 'styled-components';

import { Emoji, emojis } from '../types';
import { useLongPress } from '../utils/useLongPress';

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
  const currentCol = useRef<Emoji | null>(null);
  const bind = useLongPress(() => {
    if (currentCol.current) {
      const { raw } = currentCol.current;
      handleClick('right', raw);
    }
  });

  const handleClick = (side: 'right' | 'left', emoji: string) => {
    if (side === 'left') {
      setCurrentEmoji(emoji);
    } else if (side === 'right') {
      setSecondaryEmoji(emoji);
    }
    currentCol.current = null;
  };

  return (
    <Container>
      <Palette>
        {emojis.map((emoji) => (
          <Tile
            key={emoji.color}
            {...bind}
            onClick={() => handleClick('left', emoji.raw)}
            onAuxClick={() => handleClick('right', emoji.raw)}
            onTouchStart={(e) => {
              currentCol.current = emoji;
              return bind.onTouchStart(e);
            }}
          >
            {emoji.raw}
          </Tile>
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

const Tile = styled.span`
  cursor: pointer;
  user-select: none;
  font-size: 32px;
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
