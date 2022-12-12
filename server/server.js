/**
 * 서버 설정 먼저 해주세요
 * 참고 : https://to2.kr/d9o
 */
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");
const db = mysql.createPoolCluster();

const app = express();
const port = 4000;

app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

db.add("my_project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "my_project",
  port: 3306,
});

function 디비실행(query) {
  return new Promise(function (resolve, reject) {
    db.getConnection("my_project", function (error, connection) {
      if (error) {
        console.log("디비 연결 오류", error);
        reject(true);
      }

      connection.query(query, function (error, data) {
        if (error) {
          console.log("쿼리 오류", error);
          reject(true);
        }

        resolve(data);
      });

      connection.release();
    });
  });
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/autoLogin", (req, res) => {
  res.send(req.session.loginUser);
});

app.post("/login", async (req, res) => {
  const { id, pw } = req.body;

  const result = {
    code: "success",
    message: "로그인 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }

  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(
    `SELECT * FROM user WHERE id='${id}' AND password = '${pw}'`
  );

  if (user.length === 0) {
    result.code = "fail";
    result.message = "아이디가 존재하지 않습니다";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  req.session.loginUser = user[0];
  req.session.save();

  res.send(result);
});

app.post("/join", async (req, res) => {
  const { id, nickname, pw } = req.body;

  const result = {
    code: "success",
    message: "회원가입 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }

  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(`SELECT * FROM user WHERE id='${id}'`);

  if (user.length > 0) {
    result.code = "fail";
    result.message = "이미 동일한 아이디가 존재합니다";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  await 디비실행(
    `INSERT INTO user(id,password,nickname) VALUES('${id}','${pw}','${nickname}')`
  );

  res.send(result);
});

app.get("/detail", async (req, res) => {
  const { loginUser } = req.session;
  const { algorithmSeq } = req.query;

  const query = `SELECT * FROM ALGORITHM WHERE algorithm.user_seq = '${loginUser.seq}' AND algorithm.seq = '${algorithmSeq}'`;

  const detail = await 디비실행(query);
  res.send(detail);
});

app.get("/algorithm/:tagName", async (req, res) => {
  const { loginUser } = req.session;
  const { tagName } = req.query;

  const query = `SELECT * FROM ALGORITHM WHERE algorithm.user_seq = '${loginUser.seq}'`;
  const tagQuery = `SELECT * FROM ALGORITHM WHERE algorithm.user_seq = '${loginUser.seq}' AND algorithm.tag LIKE '%${tagName}%'`;

  if (tagName === "전체") {
    const algorithm = await 디비실행(query);
    res.send(algorithm);
  } else {
    const algorithm = await 디비실행(tagQuery);
    res.send(algorithm);
  }
});

app.get("/search", async (req, res) => {
  const { loginUser } = req.session;
  const { search } = req.query;

  const query = `SELECT * FROM ALGORITHM WHERE algorithm.user_seq = '${loginUser.seq}' AND algorithm.title LIKE '%${search}%'`;

  const algorithm = await 디비실행(query);
  res.send(algorithm);
});

app.get("/algorithm", async (req, res) => {
  const { loginUser } = req.session;
  const query = `SELECT * FROM ALGORITHM WHERE algorithm.user_seq = '${loginUser.seq}'`;

  const algorithm = await 디비실행(query);
  res.send(algorithm);
});

app.post("/algorithm", async (req, res) => {
  const { title, tag, link, level, content } = req.body;
  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "알고리즘 문제 생성 완료",
  };

  if (title === "") {
    result.code = "fail";
    result.message = "제목을 입력해주세요";
  }

  if (tag === "") {
    result.code = "fail";
    result.message = "태그를 입력해주세요";
  }

  if (link === "") {
    result.code = "fail";
    result.message = "문제 링크 입력해주세요";
  }

  if (level === "") {
    result.code = "fail";
    result.message = "난이도를 설정해주세요";
  }

  if (content === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  await 디비실행(
    `INSERT INTO algorithm(title,tag,link,level,content,user_seq) VALUES('${title}','${tag}','${link}','${level}','${content}','${loginUser.seq}')`
  );

  res.send(result);
});

app.listen(port, () => {
  console.log("서버가 실행되었습니다");
});
