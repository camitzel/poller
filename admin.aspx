<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="admin.aspx.cs" Inherits="admin" %>

<asp:Content ID="Content1" ContentPlaceHolderID="BodyPlaceHolder" Runat="Server">
    
<div class="container">

    <div class="modal fade" id="success_model">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h3 class="modal-title">Success!</h3>
                </div>
                <div class="modal-body">
                   
                        <h3><span class="label label-primary">Poll ID</span><span id="poll_id"></span></h3>
                   
                    <br />
                    <p>Make sure you save that number!</p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                    
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

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

        <div class="modal fade" id="results_model">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h3 class="modal-title" id="poll_Name"></h3>
                </div>
                <div class="modal-body" id="charts_view">
                   
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_close_charts" class="btn btn-success">Close</button>
                    
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->


            <div class="modal fade" id="edit_success_model">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h3 class="modal-title" id="H1">Edit was successful!</h3>
                </div>

                <div class="modal-footer">
                    <button type="button" id="Button1" class="btn btn-success" data-dismiss="modal">Close</button> 
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

    <div class="row">
        <div class="col-md-5">
                <div class="text-center">
                    <h2>Create a Poll!</h2>
                </div>
            <div class="well">        
                <input type="text" id="q" class="form-control" placeholder="What's your question?" />
                <hr />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="First answer" id="a1"/>
                </div><br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Second answer" id="a2"/>
                </div><br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Third answer" id="a3"/>
                </div><br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Fourth answer" id="a4"/>
                </div><hr />
                <button type="button" id="btn_Submit_Poll" class="btn btn-success">Make it!</button>
            </div>
        </div>
        <div class ="col-md-1">

        </div>
        <div class="col-md-5">
            <div class ="row">
                <div class="text-center">
                    <h2>Edit a Poll!</h2>
                </div>
             <div class="well">
                <input type="text" id="edit_id" class="form-control" placeholder="Poll ID" />
                <hr />
                <input type="text" id="edit_q" class="form-control" placeholder="What's your question?" />
                <hr />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="First answer" id="edit_a1"/>
                </div><br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Second answer" id="edit_a2"/>
                </div><br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Third answer" id="edit_a3"/>
                </div><br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Fourth answer" id="edit_a4"/>
                </div><hr />
                <button type="button" id="btn_submit_edit" class="btn btn-success">Edit it!</button>
            </div>           
            </div>
            
        </div>

</div>
    <div class ="row">
        <div class="col-md-5">
                <div class="text-center">
                    <h2>See Results!</h2>
                </div>
            <div class="well">
                <div class="input-group">
                    <input type="text" id="txt_view" class="form-control" placeholder="Poll ID"/>
                </div><br />
                <button type="button" class="btn btn-success" id="btn_View_Results">See it!</button>
            </div>
          </div>
     </div>
</div>

    
</asp:Content>

