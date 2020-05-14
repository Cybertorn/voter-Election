<?php
	
	include 'includes/session.php';
	include 'includes/slugify.php';

	$output = array('error'=>false,'list'=>'');

	$sql = "SELECT * FROM positions";
	$query = $conn->query($sql);

	while($row = $query->fetch_assoc()){
		$position = slugify($row['description']);
		$pos_id = $row['id'];
		if(isset($_POST[$position])){
			if($row['max_vote'] > 1){
				if(count($_POST[$position]) > $row['max_vote']){
					$output['error'] = true;
					$output['message'][] = '<li>You can only choose '.$row['max_vote'].' candidates for '.$row['description'].'</li>';
				}
				else{
					foreach($_POST[$position] as $key => $values){
						$sql = "SELECT * FROM candidates WHERE id = '$values'";
						$cmquery = $conn->query($sql);
						$cmrow = $cmquery->fetch_assoc();
						$output['list'] .= "
							<div class='row votelist'>
		                      	<span class='col-sm-8'> class='pull-right'".$row['description']." :</span> 
		                      	<span class='col-sm-4'>".$cmrow['firstname']." ".$cmrow['lastname']."</span>
		                    </div>
						";
					}

				}
				
			}
			else{
				$candidate = $_POST[$position];
				$sql = "SELECT * FROM candidates WHERE id = '$candidate'";
				$csquery = $conn->query($sql);
				$csrow = $csquery->fetch_assoc();
				$output['list'] .= "
					<div class='row votelist'>
                      	<span class='col-sm-8'> class='pull-right'".$row['description']." :</span> 
                      	<span class='col-sm-4'>".$csrow['firstname']." ".$csrow['lastname']."</span>
                    </div>
				";
			}

		}
		
	}

	echo json_encode($output);


?>