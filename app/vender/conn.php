<?php
$conn = mysqli_connect("localhost", "root", "root", "gameaim");
if ($conn === false) {
    die('Ошибка' . mysqli_connect_error());
}
