/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { LongPressDetectEvents, useLongPress } from '../utils/useLongPress';
import { primaryInput } from 'detect-it';
// import { Pos } from './EmojiGrid';

type D = any;

interface EmojiTileProps {
  children: React.ReactNode;
  // TODO: fix types
  data: D;
  onLeftClick: (d: D) => void;
  onRightClick: (d: D) => void;
  onLongPress: (d: D) => void;
  style?: React.CSSProperties;
}

const EmojiTile = ({
  children,
  onLeftClick,
  onRightClick,
  onLongPress,
  style,
  data,
}: EmojiTileProps) => {
  const bind = useLongPress(
    () => {
      onLongPress(data);
    },
    {
      onCancel: () => onLeftClick(data),
      detect: LongPressDetectEvents.TOUCH,
      threshold: 150,
    }
  );
  return (
    <Tile
      style={{ ...style }}
      {...bind}
      onClick={() => primaryInput === 'mouse' && onLeftClick(data)}
      onContextMenu={() => primaryInput === 'mouse' && onRightClick(data)}
    >
      {children}
    </Tile>
  );
};

export default EmojiTile;

export const Tile = styled.span`
  cursor: pointer;
  user-select: none;
  font-size: 32px;
`;
