import React, { useState, useImperativeHandle } from "react"

const Toggler = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { 
    display: visible ? "none" : ""
  }
  const showWhenVisible = { 
    display: visible ? "" : "none",
    width: "100%"
  }

  const handleTogglerClick = (e) => {
    // console.log(e.target.id)
    if(e.target.id && e.target.id !== "NewBlogForm") {
      e.target.id === "UserControl"
        ? props.setActiveForm(null)
        : props.setActiveForm(e.target.id)
    }

    toggleVisibility()
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hide = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      hide
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id={props.buttonId} className={props.buttonClasses} onClick={handleTogglerClick}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id={props.cancelId} onClick={handleTogglerClick}>cancel</button>
      </div>
    </div>
  )
})

export default Toggler
