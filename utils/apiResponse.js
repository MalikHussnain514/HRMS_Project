export const success = (message, data, statusCode) => {
  return {
    message,
    success: true,
    statusCode,
    data,
  };
};

export const useErrorResponse = (message, statusCode) => {
  return {
    message,
    success: false,
    statusCode,
  };
};
