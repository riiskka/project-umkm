<?php

namespace App\Filament\Resources\OrderDetails\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class OrderDetailForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('order_id')
                    ->label('Order')
                    ->relationship('order', 'id')
                    ->searchable()
                    ->preload()
                    ->required(),

                Select::make('product_id')
                    ->label('Product')
                    ->relationship('product', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->minValue(1),

                TextInput::make('unit_price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
            ]);
    }
}