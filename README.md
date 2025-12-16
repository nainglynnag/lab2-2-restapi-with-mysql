```

    CREATE TABLE students (
	student_id VARCHAR(5) PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    guardian_name VARCHAR(30) NOT NULL,
    ph_no INT NOT NULL,
    email VARCHAR(30),
    address VARCHAR(30)
);

INSERT INTO
	students (student_id, name, date_of_birth, guardian_name, ph_no, email, address)
	VALUES
		('S0001', 'Alice Johnson', '2005-08-15', 'Mark Johnson', 987654321, 'alice.j@example.com', '123 Oak St'),
        ('S0002', 'Robert Smith', '2003-01-22', 'Lisa Smith', 912345678, NULL, '45 Pine Ave'),
        ('S0003', 'Emily Davis', '2007-11-30', 'David Davis', 998877665, 'emily.d@example.com', '78 Elm Blvd'),
        ('S0004', 'Michael Lee-Chen', '2004-04-01', 'Wei Chen', 955544433, 'michael.lc@example.com', '10 Maple Ln'),
        ('S0005', 'Sarah Brown', '2006-09-10', 'Karen Brown', 955533433, 'sarah.b@example.com', '24 Birch Rd'),
        ('S0006', 'David Wilson', '2005-02-28', 'Steve Wilson', 933322211, 'david.w@example.com', '55 Cedar Pl'),
        ('S0007', 'Jessica Garcia', '2004-12-05', 'Maria Garcia', 976543210, 'jessica.g@example.com', '333 Aspen View, Apt 2B'),
        ('S0008', 'James Miller', '2006-06-17', 'John Miller', 900112233, 'james.m@example.com', '88 Pine Ct'),
        ('S0009', 'Sophia Rodriguez', '2007-03-25', 'Carlos Rodriguez', 911223344, 'sophia.r@example.com', '60 Poplar Dr'),
        ('S0010', 'Kenji Tanaka', '2005-10-18', 'Taro Tanaka', 944556677, 'kenji.t@example.com', '99 Willow Ave')
;

```
