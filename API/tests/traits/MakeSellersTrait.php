<?php

use Faker\Factory as Faker;
use App\Models\Sellers;
use App\Repositories\SellersRepository;
use Illuminate\Support\Facades\App;

trait MakeSellersTrait
{
    /**
     * Create fake instance of Sellers and save it in database
     *
     * @param array $sellersFields
     * @return Sellers
     */
    public function makeSellers($sellersFields = [])
    {
        /** @var SellersRepository $sellersRepo */
        $sellersRepo = App::make(SellersRepository::class);
        $theme = $this->fakeSellersData($sellersFields);
        return $sellersRepo->create($theme);
    }

    /**
     * Get fake instance of Sellers
     *
     * @param array $sellersFields
     * @return Sellers
     */
    public function fakeSellers($sellersFields = [])
    {
        return new Sellers($this->fakeSellersData($sellersFields));
    }

    /**
     * Get fake data of Sellers
     *
     * @param array $postFields
     * @return array
     */
    public function fakeSellersData($sellersFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'name' => $fake->word,
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $sellersFields);
    }
}
