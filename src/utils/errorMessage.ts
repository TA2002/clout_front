export const getErrorMessage = (error: any) => {
  if (error.response.data.detail == undefined) {
    let json = error.response.data;
    let errorMessage = ``;
    Object.entries(json).forEach(([key, value]) => {
      errorMessage += `${key}: ${value}\n`;
    });
    return errorMessage;
  } else {
    return error.response.data.detail;
  }
};
