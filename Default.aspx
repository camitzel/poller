<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="BodyPlaceHolder" Runat="Server">
    
<div class="container">
    <div class="modal fade" id="poll_model">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h3 class="modal-title" id ="poll_question">Success!</h3>
                </div>
                <div class="modal-body" id="poll_answers">
                    
                    
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_submit_answer" class="btn btn-success">Submit</button>
                    
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

    <div class="modal fade" id="q_success_model">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h3 class="modal-title">Success!</h3>
                </div>
                <div class="modal-body">
                    <h3>Your response has been recorded!</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                    
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->



        
      <div class="row"> 
        <div class="col-md-4"></div>
        <div class="col-md-3">  
        <div class="text-center">
            <h2>Take a Poll!</h2>
        </div>
        <div class="well">
            <div class="input-group">
                <input type="text" id="view_pollID" class="form-control" placeholder="Poll ID"/>
            </div><br />
            <button type="button" class="btn btn-success" id="btn_View_Poll">Take it!</button>
        </div>
      </div>      
      </div>
       
</div>
</asp:Content>

