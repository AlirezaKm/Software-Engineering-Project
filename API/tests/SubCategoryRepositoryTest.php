<?php

use App\Models\SubCategory;
use App\Repositories\SubCategoryRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SubCategoryRepositoryTest extends TestCase
{
    use MakeSubCategoryTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var SubCategoryRepository
     */
    protected $subCategoryRepo;

    public function setUp()
    {
        parent::setUp();
        $this->subCategoryRepo = App::make(SubCategoryRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateSubCategory()
    {
        $subCategory = $this->fakeSubCategoryData();
        $createdSubCategory = $this->subCategoryRepo->create($subCategory);
        $createdSubCategory = $createdSubCategory->toArray();
        $this->assertArrayHasKey('id', $createdSubCategory);
        $this->assertNotNull($createdSubCategory['id'], 'Created SubCategory must have id specified');
        $this->assertNotNull(SubCategory::find($createdSubCategory['id']), 'SubCategory with given id must be in DB');
        $this->assertModelData($subCategory, $createdSubCategory);
    }

    /**
     * @test read
     */
    public function testReadSubCategory()
    {
        $subCategory = $this->makeSubCategory();
        $dbSubCategory = $this->subCategoryRepo->find($subCategory->id);
        $dbSubCategory = $dbSubCategory->toArray();
        $this->assertModelData($subCategory->toArray(), $dbSubCategory);
    }

    /**
     * @test update
     */
    public function testUpdateSubCategory()
    {
        $subCategory = $this->makeSubCategory();
        $fakeSubCategory = $this->fakeSubCategoryData();
        $updatedSubCategory = $this->subCategoryRepo->update($fakeSubCategory, $subCategory->id);
        $this->assertModelData($fakeSubCategory, $updatedSubCategory->toArray());
        $dbSubCategory = $this->subCategoryRepo->find($subCategory->id);
        $this->assertModelData($fakeSubCategory, $dbSubCategory->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteSubCategory()
    {
        $subCategory = $this->makeSubCategory();
        $resp = $this->subCategoryRepo->delete($subCategory->id);
        $this->assertTrue($resp);
        $this->assertNull(SubCategory::find($subCategory->id), 'SubCategory should not exist in DB');
    }
}
