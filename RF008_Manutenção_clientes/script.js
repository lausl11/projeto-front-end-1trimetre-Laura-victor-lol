INSERT INTO FILMES VALUES
( 1  , "Toy Story"               , '1995-12-22' , 81    , "Aventura"),
( 2  , "O Silêncio dos Inocentes", '1991-05-17' , 118   , “Suspense”),
( 3  , "Coringa"                 , '2019-10-03' , 122   , "Drama");

Alternativa Correta! É possível fazer a inserção de várias linhas em uma única execução.

Alternativa correta
INSERT INTO (Id_filme,Nome, Gênero, Lançamento, Duração, )  FILMES VALUES
( 1  , "Toy Story"               , “Aventura”, '1995-12-22' , 81  ),
( 2  , "O Silêncio dos Inocentes", "Suspense", '1991-05-17' , 118  ),
( 3  , "Coringa"                 , '2019-10-03' ,  "Drama"  , 122  );

Alternativa correta
INSERT INTO FILMES VALUES
( 1  , "Toy Story"               , '1995-12-22' , 81    , "Aventura"); 
INSERT INTO FILMES VALUES
( 2  , "O Silêncio dos Inocentes", '1991-05-17' , 118   , "Suspense"); 
INSERT INTO FILMES VALUES
( 3  , "Coringa"                 , '2019-10-03' , 122   , "Drama"); 

Alternativa Correta! Podemos inserir cada uma das três linhas em diferentes inserções.

Alternativa correta
INSERT INTO FILMES (Nome, Gênero, Lançamento, Duração, Id_filme ) VALUES
( "Toy Story"              , "Aventura", '1995-12-22' , 81   , 1),
( "O Silêncio dos Inocentes" , "Suspense" , '1991-05-17' , 118  , 2),
( "Coringa"                  , "Drama"    , '2019-10-03' , 122  , 3); 