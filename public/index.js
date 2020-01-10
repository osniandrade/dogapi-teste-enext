function getDogBreeds() {
    /**
     * populates dropdown menu with dog breeds from dogAPI
     * and calls initialize function
     */
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
    /**
     * gets dog picture url from dogAPI and updates image on html
     * if dogBreed is not defined, gets a random image
     * @param dogBreed: string breed name or undefined
     */
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

function setDogName(event) {
    /**
     * updates dog name on image based on input value
     * @param event: object event change from input
     */
    var dogName = "";
    dogName = event.target.value;
    $("#id-dogname").text(dogName);
}

function setDogColor(event) {
    /** 
     * sets font color selected on dropdown menu
     * @param event: object event change from select or undefined 
     */
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
    /**
     * sets font value selected on dropdown menu
     * @param event: object event change from select or undefined 
     */
    var dogFont;

    if (event) {
        dogFont = event.target.value;
    }
    else {
        dogFont = $("#sel-fonte option:selected").val();
    }
    $("#id-dogname").css("font-family", dogFont);
}

function saveDog() {
    /**
     * saves input data to local storage
     */
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
    /** 
     * sets initial value based on local storage or sets default values
     */
    var initialData = localStorage.getItem("saveDogData");
    if (initialData) {
        initialData = JSON.parse(initialData);
        $("#img-dogpic").attr("src", initialData.dogPicture);
        $("#ipt-nomedog").val(initialData.dogName);
        $("#sel-racadog").val(initialData.dogBreed);
        $("#sel-cordog").val(initialData.dogColor);
        $("#sel-fonte").val(initialData.dogFont);
        $("#id-dogname").text(initialData.dogName);
        setDogColor(undefined);
        getDogFont(undefined);
    }
    else {
        getDogPicture(undefined);
        setDogColor(undefined);
        getDogFont(undefined);
    }
}

$(document).ready(function() {
    $("#alert").hide();  // hides alert component
    getDogBreeds();  // loads initial values
    
    /**
     * assign events to html objects
     */
    $("#ipt-nomedog").change(setDogName);
    $("#sel-cordog").change(setDogColor);
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


