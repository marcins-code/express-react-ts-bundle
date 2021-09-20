import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { PageContext } from '../../../context';
import { mainMenuItems } from '../../../languages/menus';
import { StyledTopMenuLink } from '../../Atoms/Link/Link';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  width: 100%;

  li {
    margin: 0 5px;
  }
`;

const StyledTopMenuNavWrapper = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 26px;
  text-shadow: ${({ theme }) => (theme.themeName !== 'light'
    ? '0px 0px 0 rgb(135, 135, 135), 2px 2px 0 rgb(24, 24, 24), 1px 1px 0 rgb(-86, -86, -86)'
    : '0px 0px 0 rgb(135, 135, 135), 2px 2px 0 rgb(24, 24, 24), 1px 1px 0 rgb(-86, -86, -86)')};
   border-radius: 0 0 3px 3px;

  background: url(${({ theme }) => theme.menuBackgroundImage}),
    linear-gradient(
      ${({ theme }) => theme.menuGradient}
    );

  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.3);
`;

const StyledNavigationWrapper = styled.div`
  position: relative;
  z-index: 301;
`;

const TopMenu = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { navPosition } = useContext(PageContext);
  return (
    <CSSTransition
      in={navPosition === 'menu-top'}
      timeout={1500}
      classNames="menu-top"
      unmountOnExit
      appear
      nodeRef={nodeRef}
    >
      <StyledNavigationWrapper ref={nodeRef}>
        <StyledTopMenuNavWrapper id="top-navigation">
          <StyledList className="page-menu">
            {mainMenuItems.map((menuItem) => (
              <li key={menuItem.name_pl}>
                <StyledTopMenuLink as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                  {menuItem.name_pl}
                </StyledTopMenuLink>
              </li>
            ))}
          </StyledList>
        </StyledTopMenuNavWrapper>
      </StyledNavigationWrapper>
    </CSSTransition>

  );
};
export default React.memo(TopMenu);
