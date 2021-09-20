import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopMenu from '../../molecules/TopMenu/TopMenu';
import SidebarMenu from '../../molecules/SidebarMenu/SidebarMenu';
import { PageContext } from '../../../context';
import MobileNavigation from '../../molecules/MobileNavigation/MobileNavigation';
import Backdrop from '../../Atoms/Backdrop/Backdrop';
import StyledToggleButton from '../../Atoms/StyledToggleButton/StyledToggleButton';

const StyledNavigationWrapper = styled.div`
  position: fixed;
z-index: 1000`;
const ShowMenuButton = styled(StyledToggleButton)`
  left: -5px !important;
  border-radius: 0 10px 10px 0;
  color: ${({ theme }) => theme.blue};
`;

const Navigation = () => {
  const appContext = useContext(PageContext);
  const nodeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isMobile } = appContext;
  const [showMobileNav, setShowMobileNav] = useState(false);
  return !isMobile ? (
    <>
      <TopMenu />
      <SidebarMenu />
    </>
  ) : (
    <>
      <CSSTransition in={!showMobileNav} mountOnEnter unmountOnExit timeout={700} classNames="menu-button" nodeRef={buttonRef}>
        <ShowMenuButton onClick={() => setShowMobileNav(true)} ref={buttonRef}>
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </ShowMenuButton>
      </CSSTransition>
      <Backdrop onClick={() => setShowMobileNav(false)} backdropShow={showMobileNav} />
      <CSSTransition
        in={showMobileNav}
        mountOnEnter
        unmountOnExit
        timeout={700}
        classNames={{ enter: 'mobile-slide-in-left', exit: 'slide-out-left' }}
        nodeRef={nodeRef}
      >
        <StyledNavigationWrapper ref={nodeRef}>
          <MobileNavigation />
        </StyledNavigationWrapper>
      </CSSTransition>
    </>
  );
};
export default Navigation;
