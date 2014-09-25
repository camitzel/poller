$(document).ready(function () {

    var lastEdited = $.cookie("lastEdited");
    var lastPollTaken = $.cookie("lastPoll");
    $('#edit_id').val(lastEdited);
    $('#view_pollID').val(lastPollTaken);

    $("#btn_Submit_Poll").click(function () {

        $('#q').css({ "border": '' });
        $('#a1').css({ "border": '' });
        $('#a2').css({ "border": '' });
        $('#a3').css({ "border": '' });
        $('#a4').css({ "border": '' });

        var poll = new Array();
        poll.push($("#q").val());
        poll.push($("#a1").val());
        poll.push($("#a2").val());
        poll.push($("#a3").val());
        poll.push($("#a4").val());
      
        if (verifyPollInput()) {
            $.ajax({
                type: "POST",
                url: "Default.aspx/SubmitPoll",
                data: JSON.stringify({ data: poll }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d === "-1")
                        raiseSubmitPollError();
                    else {
                        $("#poll_id").text("  " + msg.d);
                        $('#success_model').modal();
                        $("#q").val("");
                        $("#a1").val("");
                        $("#a2").val("");
                        $("#a3").val("");
                        $("#a4").val("");
                    }
                }
            });
        }
    });

    $("#btn_View_Poll").click(function () {
        var pollID = $("#view_pollID").val();
        $('#view_pollID').css({ "border": '' });
        if(verifyTakePollID()){
            $.ajax({
                type: "POST",
                url: "Default.aspx/GetPollData",
                data: JSON.stringify({ data: pollID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d[0] === "-1")
                        raiseNoPollFoundError();
                    else
                        buildPoll(msg);
                }
            });
        }
    });

    $("#btn_submit_answer").click(function () {
        var selectedVal = "";
        var selected = $("input[type='radio'][name='answers']:checked");
        var pid = $('#hdn_id').val();
        
        if (selected.length > 0) {
            selectedVal = selected.val();
        }
        
        $.ajax({
            type: "POST",
            url: "Default.aspx/SubmitAnswer",
            data: JSON.stringify({ pollID: pid, qid: selectedVal}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d === -1)
                    raiseSubmittingAnswerError();
                else {
                    $('#poll_model').modal('hide');
                    $('#poll_answers').empty();
                    $('#q_success_model').modal();
                    $("#view_pollID").val("");
                }
            }
        });
        $.cookie("lastPoll", pid, { expires: 100 });
    });

    $('#btn_View_Results').click(function () {
        var pollID = $('#txt_view').val();
        $('#txt_view').css({ "border": '' });
        if(verifyViewID()){
            $.ajax({
                type: "POST",
                url: "Default.aspx/getResponses",
                data: JSON.stringify({ pid: pollID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (values) {
                    if (values.d[0] === -1)
                        raiseNoPollFoundError();
                    else {
                        $.ajax({
                            type: "POST",
                            url: "Default.aspx/GetPollData",
                            data: JSON.stringify({ data: pollID }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (questions) {
                                if (questions.d[0] === "-1")
                                    raiseNoPollFoundError();
                                else {
                                    buildCharts(values, questions);
                                }
                            }
                        });
                    }
                }
            });
    }
    });

    $('#btn_close_charts').click(function () {
        $('#txt_view').val("");
        $('#charts_view').empty();
        $('#results_model').modal('hide');
    });

    $('#btn_submit_edit').click(function () {

        $('#edit_id').css({ "border": '' });
        $('#edit_q').css({ "border": '' });
        $('#edit_a1').css({ "border": '' });
        $('#edit_a2').css({ "border": '' });
        $('#edit_a3').css({ "border": '' });
        $('#edit_a4').css({ "border": '' });

        var pollID = $('#edit_id').val();
        var pollInfo = new Array();

        if(verifyEditInput()){
            pollInfo.push($('#edit_q').val());
            pollInfo.push($('#edit_a1').val());
            pollInfo.push($('#edit_a2').val());
            pollInfo.push($('#edit_a3').val());
            pollInfo.push($('#edit_a4').val());

            $.ajax({
                type: "POST",
                url: "Default.aspx/editPoll",
                data: JSON.stringify({ id: pollID, info: pollInfo }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d === -1)
                        raiseEditError();
                    else {
                        $('#edit_success_model').modal();
                        $('#poll_answers').empty();
                        $('#edit_q').val("");
                        $('#edit_a1').val("");
                        $('#edit_a2').val("");
                        $('#edit_a3').val("");
                        $('#edit_a4').val("");
                        $.cookie("lastEdited", pollID, { expires: 100 });
                    }
               
                }
            });
        }
    });

    function buildPoll(data) {
        count = data.d.length;

        $("#poll_question").text(data.d[1]);
        $('#poll_answers').empty();

        for (i = 2; i < count; i++) {
            var rdio = $(document.createElement('input'));
            var question = $(document.createElement('span'));
            var lineBreak = $('<br/>');

            rdio.attr("type", "radio");
            rdio.attr("name", "answers");
            rdio.attr("value", i - 2);
            question.text("  " + data.d[i]);

            rdio.appendTo('#poll_answers');
            question.appendTo('#poll_answers');
            lineBreak.appendTo('#poll_answers');

        }
        var hdn = $(document.createElement('input'));
        hdn.attr("type", "hidden");
        hdn.attr("id", "hdn_id");
        hdn.attr("value", data.d[0]);
        hdn.appendTo('#poll_answers');

        $('#poll_model').modal();
    }

    function buildCharts(values, questions) {
        var count = values.d.length;
        var i = 0;
        var total = values.d.reduce(function (a, b) {
            return a + b;
        });

        $("#poll_Name").text(questions.d[1]);
        for (i = 0; i < count; i++) {
            var name = "bar" + i.toString();
            var q = $(document.createElement('h4'));
            var bar = $(document.createElement('div'));
            var br = $(document.createElement('br'));
            q.text("  " + questions.d[i + 2] + " (" + values.d[i].toString() + ")");
            bar.attr('id', name);
            bar.attr('class', 'progressbar');
            q.appendTo('#charts_view');

            bar.appendTo('#charts_view');
            br.appendTo("#charts_view");
        }

        for (i = 0; i < count; i++) {
            var name = "#bar" + i.toString();
            var val = values.d[i] / total;
            $(name).progressbar({
                value: val * 100
            });

            name = name + ' > div';
            $(name).css({ 'background': 'Orange' });
        }

        $('#results_model').modal();
    }

    function verifyPollInput() {
        if ($("#q").val() === "") {
            $('#alertMsg').text("No question entered");
            $('#alertFix').text("Please enter a questions for the poll");
            $("#alertBox").modal();
            $('#q').css({ "border": '#FF0000 1px solid' });
            return false;
        }
        else if ($('#a1').val() === "" && $('#a2').val() === "" && $('#a3').val() === "" && $('#a4').val() === "") {
            $('#alertMsg').text("No answers entered");
            $('#alertFix').text("Please enter at least one possible answer");
            $("#alertBox").modal();
            $('#a1').css({ "border": '#FF0000 1px solid' });
            $('#a2').css({ "border": '#FF0000 1px solid' });
            $('#a3').css({ "border": '#FF0000 1px solid' });
            $('#a4').css({ "border": '#FF0000 1px solid' });
            return false;
        }
        else
            return true;
    };

    function verifyEditInput() {
        if ($('#edit_id').val() === "") {
            $('#alertMsg').text("No Poll ID Entered");
            $('#alertFix').text("Please enter the id for the poll you wish to edit");
            $("#alertBox").modal();
            $('#edit_id').css({ "border": '#FF0000 1px solid' });
            return false;
        }
        else if ($('#edit_q').val() === "") {
            $('#alertMsg').text("No Question Entered");
            $('#alertFix').text("Please enter the new question for the poll");
            $("#alertBox").modal();
            $('#edit_q').css({ "border": '#FF0000 1px solid' });
            return false;
        }
        else if ($('#edit_a1').val() === "" && $('#edit_a2').val() === "" && $('#edit_a3').val() === "" && $('#edit_a4').val() === "") {
            $('#alertMsg').text("No answers entered");
            $('#alertFix').text("Please enter at least one possible answer for the edited poll");
            $("#alertBox").modal();
            $('#edit_a1').css({ "border": '#FF0000 1px solid' });
            $('#edit_a2').css({ "border": '#FF0000 1px solid' });
            $('#edit_a3').css({ "border": '#FF0000 1px solid' });
            $('#edit_a4').css({ "border": '#FF0000 1px solid' });
            return false;
        }
        else
            return true;
    }

    function verifyViewID() {
        if ($('#txt_view').val() === "") {
            $('#alertMsg').text("No ID Entered");
            $('#alertFix').text("Please enter the ID of the poll you would like to see the results for");
            $("#alertBox").modal();
            $('#txt_view').css({ "border": '#FF0000 1px solid' });
            return false;
        }
        else
            return true;
    }

    function verifyTakePollID() {
        if ($('#view_pollID').val() === "") {
            $('#alertMsg').text("No ID Entered");
            $('#alertFix').text("Please enter the ID of the poll you would like to take part in");
            $("#alertBox").modal();
            $('#view_pollID').css({ "border": '#FF0000 1px solid' });
        }
        else
            return true;
    }

    function raiseNoPollFoundError() {
        $('#alertMsg').text("Ohh no :( ");
        $('#alertFix').text("We can't seem to find a poll with that id");
        $("#alertBox").modal();
    }

    function raiseSubmitPollError() {
        $('#alertMsg').text("Ohh no :( ");
        $('#alertFix').text("There was an error creating your poll, please try again later");
        $("#alertBox").modal();
    }

    function raiseSubmittingAnswerError() {
        $('#alertMsg').text("Ohh no :( ");
        $('#alertFix').text("There was an error submitting your response, please try again later");
        $("#alertBox").modal();
    }

    function raiseEditError() {
        $('#alertMsg').text("Ohh no :( ");
        $('#alertFix').text("There was an error editing the poll, please try again later");
        $("#alertBox").modal();
    }
});