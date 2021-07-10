<?php
include_once 'conn.php';
$json = $_POST['data'];
$data = json_decode($json, true);

function sendData($data, $conn)
{
    $user = $data['user'];
    $number = $data['number'];
    $sql = "INSERT INTO `result` (`id`, `user_name`, `number`, `time`) VALUES (NULL, '$user', '$number', '30')";
    mysqli_query($conn, $sql);
}

function checkData($conn)
{
    $sql = "SELECT * FROM `result`";
    $req = mysqli_query($conn, $sql);
    if ($req == false) {
        echo 'ошибка';
    } else {
        $result = mysqli_fetch_all($req);
        usort($result, function ($a, $b) {
            return ($a[2] - $b[2]);
        });
        $data_reverse = array_reverse($result);
        foreach ($data_reverse  as $key) {
            echo "<tr>
            <td>
            $key[1]
            </td>
            <td>
            $key[2]
            </td>
          </tr>";
        }
    }
}


if (isset($json)) {
    sendData($data, $conn);
    $user = null;
    $number = null;
    checkData($conn);
} else {
    echo "<div>Ошибка</div>";
}
