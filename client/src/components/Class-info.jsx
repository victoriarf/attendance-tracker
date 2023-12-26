import React from "react";

function ClassInfo(props) {

  return (
      <>
        <div> Price: <strong> {'props.price'} </strong></div>
        <div> Payment: <strong> {'props.payment'} </strong></div>
        <div> Next payment: <strong> {'props.payment'} </strong></div>
      </>
  )
}

export default ClassInfo
