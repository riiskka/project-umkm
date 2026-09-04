<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| JSON API routes used by the React frontend
|--------------------------------------------------------------------------
| These stay on the "web" middleware group (session + CSRF), so the React
| app must send the X-CSRF-TOKEN header (see resources/js/api.js) and
| fetch() with credentials: 'include'.
*/
Route::prefix('api')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('auth')->group(function () {
        Route::post('/checkout', [CheckoutController::class, 'store']);
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/{order}', [OrderController::class, 'show']);
    });
});

/*
|--------------------------------------------------------------------------
| React SPA catch-all
|--------------------------------------------------------------------------
| Every other route serves the same Blade view, which mounts the React
| app. React Router then takes over navigation on the client side.
| "admin" is excluded so the Filament admin panel keeps working.
*/
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!admin).*$');
