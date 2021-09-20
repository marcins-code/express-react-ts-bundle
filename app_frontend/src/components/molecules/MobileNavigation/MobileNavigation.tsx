import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { mainMenuItems } from '../../../languages/menus';
import { StyledMobileNavLink } from '../../Atoms/Link/Link';
import { PageContext } from '../../../context';

const StyleMobileNavWrapper = styled.div`
  z-index: 310;
  width: 250px;
  height: 100vh;
  padding: 20px;
  text-shadow: ${({ theme }) => (theme.themeName !== 'light'
    ? '0px 0px 0 rgb(15, 15, 15), 2px 2px 0 rgb(1, 1, 1), 1px 1px 0 rgb(-86, -86, -86)'
    : '0px 0px 0 rgb(15, 15, 15), 1px 1px 0 rgb(64, 64, 64), 1px 1px 0 rgb(-86, -86, -86)')};
  background-image:
          ${({ theme }) => (theme.themeName !== 'light'
    ? 'linear-gradient(to left, rgba(24, 24, 24, 0.5) 0, rgba(14, 14, 14, 0.8) 100%)'
    : 'linear-gradient(to left, rgba(24, 24, 24, 0.6) 0, rgba(4, 4, 4, 0.75) 100%)')
},
          url(${({ theme }) => theme.sidebarBackgroundImage});
  position: fixed;
  top: 0;
  box-shadow: 10px 0 7px rgba(0, 0, 0, 0.4);
`;

const StyledList = styled.ul`
  margin: 10px 20px;
  display: block !important;
  list-style: none;

  > li {
    margin: 20px 10px;
  }
`;

const MobileNavigation: React.FC = () => {
  const appContext = useContext(PageContext);
  const { appLanguage } = appContext;

  return (
    <StyleMobileNavWrapper>
      <StyledList>
        {mainMenuItems.map((menuItem) => (
          <li key={menuItem.name_en}>
            <StyledMobileNavLink as={NavLink} to={menuItem.path} exact={menuItem.exact}>
              {appLanguage === 'pl' ? menuItem.name_pl : menuItem.name_en}
            </StyledMobileNavLink>
          </li>
        ))}
      </StyledList>
    </StyleMobileNavWrapper>
  );
};

export default MobileNavigation;
