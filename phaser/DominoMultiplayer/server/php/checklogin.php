<?php
$l = filter_input(INPUT_GET, 'l');
$p = filter_input(INPUT_GET, 'p');
$con = mysqli_connect("localhost","root","","DominoMultiplayer");
if (!$con) {
  die();
}
mysqli_select_db($con,"ajax_demo");
$sql="SELECT COUNT(*) FROM user WHERE login='".$l."' AND password='".$p."'";
$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
  echo $row[0];
}

mysqli_close($con);
?>