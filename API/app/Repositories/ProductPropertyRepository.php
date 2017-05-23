<?php

namespace App\Repositories;

use App\Models\ProductProperty;
use InfyOm\Generator\Common\BaseRepository;

class ProductPropertyRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'product',
        'property'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return ProductProperty::class;
    }
}
