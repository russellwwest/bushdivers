<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->string('current_airport_id')->nullable();
            $table->integer('cargo_type_id')->nullable();
            $table->string('cargo')->nullable();
            $table->integer('cargo_qty')->nullable();
            $table->uuid('active_pirep')->nullable();
            $table->uuid('completed_pirep')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('current_airport_id', 'cargo_type_id', 'cargo', 'cargo_qty', 'active_pirep', 'completed_pirep');
        });
    }
};
