import React from 'react'

const ResultsInfo = ({ infoLineOne, infoLineTwo }) => {
  return (
    <div className='flex-column x-centered y-centered h-100-per w-100-per basic-text'>
        <div className='flex-column y-centered'>
            <p><i>{infoLineOne}</i></p>
            <p><i>{infoLineTwo}</i></p>
        </div>
    </div>
  )
}

export default ResultsInfo