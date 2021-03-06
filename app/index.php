<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AimGame</title>
  <link rel="stylesheet" href="css/style.min.css">
  <link rel="shortcut icon" href="./images/favicon.png" type="image/x-icon">
</head>

<body>
  <div class="screen">
    <h1 class="screen__title">Aim Training</h1>
    <a href="#" class="screen__start" id='start'>Начать игру</a>
    <a href="#" class="screen__start" id='rating'>Рейтинг</a>
  </div>
  <div class="screen">
    <h1>Выберите время</h1>
    <ul id='list-button' class="screen__time-list">
      <li>
        <button data-time="5" class="screen__time-btn">
          10 сек
        </button>

      </li>
      <li>
        <button data-time="20" class="screen__time-btn">
          20 сек
        </button>
      </li>
      <li>
        <button data-time="30" class="screen__time-btn">
          30 сек
        </button>
      </li>
    </ul>
  </div>

  <div class="screen">
    <h3>Осталось <span id="time">00:00</span></h3>
    <div class="screen__board" id="board">
      <div class="screen__result">
        <h1>Результат<span class="result__span"> </span></h1>
        <div class="result_button">
          <button id="newButton" class='screen__result__new'>Заново</button>
          <button id="newButton" class='screen__result__save'>Сохранить</button>
        </div>
        <div class="save">
          <div class="save__result">
            <form id="form" method="POST">
              <input type="text" placeholder="Введи имя" class="name" name="user" id='name'>
              <button type="submit" id="save__name_button" class='save__name_button'>Сохранить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="screen">
    <div class="screen__button">
      <button id="main" class='screen__button__main'>Главная</button>
      <button id="newGame" class='screen__result__new'>Играть</button>
    </div>
    <div class="result__title">
      <h1>Список результатов</h1>
    </div>
    <div class="list">
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Счет</th>
          </tr>
        </thead>
        <tbody class="list__item">
          <?php
          include_once './vender/conn.php';
          $sql = "SELECT * FROM `result`";
          $result = mysqli_query($conn, $sql);
          $data = mysqli_fetch_all($result);
          usort($data, function ($a, $b) {
            return ($a[2] - $b[2]);
          });
          $data_reverse = array_reverse($data);

          foreach ($data_reverse as $key) {
            echo "<tr>
              <td>
              $key[1]
              </td>
              <td>
              $key[2]
              </td>
            </tr>";
          }

          ?>
        </tbody>
      </table>
    </div>
  </div>


  <script src="./js/app.js"></script>
</body>

</html>