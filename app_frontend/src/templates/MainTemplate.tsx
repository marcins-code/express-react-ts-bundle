import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageContext } from '../context';
import { device } from '../themes/mediaBreakpoints';
import TopMenu from '../components/molecules/TopMenu/TopMenu';

type Props = {
    children: React.ReactNode;
};

const StyledBodyWrapper = styled.div`
  width: 100%;
  position: absolute;
  background-attachment: fixed;
  background-color: ${({ theme }) => theme.globalBackgroundColor};
  background-image: url(${({ theme }) => theme.globalBackgroundImage});
  min-height: 100vh;
`;

const StyledAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;

  @media ${device.max.tablet} {
    width: 100%;
  }
  @media ${device.min.tablet} {
    // padding-left: 20px;
    width: 100%;
  }

  @media ${device.max.tablet} {
    width: 100%;
  }
  @media ${device.min.laptop} {
    width: 95%;
  }
  @media ${device.min.laptopL} {
    width: 90%;
  }
`;

const StyledContentWrapper = styled.div`
  background-image: url(${({ theme }) => theme.appBackgroundImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};
  background-attachment: fixed;
  box-shadow: 0 0 100px -20px ${({ theme }) => theme.appBoxShadowColor} inset, 0 0 10px 2px black;
  overflow: hidden;
  position: relative;
  z-index: 300;
  &.menu-top {
    min-height: calc(100vh - 80px);
  }
  &.sidebar-mobile {
    min-height: 100vh;
    transition: none;
  }
  &.sidebar {
    min-height: 100vh;
    @media ${device.min.tablet} {
      margin-left: 170px !important;
    }
    @media ${device.min.laptop} {
      margin-left: 200px !important;
    }
    /* transition: margin 800ms ease-in-out;
    transition-delay: 350ms; */
  }
`;

const StyledContent = styled.div`
  color: ${({ theme }) => theme.color};
  margin-left: 0px;
  padding: 20px 30px; 
  @media ${device.max.tablet} {
    padding-top: 50px;
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
  const { appTheme } = appContext;
  return (
    <StyledBodyWrapper className="global-wrapper">
      <StyledAppWrapper className={`${appTheme} app-wrapper menu-top`}>
        <TopMenu />
        <StyledContentWrapper className="menu-top">
          <StyledContent>
            { children }
          </StyledContent>
        </StyledContentWrapper>
      </StyledAppWrapper>
    </StyledBodyWrapper>
  );
};

export default MainTemplate;
