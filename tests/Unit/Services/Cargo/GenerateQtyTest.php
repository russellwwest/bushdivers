<?php

namespace Tests\Unit\Services\Cargo;

use App\Services\CargoService;
use PHPUnit\Framework\TestCase;

class GenerateQtyTest extends TestCase
{
    protected CargoService $cargoService;

    public function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->cargoService = new CargoService();
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_generate_qty_returns_int()
    {
        $qty = $this->cargoService->generateRandomCargoQty(10);
        $this->assertIsInt($qty);
    }

    public function test_generate_qty_returns_int_lower_than_max()
    {
        $qty = $this->cargoService->generateRandomCargoQty(10);
        $this->assertLessThanOrEqual(10, $qty);
    }
}
