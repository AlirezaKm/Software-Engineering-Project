<?php

use Faker\Factory as Faker;
use App\Models\LOG;
use App\Repositories\LOGRepository;
use Illuminate\Support\Facades\App;

trait MakeLOGTrait
{
    /**
     * Create fake instance of LOG and save it in database
     *
     * @param array $lOGFields
     * @return LOG
     */
    public function makeLOG($lOGFields = [])
    {
        /** @var LOGRepository $lOGRepo */
        $lOGRepo = App::make(LOGRepository::class);
        $theme = $this->fakeLOGData($lOGFields);
        return $lOGRepo->create($theme);
    }

    /**
     * Get fake instance of LOG
     *
     * @param array $lOGFields
     * @return LOG
     */
    public function fakeLOG($lOGFields = [])
    {
        return new LOG($this->fakeLOGData($lOGFields));
    }

    /**
     * Get fake data of LOG
     *
     * @param array $postFields
     * @return array
     */
    public function fakeLOGData($lOGFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'title' => $fake->text,
            'description' => $fake->text,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $lOGFields);
    }
}
