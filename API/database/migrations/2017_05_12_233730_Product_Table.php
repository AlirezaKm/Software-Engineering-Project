<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product', function (Blueprint $table) {
            $table->increments('code');
            $table->unsignedInteger('factor');
            $table->string('name');
            $table->unsignedInteger('category');
            $table->unsignedInteger('subcategory');
            $table->unsignedInteger('count')->default(0);
            $table->double('buyPrice')->default(0);
            $table->double('sellPrice')->default(0);
            $table->timestamps();
            $table->softDeletes();

            # Foreign Keys
            $table->primary('code');
            $table->foreign('factor')->references('id')->on('Factors');
            $table->foreign('category')->references('id')->on('Category');
            $table->foreign('subcategory')->references('id')->on('SubCategory');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Product');
    }
}
