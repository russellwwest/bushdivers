<?php

namespace Tests\Unit\Services\Aircraft;

use App\Models\Aircraft;
use App\Models\AircraftEngine;
use App\Models\Fleet;
use App\Services\Aircraft\CalculateEngineWear;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalculateEngineWearTest extends TestCase
{
    use RefreshDatabase;

    protected Model $aircraft;
    protected Model $aircraftEngine;
    protected Model $fleet;
    protected CalculateEngineWear $calculateEngineWear;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->fleet = Fleet::factory()->create();

        $this->calculateEngineWear = $this->app->make(CalculateEngineWear::class);
    }
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_new_engine_wear()
    {
        $aircraft = Aircraft::factory()->create([
            'fleet_id' => $this->fleet->id,
            'wear' => 100,
            'flight_time_mins' => 0
        ]);
        $aircraftEngine = AircraftEngine::factory()->create([
            'aircraft_id' => $aircraft->id,
            'wear' => 100
        ]);

        $wear = $this->calculateEngineWear->execute($aircraftEngine);
        $this->assertEquals(0.5, $wear);
    }

    public function test_low_engine_wear()
    {
        $aircraft = Aircraft::factory()->create([
            'fleet_id' => $this->fleet->id,
            'wear' => 100,
            'flight_time_mins' => 0
        ]);
        $aircraftEngine = AircraftEngine::factory()->create([
            'aircraft_id' => $aircraft->id,
            'wear' => 70
        ]);

        $wear = $this->calculateEngineWear->execute($aircraftEngine);
        $this->assertEquals(0.8, $wear);
    }

    public function test_mid_engine_wear()
    {
        $aircraft = Aircraft::factory()->create([
            'fleet_id' => $this->fleet->id,
            'wear' => 100,
            'flight_time_mins' => 0
        ]);
        $aircraftEngine = AircraftEngine::factory()->create([
            'aircraft_id' => $aircraft->id,
            'wear' => 40
        ]);

        $wear = $this->calculateEngineWear->execute($aircraftEngine);
        $this->assertEquals(1.4, $wear);
    }

    public function test_poor_engine_wear()
    {
        $aircraft = Aircraft::factory()->create([
            'fleet_id' => $this->fleet->id,
            'wear' => 100,
            'flight_time_mins' => 0
        ]);
        $aircraftEngine = AircraftEngine::factory()->create([
            'aircraft_id' => $aircraft->id,
            'wear' => 10
        ]);

        $wear = $this->calculateEngineWear->execute($aircraftEngine);
        $this->assertEquals(2, $wear);
    }
}
