<?php
include 'header.php';
include 'api.php';
?>

<div class='container main-body'>

    <div id="control-panel-main">
        <h1><span>Manage</span> cars</h1>

        <div class="row well table-responsive">
            <div class="text-center">
                <a href="addCarForm.php">
                <button type="button" class="btn btn-primary" data-toggle="modal" id="add-car-button">
                    Add new car
                </button></a>
                    
                <button type="button" class="btn btn-success" data-toggle="modal" id="edit-car-button">
                    Edit car
                </button>
                <button type="button" class="btn btn-danger" data-toggle="modal" id="remove-car-button">
                    Delete car
                </button>
            </div>


            <h3>List of cars:</h3>

            <table class="table table-condensed table-hover">
                <thead>
                <th>ID</th>
                <th>Year Created</th>
                <th>Model Name</th>
                <th>Mileage</th>
                <th>Maximal speed</th>
                <th>Description</th>
                <th>Sold</th>
                </thead>
                <tbody id="cars-table-body">
                    <?php
                        $cars = getCars();
                        
                        foreach ($cars as $car){
                            echo "<tr>";
                            echo "<td>" . $car["id"] . "</td>"; 
                            echo "<td>" . $car["year_built"] . "</td>"; 
                            echo "<td>" . $car["model_name"] . "</td>";
                            echo "<td>" . $car["mileage"] . "</td>";
                            echo "<td>" . $car["max_speed"] . "</td>";
                            echo "<td>" . $car["description"] . "</td>";
                            echo "<td>" . $car["sold_date"] . "</td>"; 
                            echo "</tr>";
                        }
                    
                    ?>

                </tbody>
            </table>
        </div>
    </div>
</div>


<?php
include 'footer.php';
