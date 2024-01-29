import React from "react";

function Error() {
  return (
    <div className="whole-page-container">
      <div className="w-300-px margin-1rem">
        <div className="flex-row x-centered y-centered h-40-px bg-red A-red-border">
          <span className="heading-text">ERROR</span>
        </div>
        <div className="flex-row x-centered y-centered U-gray-border h-80-px ">
          <p className="basic-text">
            Došlo k chybě. Zkuste znovu načíst stránku. Při přetrvávajících
            potížích kontaktujte správce.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
