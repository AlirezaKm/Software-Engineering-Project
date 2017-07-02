<?php

use Faker\Factory as Faker;
use App\Models\SubCategory;
use App\Repositories\SubCategoryRepository;
use Illuminate\Support\Facades\App;

trait MakeSubCategoryTrait
{
    /**
     * Create fake instance of SubCategory and save it in database
     *
     * @param array $subCategoryFields
     * @return SubCategory
     */
    public function makeSubCategory($subCategoryFields = [])
    {
        /** @var SubCategoryRepository $subCategoryRepo */
        $subCategoryRepo = App::make(SubCategoryRepository::class);
        $theme = $this->fakeSubCategoryData($subCategoryFields);
        return $subCategoryRepo->create($theme);
    }

    /**
     * Get fake instance of SubCategory
     *
     * @param array $subCategoryFields
     * @return SubCategory
     */
    public function fakeSubCategory($subCategoryFields = [])
    {
        return new SubCategory($this->fakeSubCategoryData($subCategoryFields));
    }

    /**
     * Get fake data of SubCategory
     *
     * @param array $postFields
     * @return array
     */
    public function fakeSubCategoryData($subCategoryFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'name' => $fake->word,
            'category' => $fake->randomDigitNotNull,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $subCategoryFields);
    }
}
