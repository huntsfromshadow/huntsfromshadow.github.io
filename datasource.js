function getAllObjects() {
    var total = dataset_perm_objects.concat(dataset_consumable_objects).concat(dataset_ammo_objects);
    return total.sort(function (a, b) {
        if (a.name < b.name) {
            return -1
        }
        else if (a == b) {
            return 0;
        }
        else {
            return 1;
        }

    });
}

var dataset_perm_objects = [
    { "name": "Gun", "bc": 2, "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "P" },
    { "name": "Close Weapon", "bc": 2, "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "P" },
    { "name": "Nanowoven Jewelry", "bc": 0, "bc_skill": "Nanoweavin", "mc": 2, "mc_type": "Nano", "type": "P" },
    { "name": "Superior Kit", "bc": 12, "bc_skill": "Junkin", "mc": 2, "mc_type": "Varies", "type": "P" },
    { "name": "Bow", "bc": 2, "bc_skill": "Junkin", "mc": 1, "mc_type": "Biomass or Scrap", "type": "P" },
    { "name": "Thrown Weapon Brace", "bc": 2, "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "P" },
    { "name": "Armor", "bc": 0, "bc_skill": "", "mc": 0, "mc_type": "", "type": "P" },
];

var dataset_consumable_objects = [
    { "name": "Absorber Pack", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Indulgence", "bc": [1, 2, 3], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Quick-Stitcher", "bc": [2, 3, 4], "bc_skill": "Nanoweavin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Blue Goo", "bc": [1, 2, 3], "bc_skill": "Nanoweavin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Hypersuture", "bc": [2, 3, 4], "bc_skill": "Nanoweavin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Biofoam", "bc": [1, 2, 3], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Trauma Pack", "bc": [1, 2, 3], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Antiemetic", "bc": [1, 2, 3], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Recovery Promoter", "bc": [1, 2, 3], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Septic Extract", "bc": [1, 2, 3], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Extreme Indulgence", "bc": [2, 4, 6], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Basic Lock", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "C" },
    { "name": "Trap", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "C" },
    { "name": "Fortitude Booster", "bc": [2, 4, 6], "bc_skill": "Medicine", "mc": 1, "mc_type": "Biomass", "type": "C" },
    { "name": "Napalm Grenade", "bc": 1, "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "C" },
    { "name": "Web Grenade", "bc": 1, "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "EMP Grenade", "bc": 1, "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Snapshot Blank", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Refraction Field", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Gas Mask Filter", "bc": 1, "bc_skill": "Junkin", "mc": 1, "mc_type": "Bio", "type": "C" },
];

var dataset_ammo_objects = [
    { "name": "Needleshot", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Buckshot", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Scrap", "type": "C" },
    { "name": "Blaze Shells", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
    { "name": "Tranq Shot", "bc": [1, 2, 3], "bc_skill": "Junkin", "mc": 1, "mc_type": "Nano", "type": "C" },
];

var dataset_qualities = [
    { "name": "Rifle", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Expanded Heat Sink", "bc": 1, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Hyperdense", "bc": 2, "bc_skill": "Nanoweavin", "attach": "Armor" },
    { "name": "User-Friendly", "bc": 4, "bc_skill": "Nanoweavin", "attach": "Nanowoven Jewelry" },
    { "name": "Soothing", "bc": 2, "bc_skill": "Nanoweavin", "attach": "Nanowoven Jewelry" },
    { "name": "Regalia", "bc": 2, "bc_skill": "Nanoweavin", "attach": "Armor" },
    { "name": "Fine", "bc": 1, "bc_skill": "Medicine", "attach": "Indulgence" },
    { "name": "Suppressed", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Shotgun", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Suppressed", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Sharp", "bc": 2, "bc_skill": "Junkin", "attach": "Close Weapon" },
    { "name": "Revolver", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Automatic", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Holdout", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Extra Heavy", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Magnum Barrel", "bc": 3, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Sighted In", "bc": 3, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Badass Custom Plating", "bc": 1, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Powered - Weapon", "bc": 2, "bc_skill": "Junkin", "attach": "Close Weapon" },
    { "name": "Powered - Armor", "bc": 4, "bc_skill": "Nanoweavin", "attach": "Armor" },
    { "name": "Weighted Head", "bc": 3, "bc_skill": "Junkin", "attach": "Close Weapon" },
    { "name": "Magnetic Returner", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Tangled Wire", "bc": 2, "bc_skill": "Junkin", "attach": "Thrown Weapon Brace" },
    { "name": "Paired", "bc": 2, "bc_skill": "Junkin", "attach": "Gun" },
    { "name": "Lethal", "bc": 2, "bc_skill": "Junkin", "attach": "Thrown Weapon Brace" },
    { "name": "Toxic", "bc": 0, "bc_skill": "NA", "attach": "Indulgence or Bracer" },
    { "name": "Nutritious", "bc": 0, "bc_skill": "NA", "attach": "Bracer" },


]