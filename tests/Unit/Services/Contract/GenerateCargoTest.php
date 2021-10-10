<?php

namespace Tests\Unit\Services\Contract;

use App\Services\ContractService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class GenerateCargoTest extends TestCase
{
    use RefreshDatabase;

    protected ContractService $contractService;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        DB::table('cargo_types')->insert([
            ['type' => 1, 'text' => 'Solar Panels'],
            ['type' => 1, 'text' => 'Building materials'],
            ['type' => 2, 'text' => 'Medics'],
            ['type' => 2, 'text' => 'Locals'],
        ]);
        $this->contractService = new ContractService();
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_cargo_generation_returns_array()
    {
        $cargo = $this->contractService->generateCargo();
        $this->assertIsArray($cargo);
    }

    public function test_cargo_generation_returns_keys_in_array()
    {
        $cargo = $this->contractService->generateCargo();
        $this->assertArrayHasKey('name', $cargo);
        $this->assertArrayHasKey('type', $cargo);
        $this->assertArrayHasKey('qty', $cargo);
    }
}