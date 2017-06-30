<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTypeApiTest extends TestCase
{
    use MakeUserTypeTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateUserType()
    {
        $userType = $this->fakeUserTypeData();
        $this->json('POST', '/api/v1/userTypes', $userType);

        $this->assertApiResponse($userType);
    }

    /**
     * @test
     */
    public function testReadUserType()
    {
        $userType = $this->makeUserType();
        $this->json('GET', '/api/v1/userTypes/'.$userType->id);

        $this->assertApiResponse($userType->toArray());
    }

    /**
     * @test
     */
    public function testUpdateUserType()
    {
        $userType = $this->makeUserType();
        $editedUserType = $this->fakeUserTypeData();

        $this->json('PUT', '/api/v1/userTypes/'.$userType->id, $editedUserType);

        $this->assertApiResponse($editedUserType);
    }

    /**
     * @test
     */
    public function testDeleteUserType()
    {
        $userType = $this->makeUserType();
        $this->json('DELETE', '/api/v1/userTypes/'.$userType->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/userTypes/'.$userType->id);

        $this->assertResponseStatus(404);
    }
}
