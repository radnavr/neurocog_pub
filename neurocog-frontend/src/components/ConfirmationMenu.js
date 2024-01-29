import React from 'react'
import Button from './Button'

const ConfirmationMenu = ({ 
  actionDesignation, 
  btnDesignation, 
  btnType, 
  item, 
  handleCancel, 
  handleDeleteConfirm, 
  handleEditConfirm
}) => {

  // ONCLICK FX ASIGNMENT
  const designatedAction = (e) => {
    if (actionDesignation === "PUT") {
      handleEditConfirm(e, item)
    }
    if (actionDesignation === "DELETE") {
      handleDeleteConfirm(e, item)
    }
  }

  return (
      <div className="flex-row x-evened y-centered">
        <Button 
          btnDesignation={btnDesignation} 
          btnName="POTVRDIT"  
          btnType={btnType} 
          onClick={designatedAction}
        />
        <Button 
          btnDesignation={btnDesignation} 
          btnName="ZRUŠIT" 
          btnType={btnType} 
          onClick={handleCancel}
        /> 
      </div>
  )
}

export default ConfirmationMenu