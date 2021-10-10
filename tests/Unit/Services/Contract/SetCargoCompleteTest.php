<?php

namespace Tests\Unit\Services\Contract;

use App\Models\Contract;
use App\Models\ContractCargo;
use App\Services\ContractService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class SetCargoCompleteTest extends TestCase
{
    use RefreshDatabase;

    protected ContractService $contractService;
    protected Model $contract;
    protected Model $contractCargo;

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

        $this->contract = Contract::factory()->create();
        $this->contractCargo = ContractCargo::factory()->create([
            'contract_id' => $this->contract->id,
            'current_airport_id' => $this->contract->dep_airport_id
        ]);
    }
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_cargo_is_completed()
    {
        $this->contractService->updateCargo($this->contractCargo->id, $this->contract->arr_airport_id);
        $this->assertDatabaseHas('contract_cargos', [
            'id' => $this->contractCargo->id,
            'is_completed' => true
        ]);
    }

    public function test_cargo_is_not_completed_when_at_different_airport()
    {
        $this->contractService->updateCargo($this->contractCargo->id, 'KLAX');
        $this->assertDatabaseHas('contract_cargos', [
            'id' => $this->contractCargo->id,
            'is_completed' => false
        ]);
    }

    public function test_cargo_location_is_updated()
    {
        $this->contractService->updateCargo($this->contractCargo->id, 'AYMR');
        $this->assertDatabaseHas('contract_cargos', [
            'id' => $this->contractCargo->id,
            'current_airport_id' => 'AYMR'
        ]);
    }
}