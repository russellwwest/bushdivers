<?php

namespace Tests\Unit\Services\Contract;

use App\Models\Contract;
use App\Models\ContractCargo;
use App\Services\Contracts\CloseContract;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CloseContractTest extends TestCase
{
    use RefreshDatabase;

    protected CloseContract $closeContract;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->closeContract = app()->make(CloseContract::class);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_expired_contract_is_closed()
    {
        $contract = Contract::factory()->create([
            'is_available' => false,
            'expires_at' => Carbon::now()->subDays(10)
        ]);

        $this->closeContract->execute($contract->id);

        $this->assertDatabaseMissing('contracts', [
            'id' => $contract->id
        ]);
    }
}
