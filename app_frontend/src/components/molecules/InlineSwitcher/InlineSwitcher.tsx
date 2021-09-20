import React from 'react';
import styled from 'styled-components';
import Switcher, { SwitcherProps } from '../../Atoms/Switcher/Switcher';

interface InlineSwitcherProps extends SwitcherProps {
    labelBeforeStyle: React.CSSProperties | undefined;
    labelAfterStyle: React.CSSProperties| undefined;
    labelBefore:string| undefined;
    labelAfter:string | undefined;
}

const StyledSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InlineSwitcher: React.FC<InlineSwitcherProps> = ({
  name,
  switchColor,
  notCheckedColor,
  defaultChecked,
  value,
  onChange,
  labelBeforeStyle,
  labelAfterStyle,
  labelBefore,
  labelAfter,
}) => (
  <StyledSwitchWrapper>
    <span style={labelBeforeStyle}>{labelBefore}</span>
    <Switcher
      name={name}
      switchColor={switchColor}
      notCheckedColor={notCheckedColor}
      defaultChecked={defaultChecked}
      value={value}
      onChange={onChange}
    />
    <span style={labelAfterStyle}>{labelAfter}</span>
  </StyledSwitchWrapper>

);

export default InlineSwitcher;
