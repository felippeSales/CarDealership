<?php
include 'header.php';
?>

<div class="container">
    <form class="form-horizontal" role="form" id="new-car-form" action="addCarHandler.php" method="POST">
        <div class="form-group">
            <label for="new-car-year" class="col-sm-3 control-label">Year created:</label>
            <div class="col-sm-9">
                <input class="form-control" name="new-car-year" type="number" placeholder="Year created">
            </div>
        </div>
        <div class="form-group">
            <label for="new-car-name" class="col-sm-3 control-label">Model Name:</label>
            <div class="col-sm-9">
                <input class="form-control" name="new-car-name" type="text" placeholder="Model Name">
            </div>
        </div>
        <div class="form-group">
            <label for="new-car-mileage" class="col-sm-3 control-label">Mileage:</label>
            <div class="col-sm-9">
                <input class="form-control" name="new-car-mileage" type="number" placeholder="Mileage">
            </div>
        </div>
        <div class="form-group">
            <label for="new-car-max-speed" class="col-sm-3 control-label">Maximal Speed:</label>
            <div class="col-sm-9">
                <input class="form-control" name="new-car-max-speed" type="number" placeholder="Max speed">
            </div>
        </div>
        <div class="form-group">
            <label for="new-car-desc" class="col-sm-3 control-label">Description:</label>
            <div class="col-sm-9">
                <textarea class="form-control" name="new-car-desc" placeholder="Description" rows="4"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label for="new-car-sold" class="col-sm-3 control-label">Sold:</label>
            <div class="col-sm-9">
                <input class="form-control" name="new-car-sold" type="number" placeholder="Sold in">
                
            </div>
            <div class="col-sm-9">
                <input type="submit" value="Submit">
            </div>
           
        </div>

    </form>
    <div id='new-car-message-target'></div>
</div>


<?php
include 'footer.php';
