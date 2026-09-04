<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['details.product', 'payment'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return response()->json(['orders' => $orders]);
    }

    public function show(Order $order)
    {
        abort_unless($order->user_id === Auth::id(), 403);

        $order->load(['details.product', 'payment']);

        return response()->json(['order' => $order]);
    }
}
