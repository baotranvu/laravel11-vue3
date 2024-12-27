<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Traits\ApiResponse;
use App\Constants\HttpStatus;

class LoginController extends Controller
{
    use ApiResponse;

    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        if (! auth()->attempt($request->only('email', 'password'))) {
            return $this->errorResponse('User name or password is incorrect', null, HttpStatus::UNAUTHORIZED);
        }

        return $this->successResponse([
            'token' => auth()->user()->createToken('API Token')->plainTextToken
        ], 'Login successful', HttpStatus::OK);
    }
}
