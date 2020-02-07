//Global Vars
var filterBit = "111000";

//Setup the Sytem
$(function () {
    //Register Change Events
    $("#add_qual_button").click(function () {
        addQualityButtonClicked();
    });
    $("#consumable_level").change(function (e) {
        processResults();
    });
    $('#alreadyExistCB').change(function () {
        if ($('#alreadyExistCB').is(":checked")) {
            $("#notcalc_label").show()
        }
        else {
            $("#notcalc_label").hide()
        }
        processResults();
    });

    var $radios = $('input[name="groupRadio"]');
    $radios.change(function () {
        changeFilterRadio();
    });
    $('input[type=checkbox]').not('#alreadyExistCB').change(function () {
        recalcFilterBit();
    });

    $("#btnReset").click(function () {
        $("#radByType").click();
        $('#cb_perm').prop('checked', true);
        $('#cb_consum').prop('checked', true);
        $('#cb_ammo').prop('checked', true);
        recalcFilterBit();
    });

    $("#object_to_build").change(function () {
        //We need to fill the quality field
        var obj_name = $("#object_to_build").val();
        var $qual = $("#quality_to_add");

        //Clear quality textbox
        $qual.empty();

        dataset_qualities.forEach(elem => {
            if (elem.attach == obj_name) {
                var $e = createOption(elem)
                $qual.append($e)
            }
        });

        $("#build_name").empty();
        var $e = $("<div id='the_object' />")
        var $ob = $("#object_to_build").find(":checked");
        $e.text($ob.text());
        for (var d in $ob[0].dataset) {
            $e.attr("data-" + d, $ob[0].dataset[d])
        }

        $("#build_name").append($e);

        //See if consumable
        var $a = $("#object_to_build").find(":selected")
        if ($a[0].dataset.type == "C") {
            $("#consumable_level").show();
        }
        else {
            $("#consumable_level").hide();
        }

        //And Tell results to reprocess
        processResults();
    })

    //Setup Screen
    $("#consumable_level").hide()
    setupObjectToBuildDropdown();
    $("#object_to_build").change();
    $('#alreadyExistCB').change();
});

function setupObjectToBuildDropdown() {
    //SETUP OBJECT TO BUILD
    var $dropdown = $('#object_to_build');
    var firsttime = true;

    //Clear the current dropdown
    $dropdown.empty();

    //Okay we need to look at the filter bit.
    let b = parseInt(filterBit, 2);
    if (b == 0) {
        return; //Just bail as they have picked nothing
    }
    let m1 = 0b111000;

    var objectsToLoad = [];

    if ((b & m1) != 0) {
        //Okay it's the first 3 set
        //Kill the right 2 bits.
        b = b >> 3;
        if ((b & 0b100) != 0) {
            objectsToLoad = objectsToLoad.concat(dataset_perm_objects);
        }
        if ((b & 0b010) != 0) {
            objectsToLoad = objectsToLoad.concat(dataset_consumable_objects);
        }
        if ((b & 0b001) != 0) {
            objectsToLoad = objectsToLoad.concat(dataset_ammo_objects);
        }
    }
    else {
        //Second 3
        //By the system we know the left 3 are 0 we can ignore       
        if ((b & 0b100) != 0) {
            var fun = function (e) {
                return (e.bc_skill == "Junkin" || e.bc_skill == "Varies");
            };
            objectsToLoad = objectsToLoad.concat(
                dataset_perm_objects.filter(fun));
            objectsToLoad = objectsToLoad.concat(
                dataset_consumable_objects.filter(fun));
            objectsToLoad = objectsToLoad.concat(
                dataset_ammo_objects.filter(fun));
        }
        if ((b & 0b010) != 0) {
            var fun = function (e) {
                return (e.bc_skill == "Medicine" || e.bc_skill == "Varies");
            };
            objectsToLoad = objectsToLoad.concat(
                dataset_perm_objects.filter(fun));
            objectsToLoad = objectsToLoad.concat(
                dataset_consumable_objects.filter(fun));
            objectsToLoad = objectsToLoad.concat(
                dataset_ammo_objects.filter(fun));
        }
        if ((b & 0b001) != 0) {
            var fun = function (e) {
                return (e.bc_skill == "Nanoweavin" || e.bc_skill == "Varies");
            };
            objectsToLoad = objectsToLoad.concat(
                dataset_perm_objects.filter(fun));
            objectsToLoad = objectsToLoad.concat(
                dataset_consumable_objects.filter(fun));
            objectsToLoad = objectsToLoad.concat(
                dataset_ammo_objects.filter(fun));
        }
    }

    /*objectsToLoad.sort(function (a, b) {
        if (a.name < b.name) {
            return -1
        }
        else if (a == b) {
            return 0;
        }
        else {
            return 1;
        }
    });*/

    $.each(objectsToLoad, function () {
        var $e = createOption(this)
        $dropdown.append($e)
    });
}

function addQualityButtonClicked() {
    //Have to move quality over
    var $ql = $("#qual-list");
    var qual = $("#quality_to_add").find(":selected")[0];

    var $e = $("<li />")
    $e.text(qual.text);

    for (var d in qual.dataset) {
        $e.attr("data-" + d, qual.dataset[d])
    }

    $ql.append($e)
    processResults();
}

function createOption(objdat) {
    var $e = $("<option />")
    $e.text(objdat.name);
    for (let key in objdat) {
        $e.attr("data-" + key, objdat[key])
    }
    return $e;
}

function processResults() {

    //Elements we need
    var $to = $("#the_object");
    var $ql = $('#qual-list li');
    var $apt = $("#ap_total");
    var $mut = $("#mu_total");
    var $cb = $("#alreadyExistCB");
    var $cl = $("#consumable_level");

    var final_mu = 0;
    var final_ap = 0;

    //First look at the object itself
    if ($cb.is(":checked") == false) {
        //Calculate the object
        //Okay consumables can have a range
        if ($to[0].dataset.type == "P") {
            final_ap = final_ap + parseInt($to[0].dataset.bc);
            final_mu = final_mu + parseInt($to[0].dataset.mc);
        }
        else {
            //Consumable
            var costs = $to[0].dataset.bc.split(",")
            if (costs.length == 1) {
                //It's a straight cost dosen't matter on tier
                final_ap = final_ap + parseInt($to[0].dataset.bc);
            }
            else {
                if ($cl.val() == "Foolproof / Basic") {
                    final_ap = final_ap + parseInt(costs[0]);
                }
                else if ($cl.val() == "Intermediate") {
                    final_ap = final_ap + parseInt(costs[1]);
                }
                else {
                    final_ap = final_ap + parseInt(costs[2]);
                }
            }
            final_mu = final_mu + parseInt($to[0].dataset.mc);

        }
    }

    //Walk through the qualities
    var nq = 0;
    if ($ql.length != 0) {

        $ql.each(function (e) {
            if ($to[0].dataset.type == "C") {
                final_ap = final_ap + (nq * 2); //Qual increase
                nq++;
            }
            else {
                final_ap = final_ap + (nq * 4);
                nq++;
            }
            final_ap = final_ap + parseInt(this.dataset.bc);
            final_mu = final_mu + 2;




        });
    }

    //Set the results
    $mut.text(final_mu);
    $apt.text(final_ap);
}

function changeFilterRadio() {
    var $radios = $('input[name="groupRadio"]');
    var id = $radios.filter(':checked').get(0).id;

    switch (id) {
        case "radByType":
            swapFilterItemType("on");
            swapFilterSkill("off");
            break;
        case "radBySkill":
            swapFilterItemType("off");
            swapFilterSkill("on");
            break;
    }

    recalcFilterBit();
}

function swapFilterItemType(direc) {
    if (direc === "on") {
        $('#cb_perm').removeAttr('disabled');
        $('#cb_consum').removeAttr('disabled');
        $('#cb_ammo').removeAttr('disabled');
    }
    else {
        $('#cb_perm').attr('disabled', true);
        $('#cb_perm').prop('checked', false);
        $('#cb_consum').attr('disabled', true);
        $('#cb_consum').prop('checked', false);
        $('#cb_ammo').attr('disabled', true);
        $('#cb_ammo').prop('checked', false);
    }
}

function swapFilterSkill(direc) {
    if (direc === "on") {
        $('#cb_junkin').removeAttr('disabled');
        $('#cb_medicine').removeAttr('disabled');
        $('#cb_nanoweavin').removeAttr('disabled');
    }
    else {
        $('#cb_junkin').attr('disabled', true);
        $('#cb_junkin').prop('checked', false);
        $('#cb_medicine').attr('disabled', true);
        $('#cb_medicine').prop('checked', false);
        $('#cb_nanoweavin').attr('disabled', true);
        $('#cb_nanoweavin').prop('checked', false);
    }
}

function recalcFilterBit() {
    filterBit =
        ($('#cb_perm').is(":checked") ? '1' : '0') +
        ($('#cb_consum').is(":checked") ? '1' : '0') +
        ($('#cb_ammo').is(":checked") ? '1' : '0') +
        ($('#cb_junkin').is(":checked") ? '1' : '0') +
        ($('#cb_medicine').is(":checked") ? '1' : '0') +
        ($('#cb_nanoweavin').is(":checked") ? '1' : '0');

    //Bit has changed run rebuild
    setupObjectToBuildDropdown()
}