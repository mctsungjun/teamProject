import '../css/dropdown.css';
import React from "react";
import { useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
function NaviItem(props){
    const divRef = useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(props.default)
    return(
        <>
            <div className="select" default={props.default}>
                <span onClick={()=>setIsOpen(!isOpen)}>{selected}</span>
                <CSSTransition
                    nodeRef={divRef}
                    in={isOpen}
                    unmountOnExit
                    timeout={300}
                    classNames="drop"
                >
                <DropdownList ref={divRef}>{props.children}</DropdownList>
            </CSSTransition>
            </div>
        </>
    )
}
const DropdownList = React.forwardRef((props, ref) => {
    return (
      <ul ref={ref} className="dropdown-list">
        {props.children}
      </ul>
    )
  })
export {NaviItem, DropdownList}