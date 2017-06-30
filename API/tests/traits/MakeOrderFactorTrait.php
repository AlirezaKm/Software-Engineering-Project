<?php

use Faker\Factory as Faker;
use App\Models\OrderFactor;
use App\Repositories\OrderFactorRepository;

trait MakeOrderFactorTrait
{
    /**
     * Create fake instance of OrderFactor and save it in database
     *
     * @param array $orderFactorFields
     * @return OrderFactor
     */
    public function makeOrderFactor($orderFactorFields = [])
    {
        /** @var OrderFactorRepository $orderFactorRepo */
        $orderFactorRepo = App::make(OrderFactorRepository::class);
        $theme = $this->fakeOrderFactorData($orderFactorFields);
        return $orderFactorRepo->create($theme);
    }

    /**
     * Get fake instance of OrderFactor
     *
     * @param array $orderFactorFields
     * @return OrderFactor
     */
    public function fakeOrderFactor($orderFactorFields = [])
    {
        return new OrderFactor($this->fakeOrderFactorData($orderFactorFields));
    }

    /**
     * Get fake data of OrderFactor
     *
     * @param array $postFields
     * @return array
     */
    public function fakeOrderFactorData($orderFactorFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'status' => $fake->randomDigitNotNull,
            'count' => $fake->randomDigitNotNull,
            'sum' => $fake->randomDigitNotNull,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $orderFactorFields);
    }
}
