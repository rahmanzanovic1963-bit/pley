-- ЯЗЫК ЗАПРОСОВ К БАЗЕ ДАННЫХ (SQL)
-- Создаем таблицу для хранения топ-игроков
CREATE TABLE leaderboards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    date_achieved TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Пример SQL-запроса, который PHP использует, чтобы показать ТОП-10 игроков:
SELECT username, score FROM leaderboards ORDER BY score DESC LIMIT 10;