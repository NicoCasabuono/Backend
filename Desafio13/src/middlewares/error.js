import { CodeError } from '../lib/error/constants/code.js'
import { responseError } from '../utils/response.js'

export const isError = (err, req, res, next) => {
  console.log(`${err.cause}: ${err.message}`)
  const response = responseError(CodeError.INTERNAL_SERVER_ERROR, null, { cause: err.cause, message: err.message })

  switch (err.code) {
    case CodeError.BAD_REQUEST: {
      response.status = CodeError.BAD_REQUEST
      res.status(response.status).send(response)
      break
    }
    case CodeError.UNAUTHORIZED: {
      response.status = CodeError.UNAUTHORIZED
      res.status(response.status).send(response)
      break
    }
    case CodeError.PAYMENT_REQUIRED: {
      response.status = CodeError.PAYMENT_REQUIRED
      res.status(response.status).send(response)
      break
    }
    case CodeError.FORBIDDEN: {
      response.status = CodeError.FORBIDDEN
      res.status(response.status).send(response)
      break
    }
    case CodeError.NOT_FOUND: {
      response.status = CodeError.NOT_FOUND
      res.status(response.status).send(response)
      break
    }
    case CodeError.METHOD_NOT_ALLOWED: {
      response.status = CodeError.METHOD_NOT_ALLOWED
      res.status(response.status).send(response)
      break
    }
    case CodeError.NOT_ACCEPTABLE: {
      response.status = CodeError.NOT_ACCEPTABLE
      res.status(response.status).send(response)
      break
    }
    case CodeError.PROXY_AUTHENTICATION_REQUIRED: {
      response.status = CodeError.PROXY_AUTHENTICATION_REQUIRED
      res.status(response.status).send(response)
      break
    }
    case CodeError.REQUEST_TIMEOUT: {
      response.status = CodeError.REQUEST_TIMEOUT
      res.status(response.status).send(response)
      break
    }
    case CodeError.CONFLICT: {
      response.status = CodeError.CONFLICT
      res.status(response.status).send(response)
      break
    }
    case CodeError.GONE: {
      response.status = CodeError.GONE
      res.status(response.status).send(response)
      break
    }
    case CodeError.LENGTH_REQUIRED: {
      response.status = CodeError.LENGTH_REQUIRED
      res.status(response.status).send(response)
      break
    }
    case CodeError.PRECONDITION_FAILED: {
      response.status = CodeError.PRECONDITION_FAILED
      res.status(response.status).send(response)
      break
    }
    case CodeError.PAYLOAD_TOO_LARGE: {
      response.status = CodeError.PAYLOAD_TOO_LARGE
      res.status(response.status).send(response)
      break
    }
    case CodeError.URI_TOO_LONG: {
      response.status = CodeError.URI_TOO_LONG
      res.status(response.status).send(response)
      break
    }
    case CodeError.UNSUPPORTED_MEDIA_TYPE: {
      response.status = CodeError.UNSUPPORTED_MEDIA_TYPE
      res.status(response.status).send(response)
      break
    }
    case CodeError.RANGE_NOT_SATISFIABLE: {
      response.status = CodeError.RANGE_NOT_SATISFIABLE
      res.status(response.status).send(response)
      break
    }
    case CodeError.EXPECTATION_FAILED: {
      response.status = CodeError.EXPECTATION_FAILED
      res.status(response.status).send(response)
      break
    }
    case CodeError.MISDIRECTED_REQUEST: {
      response.status = CodeError.MISDIRECTED_REQUEST
      res.status(response.status).send(response)
      break
    }
    case CodeError.UNPROCESSABLE_ENTITY: {
      response.status = CodeError.UNPROCESSABLE_ENTITY
      res.status(response.status).send(response)
      break
    }
    case CodeError.LOCKED: {
      response.status = CodeError.LOCKED
      res.status(response.status).send(response)
      break
    }
    case CodeError.FAILED_DEPENDENCY: {
      response.status = CodeError.FAILED_DEPENDENCY
      res.status(response.status).send(response)
      break
    }
    case CodeError.TOO_EARLY: {
      response.status = CodeError.TOO_EARLY
      res.status(response.status).send(response)
      break
    }
    case CodeError.UPGRADE_REQUIRED: {
      response.status = CodeError.UPGRADE_REQUIRED
      res.status(response.status).send(response)
      break
    }
    case CodeError.PRECONDITION_REQUIRED: {
      response.status = CodeError.PRECONDITION_REQUIRED
      res.status(response.status).send(response)
      break
    }
    case CodeError.TOO_MANY_REQUESTS: {
      response.status = CodeError.TOO_MANY_REQUESTS
      res.status(response.status).send(response)
      break
    }
    case CodeError.REQUEST_HEADER_FIELDS_TOO_LARGE: {
      response.status = CodeError.REQUEST_HEADER_FIELDS_TOO_LARGE
      res.status(response.status).send(response)
      break
    }
    case CodeError.UNAVAILABLE_FOR_LEGAL_REASONS: {
      response.status = CodeError.UNAVAILABLE_FOR_LEGAL_REASONS
      res.status(response.status).send(response)
      break
    }
    case CodeError.INTERNAL_SERVER_ERROR: {
      response.status = CodeError.INTERNAL_SERVER_ERROR
      res.status(response.status).send(response)
      break
    }
    case CodeError.NOT_IMPLEMENTED: {
      response.status = CodeError.NOT_IMPLEMENTED
      res.status(response.status).send(response)
      break
    }
    case CodeError.BAD_GATEWAY: {
      response.status = CodeError.BAD_GATEWAY
      res.status(response.status).send(response)
      break
    }
    case CodeError.SERVICE_UNAVAILABLE: {
      response.status = CodeError.SERVICE_UNAVAILABLE
      res.status(response.status).send(response)
      break
    }
    case CodeError.GATEWAY_TIMEOUT: {
      response.status = CodeError.GATEWAY_TIMEOUT
      res.status(response.status).send(response)
      break
    }
    case CodeError.HTTP_VERSION_NOT_SUPPORTED: {
      response.status = CodeError.HTTP_VERSION_NOT_SUPPORTED
      res.status(response.status).send(response)
      break
    }
    case CodeError.VARIANT_ALSO_NEGOTIATES: {
      response.status = CodeError.VARIANT_ALSO_NEGOTIATES
      res.status(response.status).send(response)
      break
    }
    case CodeError.INSUFFICIENT_STORAGE: {
      response.status = CodeError.INSUFFICIENT_STORAGE
      res.status(response.status).send(response)
      break
    }
    case CodeError.LOOP_DETECTED: {
      response.status = CodeError.LOOP_DETECTED
      res.status(response.status).send(response)
      break
    }
    case CodeError.NOT_EXTENDED: {
      response.status = CodeError.NOT_EXTENDED
      res.status(response.status).send(response)
      break
    }
    case CodeError.NETWORK_AUTHENTICATION_REQUIRED: {
      response.status = CodeError.NETWORK_AUTHENTICATION_REQUIRED
      res.status(response.status).send(response)
      break
    }

    default: {
      res.status(response.status).send(response)
      break
    }
  }
}
