interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  activeColor?: string
  inactiveColor?: string
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  activeColor = "#dc2626", // red-600
  inactiveColor = "#d1d5db", // gray-300
}: StepIndicatorProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="mb-6 px-4">
      <div className="relative flex items-center justify-between">
        {/* Barra de progresso de fundo */}
        <div 
          className="absolute top-5 left-10 right-10 h-0.5"
          style={{ backgroundColor: inactiveColor }}
        />
        
        {/* Barra de progresso animada */}
        <div
          className="absolute top-5 left-10 h-0.5 transition-all duration-500 ease-out"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: activeColor,
          }}
        />
        
        {/* Bolinhas */}
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isActive = step <= currentStep
          return (
            <div
              key={step}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "text-white shadow-lg scale-110"
                  : "bg-white text-gray-400"
              }`}
              style={{
                borderColor: isActive ? activeColor : inactiveColor,
                backgroundColor: isActive ? activeColor : undefined,
              }}
            >
              <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-400"}`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

