const ErrorLog = require("../models/error.model");

function HttpResponse(success, data, error) {
  return {
    success,
    data,
    error,
  };
}

function HttpApiResponse(data) {
  return HttpResponse(true, data, null);
}

function HttpErrorResponse(error) {
  return HttpResponse(false, null, error);
}

async function HandleError(controller, method, errorMessage) {
  console.log(`[${controller}: ${method}] Error: ` + errorMessage);
  const error = new ErrorLog();
  error.message = errorMessage;
  error.controller = controller;
  error.method = method;
  await error.save();
}

module.exports = { HttpApiResponse, HandleError, HttpErrorResponse };
