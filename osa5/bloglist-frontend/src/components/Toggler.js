import React, { useState, useImperativeHandle } from "react"

const Toggler = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { 
    display: visible ? "" : "none",
    width: "100%"
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </span>
      <span style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </span>
    </div>
  )
})

export default Toggler
