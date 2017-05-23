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

Route::get('/', function () {
    return view('welcome');
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