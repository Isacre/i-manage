interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext?: () => void
  onCancel: () => void
  nextLabel?: string
  previousLabel?: string
  cancelLabel?: string
  submitLabel?: string
  primaryColor?: string
  showPrevious?: boolean
  isSubmitting?: boolean
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onCancel,
  nextLabel = "Próximo",
  previousLabel = "Anterior",
  cancelLabel = "Cancelar",
  submitLabel = "Confirmar",
  primaryColor = "#dc2626", // red-600
  showPrevious = true,
  isSubmitting = false,
}: StepNavigationProps) {
  const isLastStep = currentStep >= totalSteps
  const showPreviousButton = showPrevious && currentStep > 1

  return (
    <div className="flex justify-between space-x-4 pt-4">
      <div>
        {showPreviousButton && (
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-lg border border-gray-300 bg-transparent p-2 px-3 text-gray-500 transition hover:bg-gray-100"
          >
            {previousLabel}
          </button>
        )}
      </div>
      <div className="flex space-x-4">
        {!isLastStep ? (
          <>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 bg-transparent p-2 px-3 text-gray-500 transition hover:bg-gray-100"
            >
              {cancelLabel}
            </button>
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="rounded-lg p-2 px-3 text-white transition hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                {nextLabel}
              </button>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 bg-transparent p-2 px-3 text-gray-500 transition hover:bg-gray-100"
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg p-2 px-3 text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: primaryColor }}
            >
              {submitLabel}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

