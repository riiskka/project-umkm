<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $owner = User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        $customer = User::firstOrCreate(
            ['email' => 'pelanggan@example.com'],
            ['name' => 'Budi Pelanggan', 'password' => bcrypt('password')]
        );

        $store = Store::firstOrCreate(
            ['user_id' => $owner->id],
            ['name' => 'Maison Bake Pusat', 'address' => 'Jl. Merdeka No. 10, Jakarta']
        );

        $products = [
            ['name' => 'Croissant Butter', 'price' => 18000, 'stock' => 25, 'description' => 'Croissant renyah berlapis mentega premium.', 'weight' => 80],
            ['name' => 'Sourdough Loaf', 'price' => 45000, 'stock' => 12, 'description' => 'Roti sourdough fermentasi 24 jam, tekstur kenyal.', 'weight' => 500],
            ['name' => 'Red Velvet Cake Slice', 'price' => 32000, 'stock' => 15, 'description' => 'Kue red velvet lembut dengan cream cheese frosting.', 'weight' => 150],
            ['name' => 'Choco Chip Cookies (isi 6)', 'price' => 25000, 'stock' => 30, 'description' => 'Cookies choco chip renyah di luar, lembut di dalam.', 'weight' => 200],
            ['name' => 'Cinnamon Roll', 'price' => 20000, 'stock' => 20, 'description' => 'Roll kayu manis dengan glaze manis di atasnya.', 'weight' => 100],
            ['name' => 'Baguette', 'price' => 22000, 'stock' => 15, 'description' => 'Baguette klasik ala Prancis, kulit garing.', 'weight' => 250],
        ];

        foreach ($products as $item) {
            $product = Product::firstOrCreate(
                ['store_id' => $store->id, 'name' => $item['name']],
                ['price' => $item['price'], 'stock' => $item['stock']]
            );

            ProductDetail::firstOrCreate(
                ['product_id' => $product->id],
                ['description' => $item['description'], 'weight' => $item['weight']]
            );
        }
    }
}