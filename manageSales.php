<?php
include 'header.php';
?>

<div class='container main-body'>
    
    <div id="control-panel-main">
        <h1><span>Manage</span> sales</h1>

        <div class="row well table-responsive">
            <div class="text-center">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add-sales-modal">
                    Add new sale
                </button>
            </div>

            <h3>List of sales:</h3>

            <table class="table table-condensed table-hover">
                <thead>
                <th>ID</th>
                <th>Car ID</th>
                <th>Price</th>
                <th>Date</th>
                </thead>
                <tbody id="sales-table-body">

                </tbody>
            </table>
        </div>
    </div>
</div>


<?php
include 'footer.php';
