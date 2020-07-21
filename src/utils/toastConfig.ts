export const toastSuccess = (message: string) => ({
  message,
  type: "success",
  duration: 5000,
  dismissible: true,
  position: "top"
});
export const toastError = (message: string) => ({
  message,
  type: "error",
  duration: 5000,
  dismissible: true,
  position: "top"
});
