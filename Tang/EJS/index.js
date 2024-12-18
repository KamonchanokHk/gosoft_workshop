const express = require('express');
const mysql = require("mysql2/promise");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: 'root',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: 8889  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

// // Mock database query
// const getUsers = () => {
//     return [
//         { id: 1, name: 'Alice', email: 'alice@example.com' },
//         { id: 2, name: 'Bob', email: 'bob@example.com' },
//         { id: 3, name: 'Charlie', email: 'charlie@example.com' }
//     ];
// };
// app.get('/', async (req, res) => {
//    // Replace this with your database query
//     const connection = await dbConn
//     const users = await connection.query('SELECT * from students')
//     // console.log(users)
//     res.render('index', { users:users[0] });
// });


app.get('/student', (req, res) => {
    res.sendFile(__dirname + '/student.html');
});

// การให้แสดงไฟล์ ejs มันจะอ่านโฟลเดอร์ view เพื่อหาไฟล์ชื่อ students
app.get('/students', async (req,res) => {
    const connection = await dbConn
    const [rows] = await connection.query('SELECT * from students')
     
    //res.json(rows)
    //res.send(rows[0]) // ส่งแค่ข้อมูล เนื่องจากมีปัญหาด้านข้อมูล
    res.render('students', { students: rows });
})

// การเพิ่มข้อมูลจากการกรอกฟอร์มใน student.html
app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
 
    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')")
    //res.status(201).send(rows)
    res.status(201).send(`<h1 style="color:blue;"> คุณได้ทำการเพิ่มข้อมูลเรียบร้อยแล้ว จำนวน ${rows[0].affectedRows} แถว</h1>`)

 }) 
 
 


app.listen(3000, () => console.log('Server running on port 3000'));