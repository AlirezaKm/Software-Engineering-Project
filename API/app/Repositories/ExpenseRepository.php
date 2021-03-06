<?php

namespace App\Repositories;

use App\Models\Expense;
use InfyOm\Generator\Common\BaseRepository;

class ExpenseRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'title',
        'price'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Expense::class;
    }
}
