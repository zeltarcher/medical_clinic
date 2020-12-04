create database clinic_db;

use clinic_db;
/*
	=========================================
    CREATE TABLES
    =========================================
*/
create table  auth_acc(
	id int unique primary key,
    username char(16),
    pass char(16)
);

create table info(
	id int,
    f_name char(32),
    l_name char(32),
    m_name char(32),
    dob date,
    address_no char(32),
    city char(32),
    state char(2),
    zipcode char(5),
    email char(32),
    phone char(12),
    user_role char(12)
);
/*
	=========================================
    INSERT DEMO DATA
    =========================================
*/

/*
	=========================================
    Store Procedures
    =========================================
*/
