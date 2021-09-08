import React from 'react';
import { darken } from 'polished';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import { PageContext } from '../../../context';
import { mainMenuItems } from '../../../languages/menus';
import Link from '../../Atoms/Link/Link';
// import { CSSTransition } from 'react-transition-group';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  width: 100%;

  li {
    margin: 0 10px;
  }

  a {
    line-height: 2.2rem;
    text-transform: uppercase;
    font-family: 'Patrick Hand', sans-serif;
    font-size: 2.1rem;
    font-weight: bold;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
    display: flex;
    align-items: center;
    font-weight: 600;

    &:after,
    &:before {
      opacity: 0;
      align-items: center;
      color: #ff6315;
      margin-top: -3px;
      font-size: 2.8rem;
      font-weight: normal;
      transition: transform 0.3s, opacity 0.2s;
      font-family: 'Baloo 2', sans-serif;
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
        color: #00bfeb;
      }
    }
  }
`;

const StyledTopMenuNavWrapper = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  font-size: 26px;
  text-shadow: ${({ theme }) => theme.menuTextShadow};
  border-radius: 0 0 3px 3px;

  background: url(${({ theme }) => theme.menuBackgroundImage}),
    linear-gradient(
      ${({ theme }) => darken(0.07, theme.appBackgroundColor)} 40%,
      ${({ theme }) => darken(0.07, theme.appBackgroundColor)} 80%,
      ${({ theme }) => darken(0.2, theme.appBackgroundColor)} 100%
    );

  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.3);
`;

const StyledNavigationWrapper = styled.div`
  position: relative;
  z-index: 301;
`;

const TopMenu = () => (
  <StyledNavigationWrapper>
    <StyledTopMenuNavWrapper id="top-navigation">
      <StyledList className="page-menu">
        {mainMenuItems.map((menuItem) => (
          <li key={menuItem.name_pl}>
            <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
              {menuItem.name_pl}
            </Link>
          </li>
        ))}
      </StyledList>
    </StyledTopMenuNavWrapper>
  </StyledNavigationWrapper>

);
export default React.memo(TopMenu);
