<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/redirect', function () {
    $http = new GuzzleHttp\Client;

    $response = $http->post('http://shop.com/oauth/token', [
        'form_params' => [
            'grant_type' => 'password',
            'client_id' => '2',
            'client_secret' => '1Jloa5IASxAQttIo4sd0zOKR7Ra2sKb29YBkJDRU',
            'username' => 'alitm28@gmail.com',
            'password' => '123456',
            'scope' => '',
        ],
    ]);

    return json_decode((string) $response->getBody(), true);
});
Route::auth();
Route::get('/', function () {
    return "HO";//view('welcome');
});


Route::resource('userTypes', 'UserTypeController');

Route::resource('users', 'UserController');

Route::resource('products', 'ProductController');

Route::resource('categories', 'CategoryController');

Route::resource('subCategories', 'SubCategoryController');

Route::resource('properties', 'PropertyController');

Route::resource('productProperties', 'ProductPropertyController');

Route::resource('expenses', 'ExpenseController');

Route::resource('factors', 'FactorsController');

Route::resource('orders', 'OrderController');

Route::resource('orderStatuses', 'OrderStatusController');

Route::resource('sellers', 'SellersController');

Route::resource('orderFactors', 'OrderFactorController');