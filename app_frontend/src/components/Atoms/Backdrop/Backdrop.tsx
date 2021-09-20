import React, { useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

interface BackdropTypes {
  backdropShow: boolean;
    onClick(event: React.MouseEvent<HTMLDivElement>): void | undefined;
}

const StyledBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(16,16,16,0.85);
  z-index: 50;
  top: 0;
  left: 0;
`;

const Backdrop: React.FC<BackdropTypes> = ({ backdropShow, onClick }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition in={backdropShow} mountOnEnter unmountOnExit timeout={900} classNames="backdrop" nodeRef={nodeRef}>
      <StyledBackdrop onClick={onClick} ref={nodeRef} />
    </CSSTransition>
  );
};

export default Backdrop;
