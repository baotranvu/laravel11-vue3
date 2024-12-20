<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {
        User::create($request->getData());

        return response()->json([
            'message' => 'You are registered',
            'token' => auth()->user()->createToken('laravel_api_token')->plainTextToken,
        ]);
    }
}
