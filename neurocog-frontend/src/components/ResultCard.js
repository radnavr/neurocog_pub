import React from 'react'

const ResultCard = ({ name, placing, desc }) => {
  return (
    <div className="flex-row h-80-px y-centered">
      <div className="w-100-per bg-light-gray O-gray-border margin-0-15px">
          <div className="flex-row bg-medium-gray x-betweened y-centered h-32-px">
              <span className="heading-text indented">{name}</span>
              <span className="heading-text indented">{placing}</span>
          </div>
          <div className="flex-row bg-light-gray y-centered h-33-px">
              <p className="basic-text indented">{desc}</p>
          </div>
      </div>
    </div>
  )
}

export default ResultCard