<?php

use Faker\Factory as Faker;
use App\Models\Factors;
use App\Repositories\FactorsRepository;
use Illuminate\Support\Facades\App;

trait MakeFactorsTrait
{
    /**
     * Create fake instance of Factors and save it in database
     *
     * @param array $factorsFields
     * @return Factors
     */
    public function makeFactors($factorsFields = [])
    {
        /** @var FactorsRepository $factorsRepo */
        $factorsRepo = App::make(FactorsRepository::class);
        $theme = $this->fakeFactorsData($factorsFields);
        return $factorsRepo->create($theme);
    }

    /**
     * Get fake instance of Factors
     *
     * @param array $factorsFields
     * @return Factors
     */
    public function fakeFactors($factorsFields = [])
    {
        return new Factors($this->fakeFactorsData($factorsFields));
    }

    /**
     * Get fake data of Factors
     *
     * @param array $postFields
     * @return array
     */
    public function fakeFactorsData($factorsFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'seller' => $fake->randomDigitNotNull,
            'sum' => $fake->randomDigitNotNull,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $factorsFields);
    }
}
