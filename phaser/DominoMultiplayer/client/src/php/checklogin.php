<?php
error_reporting(0);
$l = filter_input(INPUT_GET, 'l');
$p = filter_input(INPUT_GET, 'p');
$con = mysqli_connect("localhost","root","","DominoMultiplayer");
if (!$con) {
    echo "Codes.ERROR_CONNECTION";
    die();
}
mysqli_select_db($con,"ajax_demo");
$sql="SELECT COUNT(*) FROM user WHERE login='".$l."' AND password='".$p."'";
$result = mysqli_query($con,$sql);

$row = mysqli_fetch_array($result);

if (!$row) {
    echo "Codes.ERROR_CONNECTION";
} else if ($row[0] == 0) {
    echo "Codes.LOGIN_REFUSED";
} else if ($row[0] == 1) {
    echo "Codes.LOGIN_CONFIRMED";
} else {
    echo "checklogin.php - Possible duplicate login in database";
}

mysqli_close($con);
?>