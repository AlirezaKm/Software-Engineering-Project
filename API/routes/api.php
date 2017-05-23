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


Route::resource('user_types', 'UserTypeAPIController');

Route::resource('users', 'UserAPIController');

Route::resource('products', 'ProductAPIController');

Route::resource('categories', 'CategoryAPIController');

Route::resource('sub_categories', 'SubCategoryAPIController');

Route::resource('properties', 'PropertyAPIController');

Route::resource('product_properties', 'ProductPropertyAPIController');

Route::resource('expenses', 'ExpenseAPIController');

Route::resource('factors', 'FactorsAPIController');

Route::resource('orders', 'OrderAPIController');

Route::resource('order_statuses', 'OrderStatusAPIController');

Route::resource('sellers', 'SellersAPIController');

Route::resource('order_factors', 'OrderFactorAPIController');