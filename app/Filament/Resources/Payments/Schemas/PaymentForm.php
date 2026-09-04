<?php

namespace App\Filament\Resources\Payments\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PaymentForm
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

                Select::make('method')
                    ->label('Payment Method')
                    ->options([
                        'cash' => 'Cash',
                        'transfer' => 'Transfer',
                        'qris' => 'QRIS',
                        'ewallet' => 'E-Wallet',
                    ])
                    ->required(),

                TextInput::make('amount')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
            ]);
    }
}