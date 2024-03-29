<?php

namespace Tests\Unit\Services\Airport;

use App\Models\Airport;
use App\Services\Airports\FindAirportsWithinDistance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FindAirportsByDistanceTest extends TestCase
{
    use RefreshDatabase;
    protected FindAirportsWithinDistance $findAirportsWithinDistance;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->findAirportsWithinDistance = app()->make(FindAirportsWithinDistance::class);
    }

    /**
     * A basic unit test example.
     */
    public function test_finds_airport_in_range(): void
    {
        $baseAirport = Airport::factory()->create([
            'identifier' => 'AYMR',
            'lat' => -6.36188,
            'lon' => 143.23070
        ]);
        Airport::factory()->create([
            'identifier' => 'AYMH',
            'lat' => -5.82781,
            'lon' => 144.29953
        ]);

        $airports = $this->findAirportsWithinDistance->execute($baseAirport, 1, 200);
        $this->assertTrue($airports->count() > 0);
    }

    public function test_finds_no_airport_out_of_range(): void
    {
        $baseAirport = Airport::factory()->create([
            'identifier' => 'AYMR',
            'lat' => -6.36188,
            'lon' => 143.23070
        ]);
        Airport::factory()->create([
            'identifier' => 'AYMH',
            'lat' => -5.82781,
            'lon' => 144.29953
        ]);
        $airports = $this->findAirportsWithinDistance->execute($baseAirport, 201, 300);
        $this->assertTrue($airports->count() === 0);
    }

    public function test_finds_hub_in_range(): void
    {
        $baseAirport = Airport::factory()->create([
            'identifier' => 'AYMR',
            'lat' => -6.36188,
            'lon' => 143.23070,
            'is_hub' => false
        ]);
        Airport::factory()->create([
            'identifier' => 'AYMH',
            'lat' => -5.82781,
            'lon' => 144.29953,
            'is_hub' => false
        ]);

        Airport::factory()->create([
            'identifier' => 'AYMH',
            'lat' => -5.82781,
            'lon' => 144.29953,
            'is_hub' => true
        ]);
        $airports = $this->findAirportsWithinDistance->execute($baseAirport, 1, 200, true);
        $this->assertTrue($airports->count() > 0);
    }

}
