<?php

namespace App\Repositories;

use App\Models\OrderFactor;
use InfyOm\Generator\Common\BaseRepository;

class OrderFactorRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'status',
        'count',
        'sum'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return OrderFactor::class;
    }
}
