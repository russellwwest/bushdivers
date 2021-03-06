<?php

namespace Tests\Unit\Services\Financial;

use App\Models\Aircraft;
use App\Models\AirlineFees;
use App\Models\Airport;
use App\Models\Enums\AirlineTransactionTypes;
use App\Models\Fleet;
use App\Services\Finance\CalcHubFees;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HubFeeTest extends TestCase
{
    use RefreshDatabase;

    protected CalcHubFees $calcHubFees;
    protected Model $airport;
    protected Model $airlineFees;
    protected Model $fleet;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->calcHubFees = $this->app->make(CalcHubFees::class);
        $this->airport = Airport::factory()->create();
        $this->airlineFees = AirlineFees::factory()->create([
            'fee_type' => AirlineTransactionTypes::HubRentalFees,
            'fee_name' => 'Hub Rental',
            'fee_amount' => 2000.00
        ]);

        $this->fleet = Fleet::factory()->create();
        Aircraft::factory()->create([
            'fleet_id' => $this->fleet->id
        ]);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_fee_is_calculated_for_hub_rental()
    {
        $this->calcHubFees->execute();
        $this->assertDatabaseHas('account_ledgers', [
            'transaction_type' => AirlineTransactionTypes::HubRentalFees,
            'total' => -2000.00,
            'memo' => 'Monthly Hub Rental - '. $this->airport->identifier
        ]);
    }
}
