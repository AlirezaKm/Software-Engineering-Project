<?php

namespace App\Repositories;

use App\Models\Order;
use InfyOm\Generator\Common\BaseRepository;

class OrderRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'product',
        'count',
        'orderFactor'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Order::class;
    }
}
