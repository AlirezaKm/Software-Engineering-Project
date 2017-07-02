<?php

use Faker\Factory as Faker;
use App\Models\OrderStatus;
use App\Repositories\OrderStatusRepository;
use Illuminate\Support\Facades\App;

trait MakeOrderStatusTrait
{
    /**
     * Create fake instance of OrderStatus and save it in database
     *
     * @param array $orderStatusFields
     * @return OrderStatus
     */
    public function makeOrderStatus($orderStatusFields = [])
    {
        /** @var OrderStatusRepository $orderStatusRepo */
        $orderStatusRepo = App::make(OrderStatusRepository::class);
        $theme = $this->fakeOrderStatusData($orderStatusFields);
        return $orderStatusRepo->create($theme);
    }

    /**
     * Get fake instance of OrderStatus
     *
     * @param array $orderStatusFields
     * @return OrderStatus
     */
    public function fakeOrderStatus($orderStatusFields = [])
    {
        return new OrderStatus($this->fakeOrderStatusData($orderStatusFields));
    }

    /**
     * Get fake data of OrderStatus
     *
     * @param array $postFields
     * @return array
     */
    public function fakeOrderStatusData($orderStatusFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'name' => $fake->word,
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $orderStatusFields);
    }
}
