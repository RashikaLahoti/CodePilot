export function success(res, data = {}, message = "Success") {
  return sendResponse(res, 200, true, message, data);
}

export function created(res, data = {}, message = "Created") {
  return sendResponse(res, 201, true, message, data);
}

export function notFound(res, data = {}, message = "Not Found") {
  return sendResponse(res, 404, false, message, data);
}

export function unAuthorized(res, data = {}, message = "Unauthorized") {
  return sendResponse(res, 401, false, message, data);
}

export function forbidden(res, data = {}, message = "Forbidden") {
  return sendResponse(res, 403, false, message, data);
}

export function internalServerError(
  res,
  data = {},
  message = "Internal Server Error",
) {
  return sendResponse(res, 500, false, message, data);
}

export function badRequest(res, data = {}, message = "Bad Request") {
  return sendResponse(res, 400, false, message, data);
}

export function customError(res, data = {}, status = 500, message = "Error") {
  sendResponse(res, status, false, message, data);
}

function sendResponse(res, status, success, message, data = {}, error = null) {
  return res.status(status).json({
    success,
    message,
    data,
    error,
  });
}
