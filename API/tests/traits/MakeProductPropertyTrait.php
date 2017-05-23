<?php

use Faker\Factory as Faker;
use App\Models\ProductProperty;
use App\Repositories\ProductPropertyRepository;

trait MakeProductPropertyTrait
{
    /**
     * Create fake instance of ProductProperty and save it in database
     *
     * @param array $productPropertyFields
     * @return ProductProperty
     */
    public function makeProductProperty($productPropertyFields = [])
    {
        /** @var ProductPropertyRepository $productPropertyRepo */
        $productPropertyRepo = App::make(ProductPropertyRepository::class);
        $theme = $this->fakeProductPropertyData($productPropertyFields);
        return $productPropertyRepo->create($theme);
    }

    /**
     * Get fake instance of ProductProperty
     *
     * @param array $productPropertyFields
     * @return ProductProperty
     */
    public function fakeProductProperty($productPropertyFields = [])
    {
        return new ProductProperty($this->fakeProductPropertyData($productPropertyFields));
    }

    /**
     * Get fake data of ProductProperty
     *
     * @param array $postFields
     * @return array
     */
    public function fakeProductPropertyData($productPropertyFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'product' => $fake->randomDigitNotNull,
            'property' => $fake->randomDigitNotNull,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $productPropertyFields);
    }
}
