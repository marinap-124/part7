import React from 'react'

import { useSelector } from 'react-redux'

const Notification = () => {

  const data = useSelector(state => state.notificationReduc)
  const notification = data.notification
  const style = data.style

  if(notification === '' || notification === null)
    return (
      <div></div>
    )

  return (
    <div className={style}>
      {notification}
    </div>
  )

}

export default Notification