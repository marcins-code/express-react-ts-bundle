import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { PageContext } from '../context';
import { device } from '../themes/mediaBreakpoints';
import Navigation from '../components/organisms/Navigation/Navigation';
import '../assets/css/animations.css';

type Props = {
  children: React.ReactNode;
};

const StyledBodyWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  background-image: url(${({ theme }) => theme.globalBackgroundImage});
  background-color: ${({ theme }) => theme.globalBackgroundColor};
`;

const StyledAppWrapper = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  color: ${({ theme }) => theme.color};
  padding: 20px 0;
  &.content-enter {
    transition: margin 1000ms, padding 1000ms, width 1000ms;
    transition-delay: 500ms;
  }

  &.content-exit {
    transition: margin 1000ms, padding 1000ms, width 1000ms;
    transition-delay: 500ms;
  }
  &.sidebar {
    margin-left: 220px;
  }

  @media screen and ${device.max.tablet} {
    width: 90%;
  }

  @media screen and ${device.min.tablet} and ${device.max.laptop} {
    width: 90%;
    &.sidebar {
      width: 90%;
    }
  }

  @media screen and ${device.min.laptop} and ${device.max.laptopL} {
    width: 70%;
    &.sidebar {
      width: 70%;
    }
  }

  @media screen and ${device.min.laptopL} and ${device.max.desktop} {
    width: 60%;
    &.sidebar {
      width: 70%;
    }
  }
  @media screen and ${device.min.desktop} {
    width: 50%;
    &.sidebar {
      width: 50%;
    }
  }
  animation: fadein 800ms;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MainTemplate: React.FC<Props> = ({ children }) => {
  const appContext = useContext(PageContext);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { appTheme, isMobile, navPosition } = appContext;
  const appClasses = isMobile ? 'sidebar-mobile' : `${navPosition} ${appTheme}`;
  return (
    <StyledBodyWrapper className="global-wrapper">
      <Navigation />
      <StyledAppWrapper className={[appClasses, 'app-wrapper'].join(' ')}>
        <CSSTransition
          in={navPosition === 'sidebar' && !isMobile}
          timeout={1200}
          classNames="content"
          nodeRef={nodeRef}
          appear
        >
          <StyledContent className={[appClasses, 'content-wrapper'].join(' ')} ref={nodeRef}>{children}</StyledContent>
        </CSSTransition>
      </StyledAppWrapper>
    </StyledBodyWrapper>
  );
};

export default MainTemplate;
