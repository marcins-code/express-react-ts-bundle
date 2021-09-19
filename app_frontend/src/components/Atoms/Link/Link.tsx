import styled from 'styled-components';

interface LinkTypes {
  sidebar?: boolean | undefined;
    menuTop?: boolean | undefined;
  isMobile?: boolean | undefined;
}

export const StyledTopMenuLink = styled.a`
  line-height: 2.2rem;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  font-size: 1.8rem;
  text-decoration: none;
  color: ${({ theme }) => theme.grey200};
  display: flex;
  align-items: center;
  font-weight: bolder;

  &:after,
  &:before {
    opacity: 0;
    align-items: center;
    color: ${({ theme }) => (theme.themeName !== 'light' ? theme.orange : theme.blue)};
    margin-top: -10px;
    font-size: 2.5rem;
    font-weight: bold;
    transition: transform 0.3s, opacity 0.2s;
    font-family: 'Oswald', sans-serif;
  }

  &:after {
    margin-left: 2px;
    content: '}';
    transform: translateX(-20px);
  }

  &:before {
    margin-right: 2px;
    content: '{...';
    -webkit-transform: translateX(20px);
    -moz-transform: translateX(20px);
    transform: translateX(20px);
  }
  &:hover:not(.active) {
    &:before,
    &:after {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  &.active {
    &:before,
    &:after {
      opacity: 1;
      transform: translateX(0px);
      color: ${({ theme }) => (theme.themeName !== 'light' ? theme.blue : theme.danger)};
    }
  }
`;

export const StyledMobileNavLink = styled.a`
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Baloo 2', sans-serif;
  text-transform: uppercase;
  position: relative;
  line-height: 1rem;
  color: ${({ theme }) => theme.grey200};
  &:before {
    content: '';
    font-style: italic;
    font-size: 1.7rem;
    text-transform: lowercase;
    font-family: 'Patrick Hand', cursive;
    color: #00bfeb;
    position: absolute;
    bottom: 11px;
    vertical-align: text-bottom;
    opacity: 0;
  }

  &.active {
    :before {
      content: 'this.';
      left: -28px;
      color: #ff6315;
      opacity: 1;
      transition: opacity 100ms;
    }
  }
`;

export const StyledSidebarLink = styled(StyledMobileNavLink)`
&:hover:not(.active) {
  :before {
    content: 'use.';
    left: -24px;
    vertical-align: text-bottom;
    opacity: 1;
    transition: opacity 500ms;
  }
}
`;

const Link = styled.a<LinkTypes>`
  color: ${({ theme }) => theme.secondary};
`;

export default Link;
