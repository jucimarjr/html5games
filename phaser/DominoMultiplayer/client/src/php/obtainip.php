<?php
$ip = $_SERVER['SERVER_ADDR'];
if ($ip == "::1") {
    $ip = "localhost";
}
echo $ip;
?>