-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 24 2021 г., 21:47
-- Версия сервера: 10.4.18-MariaDB
-- Версия PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `game_7red`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `connectedPlayers` (IN `md` VARCHAR(32), IN `log` VARCHAR(30))  BEGIN
DECLARE g_id int DEFAULT (select game_id from game where md=game.md);

select "1" as num, login from players where game_id=g_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `connectGame` (`log` VARCHAR(30), `pw` VARCHAR(50), `game_md` VARCHAR(32))  BEGIN 
declare id int default (select game_id from game where md=game_md);

if id is not NULL -- если id не ноль (такая игра есть)
	then 
    IF EXISTS (SELECT * FROM players WHERE login=log AND password=pw) -- если такой игрок существует
	     THEN 
 IF (select game_id from players where login=log) is NULL
 THEN -- если этот игрок не находится в другой игре
 
 	if ((select size from game where game_id=id)>(select count(*) from players where game_id=id)) -- если у нас нет нужного кол-ва игроков
        THEN

      
      
       START TRANSACTION;
			update players set game_id=id, inGame=1 where login=log;
   
      IF ((select size from game where game_id=id)=(select count(*) from players where game_id=id))
        THEN 
        	CALL distributeCards(id);
            INSERT INTO moves VALUES ((SELECT login from players where game_id=id and loginNext=(SELECT min(loginNext) from players where game_id=id)), CURRENT_TIMESTAMP); 
            
            COMMIT;
        else
        	SELECT login from players WHERE game_id=id;
            COMMIT;
  	 END IF;

	else SELECT "Error!",
        "wrong  game_id ",
        "неправильный game_id " ;
        
    end IF;
      
	else SELECT "Error!",
        "у игрока уже есть id игры";
	END IF;
    
    ELSE SELECT "Error!",
        "Same login doesn't exist",
        "неправильный логин пароль" ;

    END IF;
    
    ELSE SELECT "Error!, id игры равен null (connectGame)" ;
    END IF;
    
    
        
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createGame` (`log` VARCHAR(30), `pw` VARCHAR(50), `number` INT, `pblc` BOOLEAN)  BEGIN
declare x int default 0;



	IF EXISTS (SELECT * FROM players WHERE login=log AND password=pw)
	     THEN 
         
         START TRANSACTION;
    	INSERT INTO game(game_id, md, size, public, def_id, random) VALUES(null, NULL, number, pblc, 49, rand()*1000000);
       
       set x= last_insert_id();

 UPDATE game SET md=MD5(game_id) where game_id=x; 

     update players set game_id=x, inGame=1 where login=log ;
   COMMIT;
-- update players set inGame=1 where login=log;

 SELECT md from game WHERE game_id=x ;   

       else SELECT "Error! неправильный логинпароль" ;     
	    end IF;
      
     
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser` (`log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
        IF (SELECT COUNT(*) FROM players WHERE login=log) = 0 
        THEN
        
			INSERT INTO players VALUES( log, pw, NULL, NULL, Null) ;
           
            call showPublicGames();
        
		else SELECT "Error! Такой логин уже существует. Если это ты - просто продолжай, если нет - перезагрузи страницу и выбери себе новое имя!" ;
        
     end IF;
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `distributeCards` (IN `id_of_game` INT)  BEGIN
	DECLARE g_size INT DEFAULT(SELECT COUNT(*) FROM players WHERE game_id=id_of_game);	
   DECLARE	number7 INT DEFAULT g_size*7; 
	
    
    IF EXISTS (select * from game where game_id=id_of_game)   
    THEN
    
    if not exists (select card_id from paletteCards join players using (login) where game_id=id_of_game)
    THEN
    
    
   
    if g_size= (select size from game where game_id = id_of_game)
              then
    
       
    CREATE TEMPORARY TABLE deck (n INT PRIMARY KEY AUTO_INCREMENT, card int);   
     CREATE TEMPORARY TABLE t1 (n INT PRIMARY KEY AUTO_INCREMENT, card int);  
    CREATE TEMPORARY TABLE t2 (n INT PRIMARY KEY AUTO_INCREMENT, login VARCHAR(30));
    
     
    INSERT INTO deck SELECT null, card_id from cards ORDER BY rand() limit 49;    
    INSERT INTO t1 SELECT null, card from deck ORDER BY rand() limit g_size;     
   
     INSERT INTO t2 SELECT null, login from players WHERE game_id=id_of_game; 
     
     INSERT INTO paletteCards SELECT card, login from t1 NATURAL JOIN t2;       
     
     DELETE from deck WHERE card IN(SELECT card from t1);       
            
            
      
         
      TRUNCATE TABLE t1;      
     
      CREATE TEMPORARY TABLE t3 (n INT PRIMARY KEY AUTO_INCREMENT, card int);
      
      CREATE TEMPORARY TABLE t4 (n INT PRIMARY KEY AUTO_INCREMENT, login VARCHAR(30));
      
           
      INSERT INTO t3 SELECT null, card from deck ORDER BY rand() limit number7;      
      
      INSERT INTO t4 SELECT NULL, login FROM t2 JOIN (SELECT * FROM deck LIMIT 7) AS x;

      
       INSERT INTO handCards SELECT card, login from t3 NATURAL JOIN t4;       
       
       DELETE from deck WHERE card IN(SELECT card from t3);  
       
       UPDATE game set def_id = (select card from deck ORDER BY rand() limit 1) WHERE game_id=id_of_game;       
       
      
      DROP TABLE t1;
      DROP TABLE t2;
      DROP TABLE t3;
      DROP TABLE t4;
      DROP TABLE deck;
      
      ELSE SELECT "Error!", "Недостаточное кол-во игроков для раздачи карт!";
     END IF; 
  
 ELSE SELECT "Error!", "Положи на место функцию!";
     END IF;
     
     ELSE 
     SELECT "Error!", " Sorry! Что-то сломалось и такого id игры нет!";
      END IF;
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `doubleDrop` (`palette_id` INT, `defence_id` INT, `log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
declare g_id int DEFAULT (SELECT game_id from players where login=log);
declare color2 varchar(15) default (select color from cards where card_id=defence_id limit 1); 
declare c_id int DEFAULT (select def_id FROM game WHERE game_id=g_id); -- на всякий случай запоминаем карту сброса, которая сейчас стоит , вдруг придется возвращать



if exists (select * from players where login=log and password=pw)
         THEN
         if (SELECT count(loginNext) FROM players where game_id=g_id and inGame!=0) !=1
         THEN
         if (SELECT loginNext FROM players where login=log) is NOT NULL
   then    
      IF EXISTS (SELECT * FROM moves WHERE login=log)
THEN
    IF exists (select * from handCards WHERE login=log)
then -- если у нас есть карты на руках
   			if exists (select * from handCards WHERE card_id=palette_id  AND login=log) 
        THEN
        
        if exists (select * from handCards WHERE card_id=defence_id	  AND login=log) 
        THEN
        
        if defence_id!=palette_id
        
        then
         
        START TRANSACTION;
   	INSERT INTO paletteCards(card_id, login) VALUES (palette_id, log); -- поменяли карту в палитре
     
  
   
   UPDATE game SET def_id=defence_id WHERE game_id=g_id; -- поменяли карту сброса
  -- COMMIT;
  --   do RELEASE_LOCK("host700505_4568_palette");

  
     

    IF checkRules(color2, g_id, log)=true
   THEN
   
   
delete from handCards where card_id =palette_id;
   delete from handCards where card_id=defence_id;
  
  call updateMove(log, (SELECT random from game where game_id=g_id)); -- меням порядок хода на следующего 

    
  COMMIT;
  
    ELSE
  SELECT " Ой! Кажется, ты не лидируешь по заданному правилу! Скорее меняй карту!";
 
--  UPDATE game SET def_id=c_id WHERE game_id=g_id;
  
 --   DELETE FROM paletteCards where card_id=palette_id;-- возвращаем карту на место
   --      do RELEASE_LOCK("host700505_4568_palette");


ROLLBACK;
  END IF;
   
   
    ELSE
    select "error", "Осторожно! Ты кладешь в палитру и в сброс одну и ту же карту!";
		END IF;
    
      
   
   ELSE 
        select "error", "Упссс! Кажется, такой карты  для сброса у тебя нет";
		END IF;  
      ELSE 
        select "error", "Упссс! Кажется, такой карты  для палитры у тебя нет";
		END IF;
        ELSE
        select "error", "Упссс! У тебя не осталось карт на руках! ты вынужден пасовать! выбери pass для хода.";
		END IF;
        ELSE 
        select "error", "Упссс! Кажется, сейчас не твой ход!";
        end IF;

        ELSE 
        select "error", "Ты не можешь больше ходить! Вероятно ты выбыл из игры либо если ты один, то ты выиграл!";
        end IF;
         ELSE 
        select "Поздравляю! Ты победил! остальные игроки спасовали!";
        end IF;

        ELSE
			select "error", "wrong log or pw";
            
     END IF;


   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exitGame` (`log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
declare g_id int DEFAULT (SELECT game_id from players where login=log);


if exists (select * from players where login=log and password=pw)
THEN

IF EXISTS (select * from game where game_id=g_id)
           THEN


if ((select size FROM game join players using (game_id) WHERE login=log and game.game_id=players.game_id)=(select count(*) from players where game_id=g_id)) -- проверяем, что кол-во игроков равно тому что в size - игра началась
THEN


START TRANSACTION;
UPDATE players SET inGame=Null, game_id=Null WHERE login=log;
DELETE from paletteCards where login=log;
DELETE from handCards where login=log;
 COMMIT;
    


      

call updateMove(log, (SELECT random from game where game_id=g_id));

IF ((select count(*) from players where game_id=g_id)=1)
THEN

START TRANSACTION;
	DELETE FROM game WHERE game_id=g_id;
    UPDATE players SET inGame=Null WHERE login=log;
 COMMIT;
      
    end if;
         

else 


        START TRANSACTION;
UPDATE players SET inGame=Null WHERE login=log;
UPDATE players SET game_id=Null WHERE login=log;
DELETE from paletteCards where login=log;
DELETE from handCards where login=log;
SELECT "Ты вышел из игры, которая не нечалась!";
COMMIT;
 
end if;

ELSE
SELECT "упс, кажется, такой игры нет!";
end if;
ELSE
SELECT "такого логина или пароля нет! Проверь написание и раскладку!";
end if;
      

   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `logout` (`log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
        IF (SELECT COUNT(*) FROM players WHERE login=log) = 1 
        THEN
			DELETE FROM players where login=log AND password=pw;
		else SELECT "Error!
        такой логин не существует" ;
        
     end IF;
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moveToDrop` (`id` INT, `log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
declare g_id int DEFAULT (SELECT game_id from players where login=log);
declare color2 varchar(15) default (select color from cards where card_id=id limit 1); -- запоминаем цвет новой карты сброса
declare c_id int DEFAULT (select def_id FROM game WHERE game_id=g_id); -- на всякий случай запоминаем карту сброса, которая сейччас стоит , вдруг придется возвращать
    
    if exists (select * from players where login=log and password=pw)
   then    			
  if (SELECT count(loginNext) FROM players where game_id=g_id  and inGame!=0) !=1
   then
   if (SELECT loginNext FROM players where login=log) is NOT NULL    then
   
   IF EXISTS (SELECT * FROM moves WHERE login=log)
THEN
    IF exists (select * from handCards WHERE login=log)
then 
   if exists (select * from handCards WHERE card_id=id AND login=log) 
        THEN
        	if exists (select * from game)             
            THEN
                  START TRANSACTION;            
   	UPDATE game SET def_id=id WHERE game_id=g_id; 
         

        
    IF checkRules(color2, g_id, log)=true
    THEN
    
     delete from handCards where card_id =id;
        
  call updateMove(log, (SELECT random from game where game_id=g_id));   

  COMMIT;

    ELSE
  SELECT " Ой! Кажется, ты не лидипуешь по заданному правилу! Скорее меняй карту!";
  
 -- UPDATE game SET def_id=c_id WHERE game_id=g_id;
 -- INSERT INTO handCards(card_id, login) VALUES (id, log);-- возвращаем карту на место
ROLLBACK;
         


  END IF;
    
   
     ELSE 
   select "error", "error! сломали сброс, в нем нет карт!";
     END IF;
     
     ELSE SELECT "error", "Такой карты нет!" ;
		END IF;
        else
        select "error", "У тебя не осталось карт на руках! ты вынужден пасовать! выбери pass для хода.";
		END IF;
        ELSE 
        select "error", " Кажется, сейчас не твой ход!";
        end IF;
        ELSE 
        select "error", "Ты не можешь больше ходить! Вероятно ты выбыл из игры либо если ты один, то ты выиграл!";
        end IF;
         ELSE 
        select "Поздравляю! Ты победил! остальные игроки спасовали!";
        end IF;

        ELSE
			select "error", "wrong log or pw";
     END IF;
        

   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moveToPalette` (`id` INT, `log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
declare g_id int DEFAULT (SELECT game_id from players where login=log);
declare color2 varchar(15) default (select color from game JOIN cards ON card_id=def_id where game_id=g_id limit 1);

if exists (select * from players where login=log and password=pw)
         THEN
          if (SELECT count(loginNext) FROM players where game_id=g_id  and inGame!=0) !=1
   then    
         if (SELECT loginNext FROM players where login=log) is NOT NULL
   then    
      IF EXISTS (SELECT * FROM moves WHERE login=log)
THEN
IF exists (select * from handCards WHERE login=log)
then    			

if exists (select * from handCards WHERE card_id=id AND login=log) 
        THEN        
        	
            START TRANSACTION;
   	INSERT INTO paletteCards(card_id, login) VALUES (id, log);           -- select CHEckrules;

    IF (checkRules(color2, g_id, log)=true)
    THEN
    
   
     delete from handCards where card_id =id;
     call updateMove(log, (SELECT random from game where game_id=g_id));
     
 	   COMMIT; -- если все хорошо
   
    ELSE
  		SELECT "error", " Ой! Кажется, ты не лидипуешь по заданному правилу! Скорее меняй карту!" as err;
  ROLLBACK; -- если все плохо

  END IF;
  
     
     
        
       ELSE 
        select "error", "Упссс! Кажется, такой карты у тебя нет" as err;
		END IF;
          ELSE 
        select "error", "Упссс! У тебя не осталось карт на руках! ты вынужден пасовать! выбери pass для хода." as err;
		END IF;
      
        ELSE 
        select "error", "Упссс! Кажется, сейчас не твой ход!" as err;
        end IF;

        ELSE 
        select "error", "error! Ты не можешь больше ходить! Вероятно ты выбыл из игры либо если ты один, то ты выиграл!" as err;
        end IF;
        ELSE 
        select "Поздравляю! Ты победил! остальные игроки спасовали! выбери pass чтобы выйти из игры"  as err;
        end IF ;
        ELSE
			select "error", "wrong log or pw" as err;
            
     END IF;
     
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pass` (`log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN

declare id int DEFAULT (SELECT game_id from players where login=log);

if exists (select * from players where login=log and password=pw)
THEN

if (SELECT inGame FROM players where login=log) is NOT NULL then

IF EXISTS (SELECT * FROM moves WHERE login=log)
THEN
          
            
       DELETE FROM handCards where login=log;             
       DELETE FROM paletteCards where login=log;  
           

            

 call updateMove(log, (SELECT random from game where game_id=id));
 
             if (SELECT sum(inGame) FROM players where game_id=id )!=1 -- если остался только один игрок в игре
   then 
      SELECT "ты проиграл! не расстраивайся, ты можешь все еще  наблюдать за ней!";
      
      UPDATE players SET inGame=NUll WHERE login=log;  

   ELSE  
   
        START TRANSACTION;
      UPDATE players SET inGame=NUll WHERE login=log; 
     SELECT "Поздравляю! Ты победил! хочешь сыграть снова?";
     DELETE FROM moves WHERE login=log;      
     DELETE FROM game WHERE game_id=id;  
      COMMIT;
                             

                    

     END IF;          
                       
     ELSE
select "error","Упссс! Кажется, сейчас не твой ход!";
end IF;

ELSE
select "error! ", "Ты не можешь больше ходить! Вероятно ты выбыл из игры!";
end IF;

ELSE
select "error", "wrong log or pw";
END IF;       

   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `showGameInfo` (`log` VARCHAR(30), `pw` VARCHAR(50))  BEGIN
declare id int default (select game_id from players where login=log);

if exists (select * from players where login=log and password=pw)
         THEN
         
         if (SELECT loginNext FROM players where login=log) is NOT NULL
   then    
                     
         (SELECT cards.card_id, rank, color, login, "hand" as place FROM cards, handCards where cards.card_id=handCards.card_id and login=log)
         UNION
 		(SELECT def_id, rank, color, "defence", "defence" FROM cards, game WHERE cards.card_id=game.def_id and game.game_id=id) 
UNION         
         (SELECT card_id, rank, color, players.login, "palette" FROM paletteCards join cards Using (card_id) join players Using (login) where players.game_id=id )
union
          (select count(card_id), null, moves.login, handCards.login, "move" from handCards left join moves using (login) NATURAL JOIN players where game_id=id group by handCards.login HAVING count(card_id)) order by login, place, card_id, rank;
               
         ELSE 
        select "error! Ты не можешь больше ходить! Вероятно ты выбыл из игры либо если ты один, то ты выиграл!";
        end IF;
        
        ELSE
			select "error", "wrong log or pw";      
     END IF;

   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `showPublicGames` ()  BEGIN

	IF EXISTS (select * from game where public=1)     
    THEN
                                                  
    select md, size, (select count(*) from players where game.game_id=players.game_id) as have_players FROM game WHERE public=1 and size>(select count(*) from players where game.game_id=players.game_id) GROUP BY game_id;     
         
         
 ELSE
 
 SELECT "Sorry! Публичных игр пока нет! Создай свою с помощью createGame() (если ты вошел в систему, иначе войди с помощью createUser())";
     END IF;
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateMove` (`log` VARCHAR(30), `random_num` INT)  BEGIN
declare id int default (select game_id from players where login=log);
declare lnext int;

if random_num=(SELECT random from game WHERE game_id=id)
then -- если рандомное число совпадает с тем, что в игре


if EXISTS ( SELECT loginNext from players where game_id=id and loginNext>(SELECT loginNext from players where login=log) limit 1) -- если наш номер не максимальный в игре
THEN 

SET lnext=(SELECT loginNext from players where game_id=id and inGame!=0 and loginNext>(SELECT loginNext from players where login=log and inGame!=0) order by loginNext limit 1); -- в переменную хаписываем значение

 
UPDATE moves SET login = (SELECT login FROM players where loginNext=lnext), active = CURRENT_TIMESTAMP WHERE login=log; -- меням порядок хода на следующего

-- UPDATE moves SET active = CURRENT_TIMESTAMP WHERE login=log;

else -- иначе у нас макс номер игрока и мы должны просто поставить минимального

SET lnext=(SELECT min(loginNext) FROM players WHERE game_id=id and inGame!=0);

 
UPDATE moves SET login=(SELECT login FROM players where loginNext=lnext), active = CURRENT_TIMESTAMP WHERE login=log; -- меням порядок хода на следующего

-- UPDATE moves SET active = CURRENT_TIMESTAMP WHERE login=log;

   

end if;
    
ELSE 

SELECT "error", " Не трогай функцию без спроса!(UPDATEmOVE)";
END IF;
     

END$$

--
-- Функции
--
CREATE DEFINER=`root`@`localhost` FUNCTION `checkRules` (`color2` VARCHAR(15), `g_id` INT, `log` VARCHAR(30)) RETURNS TINYINT(1) BEGIN

 CASE
    WHEN color2="red" 
    THEN 
    
 return (log=(select login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id) t order by card_id desc limit 1));

  
  
    WHEN color2="orange" 
    THEN  
    
    return (log=( SELECT login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id) t  group by login, rank ORDER by count(*) DESC, MAX(card_id) desc limit 1));
    
  
    WHEN color2="yellow" 
	then  
    return (log=( SELECT login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id) t group by login, color ORDER by count(*) DESC, MAX(card_id) desc limit 1));
    
  
    WHEN color2="green" 
    THEN  
    return (log=(SELECT login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id and rank%2=0) t group by login order by count(*) DESC, MAX(card_id) desc limit 1));
    
  
    WHEN color2="light-blue" 
    THEN 
    
    
    return log=(SELECT login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id) t group by login ORDER by count(DISTINCT color) DESC, max(card_id) DESC limit 1);
    
  
  
    WHEN color2="blue"    
    THEN    
    return (log=(SELECT login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id) t group by login ORDER by count(DISTINCT rank) DESC, max(card_id) DESC limit 1));
    
  
   WHEN color2="purple"  
   THEN 
    return (log=(SELECT login from (SELECT * from paletteCards join cards using (card_id) join players USING (login) where game_id=g_id and rank<4) t group by login ORDER by count(*) DESC, max(card_id) DESC limit 1));
    
  
    
END CASE;
  
   end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE `cards` (
  `card_id` int(11) NOT NULL,
  `color` enum('red','orange','yellow','green','light-blue','blue','purple') NOT NULL,
  `rank` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

--
-- Дамп данных таблицы `cards`
--

INSERT INTO `cards` (`card_id`, `color`, `rank`) VALUES
(7, 'red', 1),
(14, 'red', 2),
(21, 'red', 3),
(28, 'red', 4),
(35, 'red', 5),
(42, 'red', 6),
(49, 'red', 7),
(6, 'orange', 1),
(13, 'orange', 2),
(20, 'orange', 3),
(27, 'orange', 4),
(34, 'orange', 5),
(41, 'orange', 6),
(48, 'orange', 7),
(5, 'yellow', 1),
(12, 'yellow', 2),
(19, 'yellow', 3),
(26, 'yellow', 4),
(33, 'yellow', 5),
(40, 'yellow', 6),
(47, 'yellow', 7),
(4, 'green', 1),
(11, 'green', 2),
(18, 'green', 3),
(25, 'green', 4),
(32, 'green', 5),
(39, 'green', 6),
(46, 'green', 7),
(3, 'light-blue', 1),
(10, 'light-blue', 2),
(17, 'light-blue', 3),
(24, 'light-blue', 4),
(31, 'light-blue', 5),
(38, 'light-blue', 6),
(45, 'light-blue', 7),
(2, 'blue', 1),
(9, 'blue', 2),
(16, 'blue', 3),
(23, 'blue', 4),
(30, 'blue', 5),
(37, 'blue', 6),
(44, 'blue', 7),
(1, 'purple', 1),
(8, 'purple', 2),
(15, 'purple', 3),
(22, 'purple', 4),
(29, 'purple', 5),
(36, 'purple', 6),
(43, 'purple', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `game`
--

CREATE TABLE `game` (
  `game_id` int(11) NOT NULL,
  `md` varchar(32) DEFAULT NULL,
  `size` int(11) NOT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `def_id` int(11) DEFAULT NULL,
  `random` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

--
-- Дамп данных таблицы `game`
--

-- --------------------------------------------------------

--
-- Структура таблицы `handcards`
--

CREATE TABLE `handcards` (
  `card_id` int(11) NOT NULL,
  `login` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


-- --------------------------------------------------------

--
-- Структура таблицы `moves`
--

CREATE TABLE `moves` (
  `login` varchar(30) DEFAULT NULL,
  `active` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


-- --------------------------------------------------------

--
-- Структура таблицы `palettecards`
--

CREATE TABLE `palettecards` (
  `card_id` int(11) NOT NULL,
  `login` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


-- --------------------------------------------------------

--
-- Структура таблицы `players`
--

CREATE TABLE `players` (
  `login` varchar(30) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `loginNext` int(10) UNSIGNED NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `inGame` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;



--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`),
  ADD UNIQUE KEY `color` (`color`,`rank`);

--
-- Индексы таблицы `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`game_id`),
  ADD UNIQUE KEY `md` (`md`),
  ADD KEY `def_id` (`def_id`);

--
-- Индексы таблицы `handcards`
--
ALTER TABLE `handcards`
  ADD UNIQUE KEY `login` (`login`,`card_id`),
  ADD KEY `card_id` (`card_id`);

--
-- Индексы таблицы `moves`
--
ALTER TABLE `moves`
  ADD UNIQUE KEY `login` (`login`);

--
-- Индексы таблицы `palettecards`
--
ALTER TABLE `palettecards`
  ADD UNIQUE KEY `login` (`login`,`card_id`),
  ADD KEY `card_id` (`card_id`);

--
-- Индексы таблицы `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`login`),
  ADD UNIQUE KEY `loginNext` (`loginNext`),
  ADD KEY `game_id` (`game_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `game`
--
ALTER TABLE `game`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT для таблицы `players`
--
ALTER TABLE `players`
  MODIFY `loginNext` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`def_id`) REFERENCES `cards` (`card_id`);

--
-- Ограничения внешнего ключа таблицы `handcards`
--
ALTER TABLE `handcards`
  ADD CONSTRAINT `handCards_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`),
  ADD CONSTRAINT `handCards_ibfk_2` FOREIGN KEY (`login`) REFERENCES `players` (`login`);

--
-- Ограничения внешнего ключа таблицы `moves`
--
ALTER TABLE `moves`
  ADD CONSTRAINT `moves_ibfk_1` FOREIGN KEY (`login`) REFERENCES `players` (`login`);

--
-- Ограничения внешнего ключа таблицы `palettecards`
--
ALTER TABLE `palettecards`
  ADD CONSTRAINT `paletteCards_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`),
  ADD CONSTRAINT `paletteCards_ibfk_2` FOREIGN KEY (`login`) REFERENCES `players` (`login`);

--
-- Ограничения внешнего ключа таблицы `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
