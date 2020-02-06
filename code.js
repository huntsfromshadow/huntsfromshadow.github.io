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
    })

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

    $.each(dataset_objects, function () {
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
        console.log($to[0])
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