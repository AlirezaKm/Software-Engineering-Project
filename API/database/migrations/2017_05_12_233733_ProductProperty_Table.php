<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductPropertyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProductProperty', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('product');
            $table->unsignedInteger('property');
            $table->string('value');
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('product')->references('code')->on('Product');
            $table->foreign('property')->references('id')->on('Property');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ProductProperty');
    }
}
