<?php

namespace App\Repositories;

use App\Models\LOG;
use InfyOm\Generator\Common\BaseRepository;

class LOGRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'title',
        'description'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return LOG::class;
    }
}
