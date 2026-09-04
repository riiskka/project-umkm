<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Used by the cart page to fetch fresh data (price/stock) for a
        // specific set of product ids, e.g. /api/products?ids=1,2,3
        if ($request->filled('ids')) {
            $ids = array_filter(explode(',', $request->get('ids')));
            $products = Product::with(['store', 'detail'])->whereIn('id', $ids)->get();

            return response()->json(['products' => $products]);
        }

        $query = Product::with(['store', 'detail'])->where('stock', '>', 0);

        if ($search = $request->get('q')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($storeId = $request->get('store')) {
            $query->where('store_id', $storeId);
        }

        $products = $query->orderBy('name')->paginate(9)->withQueryString();

        return response()->json([
            'products' => $products,
            'stores' => Store::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['store', 'detail']);

        $related = Product::where('store_id', $product->store_id)
            ->where('id', '!=', $product->id)
            ->where('stock', '>', 0)
            ->limit(4)
            ->get();

        return response()->json([
            'product' => $product,
            'related' => $related,
        ]);
    }
}
