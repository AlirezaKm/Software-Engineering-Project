<?php

use Faker\Factory as Faker;
use App\Models\UserType;
use App\Repositories\UserTypeRepository;
use Illuminate\Support\Facades\App;

trait MakeUserTypeTrait
{
    /**
     * Create fake instance of UserType and save it in database
     *
     * @param array $userTypeFields
     * @return UserType
     */
    public function makeUserType($userTypeFields = [])
    {
        /** @var UserTypeRepository $userTypeRepo */
        $userTypeRepo = App::make(UserTypeRepository::class);
        $theme = $this->fakeUserTypeData($userTypeFields);
        return $userTypeRepo->create($theme);
    }

    /**
     * Get fake instance of UserType
     *
     * @param array $userTypeFields
     * @return UserType
     */
    public function fakeUserType($userTypeFields = [])
    {
        return new UserType($this->fakeUserTypeData($userTypeFields));
    }

    /**
     * Get fake data of UserType
     *
     * @param array $postFields
     * @return array
     */
    public function fakeUserTypeData($userTypeFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'name' => $fake->word,
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $userTypeFields);
    }
}
