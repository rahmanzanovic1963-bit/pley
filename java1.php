<?php
// СЕРВЕРНЫЙ СКРИПТ (PHP)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из игры
    $playerName = htmlspecialchars($_POST['name']);
    $playerScore = intval($_POST['score']);

    // Подключаемся к базе данных
    $db = new mysqli("localhost", "db_user", "db_password", "game_database");

    if ($db->connect_error) {
        die("Ошибка сервера");
    }

    // Готовим SQL-запрос для безопасной записи данных
    $stmt = $db->prepare("INSERT INTO leaderboards (username, score) VALUES (?, ?)");
    $stmt->bind_param("si", $playerName, $playerScore);
    
    if ($stmt->execute()) {
        echo "Вы попали в таблицу лидеров!";
    } else {
        echo "Ошибка сохранения.";
    }

    $stmt->close();
    $db->close();
}
?>