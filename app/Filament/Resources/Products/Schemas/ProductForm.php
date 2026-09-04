<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('store_id')
                    ->label('Store')
                    ->relationship('store', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                TextInput::make('name')
                    ->required(),

                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),

                TextInput::make('stock')
                    ->required()
                    ->numeric(),
            ]);
    }
}