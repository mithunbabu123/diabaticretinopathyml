$(document).ready(function () {

    var form_data;

    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    function UIUpdate(){
        $('.image-section').show();
        $('#btn-predict').show();
        $('#dropzone-form').hide();
        $('#result').hide();
        $('#upload-file').hide();
    }

    $("#imageUpload").change(function () {
        readURL(this);
        UIUpdate();
        form_data =  new FormData($('#upload-file')[0]);
    });

    $('#dropzone').change(function (){
       readURL(this);
       UIUpdate();
        form_data = new FormData($('#dropzone-form')[0]);
    })

    // Predict
    $('#btn-predict').click(function () {
        console.log(form_data);
        // Show loading animation
        $(this).hide();
        $('#upload-file').show();
        $('.loader').show();
        fetchPrediction(form_data);

    });

    $("html").on("dragover", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

    $("html").on("dragleave", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

    $("#dropzone").on("drop", function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log(this);
        var form_data = new FormData($('#dropzone-form')[0]);
        $('.loader').show();
        fetchPrediction(form_data);
        console.log(form_data);
    });


    function fetchPrediction(form_data) {
        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (score) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#classPredicted').text(' Class Predicted:  ' + score);
                if (Number(score) > 0.5) {
                    $('#message').text('Consult doctor immediately!');
                } else {
                    $('#message').text('You have no symptoms of diabetic retinopathy! Congrats!')
                }
                console.log('Success!');
            },
        });
    }

});