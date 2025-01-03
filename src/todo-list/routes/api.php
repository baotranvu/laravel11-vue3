<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::group(['prefix' => 'v2'], base_path('routes/Api/V2/Task.php'));
});

Route::group(['prefix' => 'v1'], base_path('routes/Api/V1/Task.php'));



Route::group(['prefix' => 'auth'], base_path('routes/Api/Auth/Auth.php'));

//user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

