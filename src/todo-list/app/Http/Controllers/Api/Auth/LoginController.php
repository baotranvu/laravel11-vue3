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
        if (!auth()->attempt($request->only('email', 'password'))) {
            return $this->errorResponse('User name or password is incorrect', null, HttpStatus::UNAUTHORIZED);
        }
        $token = auth()->user()->createToken('API Token')->plainTextToken;
        $cookie = cookie('api_token', $token, 60); 
        return $this->successResponse([
                'token' => $token,
                'user' => auth()->user()
        ], 'Login successful', HttpStatus::OK)->withCookie($cookie->withSecure(false)->withHttpOnly(false));
    }
}
