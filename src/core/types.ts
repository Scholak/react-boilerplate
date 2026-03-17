export type TMutationCallbacks<TData = void> = {
  onSuccess: (data: TData) => void
  onError: (error: unknown) => void
}
