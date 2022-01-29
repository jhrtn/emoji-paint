export interface Emoji {
  raw: '🟩' | '🟥' | '🟧' | '🟨' | '🟦' | '🟪' | '🟫' | '⬛' | '⬜';
  color: string;
}

export const emojis: Emoji[] = [
  {
    raw: '🟩',
    color: 'green',
  },
  {
    raw: '🟥',
    color: 'red',
  },
  {
    raw: '⬛',
    color: 'black',
  },
  {
    raw: '⬜',
    color: 'white',
  },
  {
    raw: '🟦',
    color: 'blue',
  },
  {
    raw: '🟧',
    color: 'orange',
  },
  {
    raw: '🟨',
    color: 'yellow',
  },
  {
    raw: '🟪',
    color: 'purple',
  },
  {
    raw: '🟫',
    color: 'brown',
  },
];

export type Grid = string[][];
