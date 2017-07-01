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

# Authentication
Route::post('login','AuthController@login');

Route::middleware(['auth:api'])->group(function (){

# This Function Available From In Site (Just Loggedin User), This Mean Just Admin Can Registered a user (Admin , Stockman , Accountant , Seller)
    Route::any('logout','AuthController@logout');

    Route::post('register','AuthController@register');
 /*
 * scope : stockman , admin , accountant , seller
 * Route::middleware(['auth:api','scope:'])->group(function(){
 *
 * });
 */
//Route::resource('user_types', 'API\UserTypeAPIController');

    Route::resource('users', 'API\UserAPIController');

    Route::resource('products', 'API\ProductAPIController');

    Route::resource('categories', 'API\CategoryAPIController');

    Route::resource('subcategories', 'API\SubCategoryAPIController');

    Route::resource('properties', 'API\PropertyAPIController');

    Route::resource('productproperties', 'API\ProductPropertyAPIController');

    Route::resource('expenses', 'API\ExpenseAPIController');

    Route::resource('factors', 'API\FactorsAPIController');

    Route::resource('orders', 'API\OrderAPIController');

    Route::resource('order_statuses', 'API\OrderStatusAPIController');

    Route::resource('sellers', 'API\SellersAPIController');

    Route::resource('orderfactors', 'API\OrderFactorAPIController');

    Route::resource('logs', 'API\LOGAPIController',['except' => [
        'store', 'update','create','destroy','edit'
    ]]);
});