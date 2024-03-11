<?php

namespace Tests\Unit\Services\Airport;

use App\Models\Airport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResupplyFuelTest extends TestCase
{
    use RefreshDatabase;
    protected \App\Services\Airports\ResupplyFuel $resupplyFuel;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->resupplyFuel = app()->make(\App\Services\Airports\ResupplyFuel::class);
    }

    /**
     * A basic unit test example.
     */
    public function test_large_airport_fuel_is_resupplied(): void
    {
        $airport = Airport::factory()->create([
            'identifier' => 'AYMG',
            'is_hub' => false,
            'size' => 4,
            'has_avgas' => true,
            'avgas_qty' => 4500
        ]);
        $this->resupplyFuel->execute(true);
        $airport->refresh();
        $this->assertTrue($airport->avgas_qty >= 5000);
    }

    public function test_small_airport_fuel_is_resupplied(): void
    {
        $airport = Airport::factory()->create([
            'identifier' => 'AYMG',
            'is_hub' => false,
            'size' => 2,
            'has_avgas' => true,
            'avgas_qty' => 100
        ]);
        $this->resupplyFuel->execute();
        $airport->refresh();
        $this->assertTrue($airport->avgas_qty >= 150);

    }

    public function test_hubs_are_not_resupplied()
    {
        $airport = Airport::factory()->create([
            'identifier' => 'AYMG',
            'is_hub' => true,
            'size' => 3,
            'has_avgas' => true,
            'avgas_qty' => null
        ]);
        $this->resupplyFuel->execute();
        $airport->refresh();
        $this->assertNull($airport->avgas_qty);
    }

    public function test_airports_without_fuel_are_not_resupplied()
    {
        $airport = Airport::factory()->create([
            'identifier' => 'AYMG',
            'is_hub' => false,
            'size' => 3,
            'has_avgas' => false,
            'avgas_qty' => 0
        ]);
        $this->resupplyFuel->execute();
        $airport->refresh();
        $this->assertEquals(0, $airport->avgas_qty);
    }
}