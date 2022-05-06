<?php

namespace Database\Seeders;

use App\Models\Enums\AwardType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AwardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('awards')->insert([
            ['id' => 1, 'name' => '1 Year Service', 'type' => AwardType::MONTHS, 'value' => 12, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833876/BDVA/Awards/Year1_wlfbtw.png'],
            ['id' => 2, 'name' => '6 Months Service', 'type' => AwardType::MONTHS, 'value' => 6, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833876/BDVA/Awards/Months6_qjsz2y.png'],
            ['id' => 3, 'name' => '2 Years Service', 'type' => AwardType::MONTHS, 'value' => 24, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833876/BDVA/Awards/Years2_sh0xmh.png'],
            ['id' => 4, 'name' => '50 Flights', 'type' => AwardType::FLIGHTS, 'value' => 50, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833875/BDVA/Awards/Flights50_xfx4at.png'],
            ['id' => 5, 'name' => '50 Hours', 'type' => AwardType::HOURS, 'value' => 50, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833875/BDVA/Awards/Hours50_qpgbii.png'],
            ['id' => 6, 'name' => '100 Flights', 'type' => AwardType::FLIGHTS, 'value' => 100, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833875/BDVA/Awards/Flights100_sz5avf.png'],
            ['id' => 7, 'name' => '100 Hours', 'type' => AwardType::HOURS, 'value' => 100, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833875/BDVA/Awards/Hours100_nzgwp1.png'],
            ['id' => 8, 'name' => '200 Flights', 'type' => AwardType::FLIGHTS, 'value' => 200, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833875/BDVA/Awards/Flights200_ujrdpb.png'],
            ['id' => 9, 'name' => '200 Hours', 'type' => AwardType::HOURS, 'value' => 200, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833876/BDVA/Awards/Hours200_bua9ya.png'],
            ['id' => 10, 'name' => '500 Flights', 'type' => AwardType::FLIGHTS, 'value' => 500, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833875/BDVA/Awards/Flights500_smyz6r.png'],
            ['id' => 11, 'name' => '500 Hours', 'type' => AwardType::HOURS, 'value' => 500, 'image' => 'https://res.cloudinary.com/dji0yvkef/image/upload/v1651833876/BDVA/Awards/Hours500_rtcrkw.png'],
            ['id' => 12, 'name' => 'Patreon', 'type' => AwardType::BOOLEAN, 'value' => 1, 'image' => 'https://res.cloudinary.com/dpwytlrc2/image/upload/v1630673958/VA/awards/patreon.png']
        ]);
    }
}
