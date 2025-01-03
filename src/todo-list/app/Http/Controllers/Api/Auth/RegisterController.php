<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Auth\Events\Registered;


class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    use ApiResponse;
    public function __invoke(RegisterRequest $request)
    {
        $user = User::create($request->getData());

        if (!$user) {
            return $this->errorResponse('User not created', 500);
        }
        
        event(new Registered($user));

        $remember_token = bin2hex(random_bytes(10));

        $user->update([
            'remember_token' => $remember_token
        ]);
        $cookie = cookie('remember_token', $remember_token, 60 * 24 * 30);

        return $this->created(['user' => $user], 'User created successfully, please verify your email')->withCookie($cookie);
    }
}
