<?php

namespace Tests\Unit\Services\Cargo;

use App\Services\CargoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class GenerateCargoTest extends TestCase
{
    use RefreshDatabase;

    protected CargoService $cargoService;

    public function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        DB::table('cargo_types')->insert([
            ['type' => 1, 'text' => 'Solar panels'],
            ['type' => 1, 'text' => 'Building materials'],
        ]);

        $this->cargoService = new CargoService();
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_cargo_generation_returns_array()
    {
        $cargo = $this->cargoService->generateCargo(10);
        $this->assertIsArray($cargo);
        $this->assertArrayHasKey('cargo_type', $cargo);
    }
}
