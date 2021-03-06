<?php
    /*    
   		JSON package expected
    		{ 
      			"userID"    :  <<userID>>
			"term" 	    :  <<term>>
			"year"      :  <<year>>
    		}
	
        	Deletes all classes associated with that userID term and year
    */
	$inData = getRequestInfo();
	$info = json_decode(file_get_contents('info.json'), true);

	$conn = new mysqli("localhost", $info["name"], $info["pass"], $info["data"]);
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "CALL deleteClassesTerm (?, ?, ?);";
		$stmt = $conn->prepare($sql);
		if($stmt != false) 
		{
			$stmt->bind_param('isi', $userID, $term, $year);
			$userID = $inData["userId"];
            		$term = $inData["term"];
            		$year = $inData["year"];
			$stmt->execute();
		}
		else
		{
			returnWithError($conn->error);
		}
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
