<?php

namespace Tests\Unit\Rentals;

use App\Models\Aircraft;
use App\Models\Enums\TransactionTypes;
use App\Models\Fleet;
use App\Models\Pirep;
use App\Models\Rental;
use App\Models\User;
use App\Services\Rentals\ChargeRentalFee;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChargeRentalFeeTest extends TestCase
{
    use RefreshDatabase;

    protected Model $fleet;
    protected Model $aircraft;
    protected Model $user;
    protected ChargeRentalFee $chargeRentalFee;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        $this->user = User::factory()->create();
        $this->fleet = Fleet::factory()->create([
            'rental_cost' => 100.00
        ]);
        $this->aircraft = Rental::factory()->create([
            'fleet_id' => $this->fleet->id,
            'user_id' => $this->user->id
        ]);

        $this->chargeRentalFee = $this->app->make(ChargeRentalFee::class);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_fee_charged_for_2_hours()
    {
        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'submitted_at' => Carbon::now(),
            'flight_time' => 120,
            'is_rental' => true
        ]);

        $this->chargeRentalFee->execute($pirep->id);

        $this->assertDatabaseHas('user_accounts', [
            'type' => TransactionTypes::Rental,
            'user_id' => $this->user->id,
            'total' => -(120 / 60) * 100
        ]);
    }

    public function test_fee_charged_for_1_hour()
    {
        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'submitted_at' => Carbon::now(),
            'flight_time' => 60,
            'is_rental' => true
        ]);

        $this->chargeRentalFee->execute($pirep->id);

        $this->assertDatabaseHas('user_accounts', [
            'type' => TransactionTypes::Rental,
            'user_id' => $this->user->id,
            'total' => -(60 / 60) * 100
        ]);
    }

    public function test_fee_charged_for_30_mins()
    {
        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'submitted_at' => Carbon::now(),
            'flight_time' => 30,
            'is_rental' => true
        ]);

        $this->chargeRentalFee->execute($pirep->id);

        $this->assertDatabaseHas('user_accounts', [
            'type' => TransactionTypes::Rental,
            'user_id' => $this->user->id,
            'total' => -(30 / 60) * 100
        ]);
    }
}
