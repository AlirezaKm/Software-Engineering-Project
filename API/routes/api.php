<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('user_types', 'API\UserTypeAPIController');

Route::resource('users', 'API\UserAPIController');

Route::resource('products', 'API\ProductAPIController');

Route::resource('categories', 'API\CategoryAPIController');

Route::resource('sub_categories', 'API\SubCategoryAPIController');

Route::resource('properties', 'API\PropertyAPIController');

Route::resource('product_properties', 'API\ProductPropertyAPIController');

Route::resource('expenses', 'API\ExpenseAPIController');

Route::resource('factors', 'API\FactorsAPIController');

Route::resource('orders', 'API\OrderAPIController');

Route::resource('order_statuses', 'API\OrderStatusAPIController');

Route::resource('sellers', 'API\SellersAPIController');

Route::resource('order_factors', 'API\OrderFactorAPIController');