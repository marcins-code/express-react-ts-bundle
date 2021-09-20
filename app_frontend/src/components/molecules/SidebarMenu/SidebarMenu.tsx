import React, { useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledSidebarLink } from '../../Atoms/Link/Link';
import { PageContext } from '../../../context';
import { mainMenuItems } from '../../../languages/menus';
import { device } from '../../../themes/mediaBreakpoints';

const StyledNavigationWrapper = styled.div`
  position: absolute;
  width:250px;
   @media screen and ${device.max.laptop} {
    width:200px;
  }
`;
const StyledSidebarNav = styled.nav`
  min-height: 100vh;
  position: fixed;
  text-shadow: ${({ theme }) => (theme.themeName !== 'light'
    ? '0px 0px 0 rgb(15, 15, 15), 2px 2px 0 rgb(1, 1, 1), 1px 1px 0 rgb(-86, -86, -86)'
    : '0px 0px 0 rgb(15, 15, 15), 1px 1px 0 rgb(64, 64, 64), 1px 1px 0 rgb(-86, -86, -86)')};
  background-image:
      ${({ theme }) => (theme.themeName !== 'light'
    ? 'linear-gradient(to left, rgba(24, 24, 24, 0.5) 0, rgba(14, 14, 14, 0.8) 100%)'
    : 'linear-gradient(to left, rgba(24, 24, 24, 0.6) 0, rgba(4, 4, 4, 0.75) 100%)')
},
  url(${({ theme }) => theme.sidebarBackgroundImage});
  box-shadow:  -10px 0 15px rgba(0, 0, 0, 0.65) inset;
`;

const StyledList = styled.ul`

  margin: 10px 50px;
  @media screen and ${device.max.laptop} {
    margin: 10px 30px 10px 35px;
  }
  display: block !important;
  list-style: none;

  li {
    margin: 10px 0;
    padding: 10px 30px 10px 0;
  }
}
`;

const StyledDivider = styled.hr`
  border-color: #404040;
  border-style: solid;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  border-width: 1px;
  margin: 0 5px;
`;

const SidebarMenu: React.FC = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const appContext = useContext(PageContext);
  const { appLanguage, navPosition } = appContext;

  return (

    <CSSTransition
      in={navPosition === 'sidebar'}
      timeout={1200}
      classNames={{ enter: 'slide-in-left', exit: 'slide-out-left' }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <StyledNavigationWrapper>
        <StyledSidebarNav className="sidebar" ref={nodeRef}>
          <StyledDivider />
          <StyledList>
            {mainMenuItems.map((menuItem) => (
              <li key={menuItem.name_en}>
                <StyledSidebarLink as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                  {appLanguage === 'pl' ? menuItem.name_pl : menuItem.name_en}
                </StyledSidebarLink>
              </li>
            ))}
          </StyledList>
          <StyledDivider />
        </StyledSidebarNav>
      </StyledNavigationWrapper>

    </CSSTransition>

  );
};

export default SidebarMenu;
