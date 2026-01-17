import { useState, useCallback } from "react"

interface UseStepsOptions {
  initialStep?: number
  totalSteps: number
  onStepChange?: (step: number) => void
}

export function useSteps({ initialStep = 1, totalSteps, onStepChange }: UseStepsOptions) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step)
        onStepChange?.(step)
      }
    },
    [totalSteps, onStepChange]
  )

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      onStepChange?.(newStep)
    }
  }, [currentStep, totalSteps, onStepChange])

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      onStepChange?.(newStep)
    }
  }, [currentStep, onStepChange])

  const reset = useCallback(() => {
    setCurrentStep(initialStep)
    onStepChange?.(initialStep)
  }, [initialStep, onStepChange])

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return {
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    previousStep,
    reset,
    isFirstStep,
    isLastStep,
  }
}

