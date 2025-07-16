import React from 'react';

const BloodInfoCard = ({bg,q}) => {
  const bloodGroup=bg
  const quantity=q
  return (
    <div className="p-1 bg-white shadow-lg rounded-lg">

      {/* Blood Pouch Image */}
      <div className="flex justify-center">
        <div className="w-24 h-40 bg-red-600 rounded-xl flex flex-col items-center justify-center m-1">
          <div className="text-white font-bold">{quantity} ml</div>
        </div>
      </div>

      {/* Blood Information */}
      <div className="text-center">
        <div className="text-2xl font-bold text-red-700">{bloodGroup}</div>
      </div>

    </div>
  );
};

export default BloodInfoCard;
