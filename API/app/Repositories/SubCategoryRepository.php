<?php

namespace App\Repositories;

use App\Models\SubCategory;
use InfyOm\Generator\Common\BaseRepository;

class SubCategoryRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'category'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return SubCategory::class;
    }
}
