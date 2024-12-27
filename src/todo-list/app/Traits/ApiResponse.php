<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

trait ApiResponse
{
    /**
     * Build API response structure
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @param bool $status
     * @return array
     */
    protected function buildResponse($data = null, ?string $message = null, int $code = 200, bool $status = true): array
    {
        return [
            'success' => $status,
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ];
    }

    /**
     * Return a success response
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @return JsonResponse
     */
    public function successResponse($data = null, ?string $message = null, int $code = Response::HTTP_OK): JsonResponse
    {
        return response()->json(
            $this->buildResponse($data, $message, $code),
            $code
        );
    }

    /**
     * Return an error response
     *
     * @param string|null $message
     * @param mixed $errors
     * @param int $code
     * @return JsonResponse
     */
    public function errorResponse(?string $message = null, $errors = null, int $code = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        return response()->json(
            $this->buildResponse($errors, $message, $code, false),
            $code
        );
    }

    /**
     * Return a validation error response
     *
     * @param mixed $errors
     * @param string|null $message
     * @return JsonResponse
     */
    public function validationError($errors, ?string $message = 'Validation failed'): JsonResponse
    {
        return $this->errorResponse($message, $errors, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Return a not found error response
     *
     * @param string $message
     * @param mixed $data
     * @return JsonResponse
     */
    public function notFound(string $message = 'Resource not found', $data = null): JsonResponse
    {
        return $this->errorResponse($message, $data, Response::HTTP_NOT_FOUND);
    }

    /**
     * Return an unauthorized error response
     *
     * @param string $message
     * @param mixed $data
     * @return JsonResponse
     */
    public function unauthorized(string $message = 'Unauthorized', $data = null): JsonResponse
    {
        return $this->errorResponse($message, $data, Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Return a forbidden error response
     *
     * @param string $message
     * @param mixed $data
     * @return JsonResponse
     */
    public function forbidden(string $message = 'Forbidden', $data = null): JsonResponse
    {
        return $this->errorResponse($message, $data, Response::HTTP_FORBIDDEN);
    }

    /**
     * Return a server error response
     *
     * @param string $message
     * @param mixed $data
     * @return JsonResponse
     */
    public function serverError(string $message = 'Server Error', $data = null): JsonResponse
    {
        return $this->errorResponse($message, $data, Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * Return a created response
     *
     * @param mixed $data
     * @param string|null $message
     * @return JsonResponse
     */
    public function created($data = null, ?string $message = 'Resource created successfully'): JsonResponse
    {
        return $this->successResponse($data, $message, Response::HTTP_CREATED);
    }

    /**
     * Return a no content response
     *
     * @param string|null $message
     * @return JsonResponse
     */
    public function noContent(?string $message = 'No content'): JsonResponse
    {
        return $this->successResponse(null, $message, Response::HTTP_NO_CONTENT);
    }
}
