<?php

namespace App\Repositories;

use App\Models\Sellers;
use InfyOm\Generator\Common\BaseRepository;

class SellersRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Sellers::class;
    }
}
