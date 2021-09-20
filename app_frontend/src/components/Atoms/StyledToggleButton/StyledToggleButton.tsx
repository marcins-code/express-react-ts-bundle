import styled from 'styled-components';

const StyledToggleButton = styled.button`
  position: fixed;
  height: 45px;
  z-index: 3000;
  cursor: pointer;
  right: -5px;
  top: 15px;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.warning};
  text-shadow: 0 0 16px black;
  padding: 5px 10px;
  border: none;
  border-radius: 10px 0 0 10px;
  background-image: linear-gradient(to bottom,
  rgba(10, 10, 10, 0.6) 0%,
  rgba(0, 0, 0, 0.6) 50%,
  rgba(10, 10, 10, 0.8) 100%),
  url('https://www.transparenttextures.com/patterns/cardboard-flat.png');
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.8);
  &:active,
  :focus {
    outline: none;
  }
  > svg {
    filter: drop-shadow(0 0 3px black);
  }
`;

export default StyledToggleButton;
