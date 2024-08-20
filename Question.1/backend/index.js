const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");
const e = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const session = require("express-session");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { profile } = require("console");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

const dbConfig = {
  user: "sa",
  password: "12345678",
  server: "MSI\\SQLEXPRESS",
  database: "MyDb",
};

const mongoURI = "mongodb://localhost:27017/myMongoDb";




// sql
//   .connect(dbConfig)
//   .then(() => {
//     console.log("connected to database");
//   })
//   .catch((err) => {
//     console.log("failed to connect databse", err);
//   });

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("MongoDB connected successfully");
  }).catch(err => {
    console.error("MongoDB connection error:", err);
  });
  



const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "uploads");
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});


app.post("/api/users", upload.single("document"), async (req, res) => {
  const { name, email, age, department, gender } = req.body;
  const documentName = req.file.filename;
  const documentPath = req.file.path;
  const userId = req.session.userId;
  try {
    const request = new sql.Request();
    await request.query(`
      INSERT INTO Users(Name,Email,Age,Department,Gender,DocumentName,DocumentPath,StaffId) VALUES ('${name}','${email}','${age}','${department}','${gender}','${documentName}','${documentPath}','${userId}')`);



    const userMailOptions = {
      from: "chaitanyaraut2137@gmail.com",
      to: email,
      subject: "Form Submission Confirmation",
      text: "Your form has submitted successfully.........................",
    };



    const adminMailOptions = {
      from: "chaitanyaraut2137@gmail.com",
      to: "chaitanyaraut2137@gmail.com",
      subject: "New Form Submission",
      text: `A new form has been submitted by ${name} and their department is ${department}`,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).send("user data added and email send......");
  } catch (error) {
    console.log("error submitting form data", error);
    res.status(500).send("error submitting form data");
  }
});


app.get("/api/users", async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).send("User not authenticated....");
  }

  try {
    const { userId } = req.session;
    const request = new sql.Request();
    const result = await request.query(
      `SELECT * FROM Users WHERE StaffId = ${userId}`
    );
    const usersWithDocumentURLs = result.recordset.map((user) => {
      return {
        ...user,
        documentURL: `${req.protocol}:// ${req.get("host")}/${
          user.documentName
        }`,
      };
    });
    res.status(200).json(usersWithDocumentURLs);
  } catch (error) {
    console.log("error fetching users data", error);
    res.status(500).send("error fetching users data");
  }
});

app.delete("/api/userdelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const request = new sql.Request();
    await request.query(`DELETE FROM Users WHERE Id = ${id}`);
    res.status(200).send("User data deleted successfully");
  } catch (error) {
    console.log("Error deleting user data", error);
    res.status(500).send("Error deleting user data");
  }
});


app.put("/api/users/:id", upload.single("document"), async (req, res) => {
  const { id } = req.params;
  const { name, email, department, age, gender } = req.body;
  const documentPath = req.file ? req.file.path : null;
  const documentName = req.file ? req.file.originalname : null;

  try {
    const request = new sql.Request();
    await request.query(`
      UPDATE Users SET Name = '${name}',Email = '${email}', Age = ${age}, Department = '${department}', Gender = '${gender}',DocumentPath = '${documentPath}',DocumentName='${documentName}' WHERE  Id = '${id}'`);
    res.status(200).send("user data updated successfully");
  } catch (error) {
    console.log("error updating user data", error);
    res.status(500).send("error updating user data");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const request = new sql.Request();
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password);
    const result = await request.query(
      `SELECT * FROM Userlog WHERE email = @email AND password = @password`
    );

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      req.session.userId = user.id;
      const userId = user.id;
      const updateResult = await request.query(
        `UPDATE Userlog SET loggedtime=GETDATE() WHERE id = ${userId}`
      );
      console.log("Session established", req.session);
      res
        .status(200)
        .json({ success: true, message: "Login successful", userId: user.id });
    } else {
      res
        .status(401)
        .send({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send({ success: false, message: "Server error" });
  }
});


app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser =
      await sql.query`SELECT * FROM Userlog WHERE email = ${email}`;
    if (existingUser.recordset.length > 0) {
      return res
        .status(409)
        .send({ success: false, message: "email already exist" });
    }

    await sql.query`INSERT INTO Userlog(email,password) VALUES (${email},${password})`;
    res.status(200).send({ success: true, message: "signup successful..." });
  } catch (error) {
    console.log("we have error");
    res.status(500).send({ success: false, message: "server error" });
  }
});

app.get("/api/downloads/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const request = new sql.Request();
    const result = await request.query(
      `SELECT DocumentPath FROM Users WHERE Id = ${id}`
    );
    if (result.recordset.length > 0) {
      const documentPath = result.recordset[0].DocumentPath;
      res.download(documentPath);
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    console.log("Error fetching documents", error);
    res.status(500).send("Document not found");
  }
});

app.get("/api/profile", async (req, res) => {
  if (!req.session.userId) {
    console.log("session not found", req.session);
    return res
      .status(401)
      .send({ success: false, message: "not authenticated" });
  }
  try {
    const result =
      await sql.query`SELECT email,password FROM Userlog WHERE id = ${req.session.userId}`;
    if (result.recordset.length > 0) {
      res.status(200).send({ success: true, profile: result.recordset[0] });
    } else {
      res.status(401).send({ success: false, message: "user not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.post("/api/logout", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res
        .status(400)
        .json({ success: false, message: "No user logged  in" });
    }

    const userId = req.session.userId;
    const request = new sql.Request();
    request.input("userId", sql.Int, userId);
    await request.query(
      `UPDATE Userlog SET logouttime = GETDATE() WHERE Id = @userId`
    );

    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "failed to log out ..." });
      }

      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.log("error during logout", error);
    res.status(500).json({ success: false, message: "internal server error " });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
