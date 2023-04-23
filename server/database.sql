-- users table 
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at date default current_date
);


CREATE TABLE revenue(
	"CustomerName" varchar NULL,
	"ProjectName" varchar NULL,
	category varchar NULL,
	"Country" varchar NULL,
	openbacklog numeric NULL,
	closebacklog numeric NULL,
	orderdate date NULL,
	orderamount numeric NULL,
	revenuetype varchar NULL,
	contracttype varchar NULL,
	"Jan" numeric NULL,
	"Feb" numeric NULL,
  "Mar" numeric NULL,
	"Apr" numeric NULL,
	"May" numeric NULL,
	"Jun" numeric NULL,
	"Jul" numeric NULL,
	"Aug" numeric NULL,
	"Sep" numeric NULL,
	"Oct" numeric NULL,
	"Nov" numeric NULL,
	"Dec" numeric NULL,
	"Jan1" numeric NULL,
	"Feb1" numeric NULL,
	"Mar1" numeric NULL,
 	total numeric NULL,
	po numeric NULL,
	unusedpo numeric NULL,
	devcentrepayment numeric NULL,
	difference numeric NULL,
	"off" varchar NULL
);


COPY revenue
FROM 'C:\FMS\client\src\pages\revenue\Expenses\Revenue.csv'
with CSV HEADER;







c