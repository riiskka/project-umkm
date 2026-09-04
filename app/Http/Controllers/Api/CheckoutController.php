<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'payment_method' => ['required', 'in:Transfer Bank,COD,E-Wallet'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $order = DB::transaction(function () use ($data) {
            $productIds = collect($data['items'])->pluck('product_id');
            $products = Product::whereIn('id', $productIds)->lockForUpdate()->get()->keyBy('id');

            $order = Order::create([
                'user_id' => Auth::id(),
                'status' => 'paid',
            ]);

            $total = 0;
            $hasItems = false;

            foreach ($data['items'] as $item) {
                $product = $products->get($item['product_id']);
                if (! $product) {
                    continue;
                }

                $qty = min($item['quantity'], $product->stock);
                if ($qty <= 0) {
                    continue;
                }

                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'unit_price' => $product->price,
                ]);

                $product->decrement('stock', $qty);
                $total += $product->price * $qty;
                $hasItems = true;
            }

            abort_if(! $hasItems, 422, 'Stok produk yang kamu pesan tidak mencukupi.');

            Payment::create([
                'order_id' => $order->id,
                'method' => $data['payment_method'],
                'amount' => $total,
            ]);

            return $order;
        });

        $order->load(['details.product', 'payment']);

        return response()->json(['order' => $order], 201);
    }
}
