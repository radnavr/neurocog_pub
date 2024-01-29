import React from 'react'
import Button from './Button'

const ActionMenu = ({ btnDesignation, handleDeleteClick, handleEditClick, item }) => {
  return (
    <div className="flex-row x-evened y-centered">
      <Button btnDesignation={btnDesignation} btnName="UPRAVIT" onClick={(e) => handleEditClick(e, item)}/>
      <Button btnDesignation={btnDesignation} btnName="ODSTRANIT" onClick={(e) => handleDeleteClick(e, item)}/> 
    </div>
  )
}

export default ActionMenu