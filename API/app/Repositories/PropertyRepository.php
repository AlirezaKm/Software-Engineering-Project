<?php

namespace App\Repositories;

use App\Models\Property;
use InfyOm\Generator\Common\BaseRepository;

class PropertyRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'subcategory',
        'name'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Property::class;
    }
}
