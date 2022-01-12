insert into roles values (default , "admin" ,now() , now());

insert into roles values (default , "users" , now() , now());

insert into users values(default , "Adrian" , "Corti" , "test@gmail.com" , "$2a$10$r.Z0RDyIeWs4MiJebLQ.6.shJx0xgKe/tyisAVmBiBw0ogpSCLy6q" , "calle falsa 123" , 4522238 , "kymel" , 1 , now() , now() , NULL),
(default , "Pablo" , "Menichini" , "test1@gmail.com" , "$2a$10$r.Z0RDyIeWs4MiJebLQ.6.shJx0xgKe/tyisAVmBiBw0ogpSCLy6q" , "calle de verdad 123" , 4522239 , "Capo" , 1 , now() , now() , NULL),
(default , "Ariel" , "Mateu" , "test2@gmail.com" , "$2a$10$r.Z0RDyIeWs4MiJebLQ.6.shJx0xgKe/tyisAVmBiBw0ogpSCLy6q" , "calle original 123" , 4522240 , "Groso" , 1 , now() , now() , NULL),
(default , "Silvina" , "NN" , "test3@gmail.com" , "$2a$10$r.Z0RDyIeWs4MiJebLQ.6.shJx0xgKe/tyisAVmBiBw0ogpSCLy6q" , "calle que topa 123" , 4522241 , "Genia" , 1 , now() , now() , NULL),
(default , "invitado" , "NN" , "invitado@gmail.com" , "$2a$10$r.Z0RDyIeWs4MiJebLQ.6.shJx0xgKe/tyisAVmBiBw0ogpSCLy6q" , "calle que topa 123" , 4522241 , "neutral" , 2 , now() , now() , NULL)