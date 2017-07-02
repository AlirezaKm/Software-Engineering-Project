<?php

use App\Models\UserType;
use App\Repositories\UserTypeRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class UserTypeRepositoryTest extends TestCase
{
    use MakeUserTypeTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var UserTypeRepository
     */
    protected $userTypeRepo;

    public function setUp()
    {
        parent::setUp();
        $this->userTypeRepo = App::make(UserTypeRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateUserType()
    {
        $userType = $this->fakeUserTypeData();
        $createdUserType = $this->userTypeRepo->create($userType);
        $createdUserType = $createdUserType->toArray();
        $this->assertArrayHasKey('id', $createdUserType);
        $this->assertNotNull($createdUserType['id'], 'Created UserType must have id specified');
        $this->assertNotNull(UserType::find($createdUserType['id']), 'UserType with given id must be in DB');
        $this->assertModelData($userType, $createdUserType);
    }

    /**
     * @test read
     */
    public function testReadUserType()
    {
        $userType = $this->makeUserType();
        $dbUserType = $this->userTypeRepo->find($userType->id);
        $dbUserType = $dbUserType->toArray();
        $this->assertModelData($userType->toArray(), $dbUserType);
    }

    /**
     * @test update
     */
    public function testUpdateUserType()
    {
        $userType = $this->makeUserType();
        $fakeUserType = $this->fakeUserTypeData();
        $updatedUserType = $this->userTypeRepo->update($fakeUserType, $userType->id);
        $this->assertModelData($fakeUserType, $updatedUserType->toArray());
        $dbUserType = $this->userTypeRepo->find($userType->id);
        $this->assertModelData($fakeUserType, $dbUserType->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteUserType()
    {
        $userType = $this->makeUserType();
        $resp = $this->userTypeRepo->delete($userType->id);
        $this->assertTrue($resp);
        $this->assertNull(UserType::find($userType->id), 'UserType should not exist in DB');
    }
}
