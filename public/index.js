function getDogBreeds() {
    $.get("https://dog.ceo/api/breeds/list/all", function(data, status) {
        if (status == "success") {
            var html = "";
            for (var key in data.message) {
                html += "<option value=\"" + key + "\">" + key + "</option>";
            }
            $("#sel-racadog").html(html);
            initialize();
        }
        else {
            alert("não tem cachorro");
        }
    })
}

function getDogPicture(dogBreed) {
    var dogBreedUrl = "https://dog.ceo/api/breed/" + dogBreed + "/images/random";
    if (!dogBreed) {
        dogBreedUrl = "https://dog.ceo/api/breeds/image/random"
    }
    $.get(dogBreedUrl, function(data, status) {
        if (status == "success") {
            var imgurl = data.message;
            $("#img-dogpic").attr("src", imgurl);
        }
        else {
            alert("não tem foto de cachorro");
        }
    })
}

function getDogName(event) {
    var dogName = "";
    dogName = event.target.value;
    $("#id-dogname").text(dogName);
}

function getDogColor(event) {
    var dogColor;
    
    if (event) {
        dogColor = event.target.value;
    }
    else {
        dogColor = $("#sel-cordog option:selected").val();
    }
    $("#id-dogname").css("color", dogColor);
}

function getDogFont(event) {
    var dogFont;

    if (event) {
        dogFont = event.target.value;
    }
    else {
        dogFont = $("#sel-fonte option:selected").val();
    }
    $("#id-dogname").css("font-family", dogFont);
}

function saveDog(event) {
    var saveDogData = {
        dogPicture: $("#img-dogpic").attr("src"),
        dogName: $("#ipt-nomedog").val(),
        dogBreed: $("#sel-racadog").val(),
        dogColor: $("#sel-cordog").val(),
        dogFont: $("#sel-fonte").val(),
    }
    localStorage.setItem("saveDogData",JSON.stringify(saveDogData));
    $("#alert").show("slow");
}

function initialize() {
    var initialData = localStorage.getItem("saveDogData");
    if (initialData) {
        initialData = JSON.parse(initialData);
        $("#img-dogpic").attr("src", initialData.dogPicture);
        $("#ipt-nomedog").val(initialData.dogName);
        $("#sel-racadog").val(initialData.dogBreed);
        $("#sel-cordog").val(initialData.dogColor);
        $("#sel-fonte").val(initialData.dogFont);
        $("#id-dogname").text(initialData.dogName);
        getDogColor(undefined);
        getDogFont(undefined);
    }
    else {
        getDogPicture(undefined);
    }
}

$(document).ready(function() {
    $("#alert").hide();
    getDogBreeds();
    
    $("#ipt-nomedog").change(getDogName);
    
    $("#sel-cordog").change(getDogColor);

    $("#sel-fonte").change(getDogFont);

    $("#sel-racadog").change(function(event) {
        getDogPicture(event.target.value);
    });

    $("#btn-gravar").click(saveDog);

    $("#btn-refresh").click(function() {
        getDogPicture($("#sel-racadog").val());
    });

    $("#alert-close").click(function() {
        $("#alert").hide("slow");
    })
});


