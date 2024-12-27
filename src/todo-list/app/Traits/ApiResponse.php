<?php

namespace App\Traits;

trait ApiResponse
{
    /**
     * Return a success JSON response.
     *
     * @param array|string $data
     * @param string|null $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function success($data, string $message = null, int $code = 200)
    {
        return response()->json([
            'status' => 'Success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Return an error JSON response.
     *
     * @param string $message
     * @param int $code
     * @param array|string|null $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function error(string $message, int $code, $data = null)
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Handle validation error response.
     *
     * @param \Illuminate\Validation\ValidationException $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function validationError($exception)
    {
        return response()->json([
            'status' => 'Error',
            'message' => 'Validation Error',
            'errors' => $exception->errors()
        ], 422);
    }

    /**
     * Handle not found error response.
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function notFound(string $message = 'Resource not found')
    {
        return $this->error($message, 404);
    }

    /**
     * Handle unauthorized error response.
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function unauthorized(string $message = 'Unauthorized')
    {
        return $this->error($message, 401);
    }

    /**
     * Handle forbidden error response.
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function forbidden(string $message = 'Forbidden')
    {
        return $this->error($message, 403);
    }

    /**
     * Handle server error response.
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function serverError(string $message = 'Server Error')
    {
        return $this->error($message, 500);
    }
}
