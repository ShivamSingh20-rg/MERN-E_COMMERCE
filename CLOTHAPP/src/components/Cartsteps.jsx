import React from 'react';

export default function Cartsteps({ currentStep }) {
  
  const steps = [
    { id: 1, name: 'Order Summary' },
    { id: 2, name: 'Delivery Address' },
    { id: 3, name: 'Confirm Order' },
    { id: 4, name: 'Payment' }
  ];

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line Behind Buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 z-0">
          <div 
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Individual Step Circles */}
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-black border-black text-white' 
                    : isActive 
                    ? 'bg-white border-black text-black shadow-md ring-4 ring-gray-100' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span 
                className={`text-xs uppercase font-black tracking-wider mt-2 bg-gray-50 px-2 ${
                  isActive || isCompleted ? 'text-black' : 'text-gray-400'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}