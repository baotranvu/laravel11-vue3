<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    use ApiResponse;
    public function __invoke(Request $request)
    {
       $request->user()->currentAccessToken()->delete();

       return $this->successResponse(null, 'Logout successful', HttpStatus::OK)->withCookie(cookie()->forget('api_token'));
    }
}
