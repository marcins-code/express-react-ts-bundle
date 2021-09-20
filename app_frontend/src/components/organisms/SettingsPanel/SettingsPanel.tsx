import React, { useContext, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom';
import { darken } from 'polished';
import { CSSTransition } from 'react-transition-group';
import InlineSwitcher from '../../molecules/InlineSwitcher/InlineSwitcher';
import { PageContext } from '../../../context';
import { settingsPanelItems } from '../../../languages/settingsPanel';
import './animations.css';
import StyledToggleButton from '../../Atoms/StyledToggleButton/StyledToggleButton';

const StyledPanelWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 500000;
  width: 270px;
  top: 50px;
  right: 0;
  margin-right: -5px;
  background-color: #3b3b3b;
  background-image: linear-gradient(to bottom,
  rgba(10, 10, 10, 0.6) 0%,
  rgba(0, 0, 0, 0.6) 50%,
  rgba(10, 10, 10, 0.8) 100%),
  url('https://www.transparenttextures.com/patterns/cardboard-flat.png');
  box-shadow: -5px 10px 40px -15px rgba(0, 0, 0, 0.5), 0 0 145px rgba(0, 0, 0, 0.65) inset;
  border-radius: 25px 0 0 25px;
  justify-items: center;
  justify-content: center;
  text-align: center;
  border: solid #404040 2px;

  @media (max-height: 575px) {
    position: absolute;
  }
`;

const StyledCloseButton = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.grey400};
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 10px;
  &:hover {
    color: ${({ theme }) => theme.warning};
    transition: color 400ms ease;
  }
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 60px;
`;

const StyledLabel = styled.p`
  font-size: 1.6rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin-top: 10px;
  color: ${({ theme }) => theme.grey200};
`;

const StyledDivider = styled.hr`
  border-color: #585858;
  border-style: inset;
  border-width: 1px;
  margin: 0 5px;
`;
const StyledSettingButton = css`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: ridge 2px #a2a2a2;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  position: relative;
  &:focus,
  :active {
    outline: none;
  }
  &.active {
    &::before {
      content: '✔︎';
      color: #29b64f;
      text-shadow: 0 1px 1px black;
    }
  }
`;
const StyledDarkButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(
    ${({ theme }) => theme.dark},
    ${({ theme }) => darken(0.1, theme.dark)}
  );
`;

const StyledLightButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(
    ${({ theme }) => theme.light},
    ${({ theme }) => darken(0.2, theme.light)}
  );
`;

const StyledChocolateButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(
    ${({ theme }) => theme.chocolate},
    ${({ theme }) => darken(0.1, theme.chocolate)}
  );
`;

const SettingsPanel = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isSpinIcon, setIsSpinIcon] = useState(false);
  const panelShowHandler = () => setIsPanelVisible(true);
  const panelHideHandler = () => setIsPanelVisible(false);
  const buttonSpinHandlerOff = () => setIsSpinIcon(false);

  const appContext = useContext(PageContext);
  const {
    appLanguage,
    langSwitcherHandler,
    appTheme,
    appThemeHandler,
    navPosition,
    navPositionHandler,
    isMobile,
    rememberSettingsHandler,
    rememberSettings,
  } = appContext;

  const buttonSpinHandlerOn = () => setIsSpinIcon(!isMobile && true);
  const nodeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    chooseLanguage, chooseTheme, chooseLayout, rememberSettingsPH,
  } = settingsPanelItems[appLanguage];

  const panel = (
    <>
      <CSSTransition in={isPanelVisible} classNames="panel" timeout={1000} unmountOnExit nodeRef={nodeRef}>
        <StyledPanelWrapper ref={nodeRef}>
          <StyledCloseButton
            icon={['far', 'times-circle']}
            style={{ float: 'left' }}
            onClick={panelHideHandler}
          />
          <StyledSectionWrapper style={{ flexDirection: 'column' }}>
            <StyledLabel>{chooseLanguage}</StyledLabel>
            <InlineSwitcher
              name="langSwitch"
              defaultChecked={appLanguage === 'en'}
              switchColor="indygo"
              notCheckedColor="blue"
              onChange={langSwitcherHandler}
              labelBefore="🇵🇱"
              labelAfter="🇬🇧"
              labelBeforeStyle={{ fontSize: '20px' }}
              labelAfterStyle={{ fontSize: '20px' }}
            />
          </StyledSectionWrapper>
          <StyledDivider />
          <StyledLabel>{chooseTheme}</StyledLabel>
          <StyledSectionWrapper>
            <StyledDarkButton
              data-apptheme="dark"
              onClick={appThemeHandler}
              className={appTheme === 'dark' ? 'active' : undefined}
            />
            <StyledLightButton
              data-apptheme="light"
              onClick={appThemeHandler}
              className={appTheme === 'light' ? 'active' : undefined}
            />
            <StyledChocolateButton
              data-apptheme="chocolate"
              onClick={appThemeHandler}
              className={appTheme === 'chocolate' ? 'active' : undefined}
            />
          </StyledSectionWrapper>
          {!isMobile && (
          <>
            <StyledDivider />
            <StyledLabel>{chooseLayout}</StyledLabel>
            <StyledSectionWrapper>
              <InlineSwitcher
                name="menuSwitch"
                defaultChecked={navPosition === 'sidebar'}
                switchColor="indygo"
                notCheckedColor="blue"
                onChange={navPositionHandler}
                labelBefore="Top Menu"
                labelAfter="Sidebar"
                labelBeforeStyle={{ fontSize: '1.2rem', color: '#fafafa' }}
                labelAfterStyle={{ fontSize: '1.2rem', color: '#fafafa' }}
              />
            </StyledSectionWrapper>
          </>
          )}
          <StyledDivider />
          <StyledLabel>{rememberSettingsPH}</StyledLabel>
          <StyledSectionWrapper style={{ justifyContent: 'center' }}>
            <InlineSwitcher
              name="rememberSettings"
              defaultChecked={rememberSettings}
              switchColor="success"
              notCheckedColor="dark"
              onChange={rememberSettingsHandler}
              labelBeforeStyle={undefined}
              labelAfterStyle={undefined}
              labelBefore={undefined}
              labelAfter={undefined}
            />
          </StyledSectionWrapper>
        </StyledPanelWrapper>
      </CSSTransition>
      <CSSTransition in={!isPanelVisible} timeout={1000} classNames="toggle-button" unmountOnExit nodeRef={buttonRef}>
        <StyledToggleButton type="button" onClick={panelShowHandler} onMouseOver={buttonSpinHandlerOn} onMouseLeave={buttonSpinHandlerOff} ref={buttonRef}>
          <FontAwesomeIcon icon={['fas', 'cog']} spin={isSpinIcon} />
        </StyledToggleButton>
      </CSSTransition>
    </>
  );
  return ReactDOM.createPortal(panel, document.getElementById('tools-hook')!);
};

export default SettingsPanel;
