import styled from 'styled-components';

export const Button = styled.button<{ buttonType: 'primary' | 'secondary' }>`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 16px 40px;
  border-radius: 8px;

  background-color: ${(p) =>
    p.buttonType === 'primary'
      ? p.theme.colors.primary
      : p.buttonType === 'secondary'
      ? p.theme.colors.secondary
      : null};

  border: 2px dashed
    ${(p) =>
      p.buttonType === 'primary'
        ? p.theme.colors.primaryAcc
        : p.buttonType === 'secondary'
        ? p.theme.colors.secondaryAcc
        : null};
  color: ${(p) => p.theme.colors.fg};
`;

export default Button;
