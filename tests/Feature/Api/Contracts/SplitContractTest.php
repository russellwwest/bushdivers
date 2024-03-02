<?php

namespace Tests\Feature\Api\Contracts;

use App\Models\Contract;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SplitContractTest extends TestCase
{
    use RefreshDatabase;
    protected Model $contract;
    protected Model $paxContract;
    protected Model $user;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->contract = Contract::factory()->create([
            'cargo_qty' => 1000,
            'cargo_type' => 1,
            'payload' => 1000,
            'contract_value' => 1000
        ]);
        $this->paxContract = Contract::factory()->create([
            'cargo_qty' => 5,
            'cargo_type' => 2,
            'pax' => 5,
            'contract_value' => 1000
        ]);
        $this->user = User::factory()->create();
    }
    /**
     * A basic feature test example.
     */
    public function test_split_cargo_qty_successful(): void
    {
        $data = [
            'id' => $this->contract->id,
            'qty' => 750,
            'userId' => $this->user->id
        ];
        $response = $this->postJson('/api/contracts/split', $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('contracts', [
            'cargo_qty' => 750,
            'payload' => 750
        ]);
        $this->assertDatabaseHas('contracts', [
            'cargo_qty' => 250,
            'payload' => 250
        ]);
    }

    public function test_split_pax_qty_successful(): void
    {
        $data = [
            'id' => $this->paxContract->id,
            'qty' => 3,
            'userId' => $this->user->id
        ];
        $response = $this->postJson('/api/contracts/split', $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('contracts', [
            'cargo_qty' => 3,
            'pax' => 3
        ]);
        $this->assertDatabaseHas('contracts', [
            'cargo_qty' => 2,
            'pax' => 2
        ]);
    }

    public function test_split_cargo_contract_value_successful(): void
    {
        $data = [
            'id' => $this->contract->id,
            'qty' => 750,
            'userId' => $this->user->id
        ];
        $response = $this->postJson('/api/contracts/split', $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('contracts', [
            'contract_value' => 750
        ]);
        $this->assertDatabaseHas('contracts', [
            'contract_value' => 250
        ]);
    }

    public function test_split_pax_contract_value_successful(): void
    {
        $data = [
            'id' => $this->paxContract->id,
            'qty' => 3,
            'userId' => $this->user->id
        ];
        $response = $this->postJson('/api/contracts/split', $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('contracts', [
            'contract_value' => 600
        ]);
        $this->assertDatabaseHas('contracts', [
            'contract_value' => 400
        ]);
    }
}
