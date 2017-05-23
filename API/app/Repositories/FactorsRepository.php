<?php

namespace App\Repositories;

use App\Models\Factors;
use InfyOm\Generator\Common\BaseRepository;

class FactorsRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'seller',
        'sum'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Factors::class;
    }
}
