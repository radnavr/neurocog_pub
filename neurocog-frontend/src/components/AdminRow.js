import React from 'react'
import ActionMenu from './ActionMenu';
import ConfirmationMenu from './ConfirmationMenu';

const ReadOnlyAdminRow = ({ 
  rowActionLayout,
  actionDesignation, 
  item, 
  handleCancel, 
  handleDeleteClick, 
  handleDeleteConfirm, 
  handleEditClick, 
  handleEditConfirm
}) => {
  return (
    <tr className={
        rowActionLayout === item._id 
        ? 'bg-light-gray'
        : ''
      }>
        <td className="h-40-px w-30-per"><p className="basic-text indented">{item.jmeno}</p></td>
        <td className="h-40-px w-30-per"><p className="basic-text indented">{item.zaber}</p></td>
        <td className="basic-text text-align-center h-40-px w-5-per">{`${item.minVek}-${item.maxVek}`}</td>
        <td className="basic-text text-align-center h-40-px w-10-per">{item.umisteni}</td>
        <td className="basic-text text-align-center h-40-px w-5-per">{item.id}</td>
        <td className="text-align-center h-40-px w-20-per">{
          rowActionLayout === item._id ? 
            <ConfirmationMenu 
              actionDesignation={actionDesignation}
              btnDesignation={"btn primary w-120-px"}
              btnType="button" 
              handleCancel={handleCancel} 
              handleEditConfirm={handleEditConfirm}
              handleDeleteConfirm={handleDeleteConfirm} 
              item={item}
            /> :
            <ActionMenu 
              btnDesignation={"btn primary w-120-px"} 
              btnType="button" 
              handleEditClick={handleEditClick} 
              handleDeleteClick={handleDeleteClick}
              item={item}
            />  
          }
        </td>
    </tr>
  )
}

export default ReadOnlyAdminRow