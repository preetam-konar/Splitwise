-- schema
drop schema if exists `splitwise_schema`;

create schema `splitwise_schema`;

-- Spring Security Config
use `splitwise_schema`;

create table `users` (
	`email` varchar(50) not null PRIMARY KEY,
	`pw` varchar(68) not null,
	`active` tinyint not null
);

create table `roles` (
	`email` varchar(50) not null,
	`role` varchar(50) not null default 'ROLE_USER',
	key `fk_email_idx` (`email`),
	constraint `fk_email` FOREIGN KEY (`email`) REFERENCES `users` (`email`)
);

-- App User
create table `user` (
	`email` varchar(50) not null PRIMARY KEY,
	`name` varchar(50) not null,
	`phone_number` bigint not null unique,
	key `fk_email_idx` (`email`),
	constraint `fk_user_email` FOREIGN KEY (`email`) REFERENCES `users` (`email`)
);

-- Group
create table `group` (
	`id` int not null PRIMARY KEY,
	`name` varchar(50) not null
);

-- Join table User_Group
create table `user_group` (
	`email` varchar(50) not null,
	`group_id` int not null,
	PRIMARY KEY (`email`, `group_id`),
	constraint `fk_user_group_email` FOREIGN KEY (`email`) REFERENCES `user` (`email`),
	constraint `fk_group_id` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
);

-- expense
create table `expense` (
	`id` int PRIMARY KEY not null AUTO_INCREMENT,
	`group_id` int not null,
	`name` varchar(50) not null,
	`amount` int not null,
	`paid_by` varchar(50) not null,
    key `fk_group_id_idx` (`group_id`),
    constraint `fk_expense_group_id` foreign key (`group_id`) references `group` (`id`)
);

-- Join table user_expense
create table `user_expense` (
	`email` varchar(50) not null,
	`expense_id` int not null,
	PRIMARY KEY (`email`,`expense_id`),
	FOREIGN KEY (`email`) REFERENCES `user` (`email`),
	FOREIGN KEY (`expense_id`) REFERENCES `expense` (`id`)
	)