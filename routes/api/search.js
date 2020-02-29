const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const queryString = require("query-string");

router.post("/post", async (request, response) => {
  console.log("I got a request!");
  // console.log(request);
  data = request.body;
  const url = new URL(
    "http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/CofopdlCtrl"
  );
  url.search = new URLSearchParams(data).toString();

  try {
    const fetch_response = await fetch(url);
    fetch_response.type = "basic";
    const rr = await fetch_response.json();
    response.json(rr["List"]);
  } catch (error) {
    response.json({ err: error });
  }
});

router.post("/query", async (request, response) => {
  console.log("I got a request!  To search course");
  // console.log(request);
  data = request.body;
  console.log("data", data);
  // const url = new URL('http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=showGrid');
  const url =
    "http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=showGrid";
  // url.search = new URLSearchParams(data).toString();
  const cookieNum = 10
  const cookies = [
    process.env.MAGIC,
    process.env.MAGIC1,
    process.env.MAGIC2,
    process.env.MAGIC3,
    process.env.MAGIC4,
    process.env.MAGIC5,
    process.env.MAGIC6,
    process.env.MAGIC7,
    process.env.MAGIC8,
    process.env.MAGIC9
  ];
  const step = [1,3,7,9]
  const random = Math.floor(Math.random() * cookieNum);
  const randomStep = Math.floor(Math.random() * 4);
  
  let test = 0;
  while (test < cookieNum) {
    console.log("channel", (random + step[randomStep] * test) % cookieNum);
    const options = {
      method: "POST",
      headers: {
        Host: "cos1.ntnu.edu.tw",
        Connection: "keep-alive",
        "Content-Length": JSON.stringify(data).length.toString(),
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
        Origin: "http://cos1.ntnu.edu.tw",
        Referer:
          "http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=query",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
        // "Cookie": 'JSESSIONID=lRphp27V0ym260yprwhYJXvZqp7vyzlrysypTrsPHj2ylHpKzwdz!407899233'
        Cookie: `JSESSIONID=${cookies[(random + step[randomStep]*test) % cookieNum]}`
      },
      body: queryString.stringify(data)
    };
    test += 1;
    try {
      const fetch_response = await fetch(url, options);
      fetch_response.type = "basic";
      // console.log("fetch_response", fetch_response);
      // console.log("text", text[21466]);
      // console.log("text", text[21467]);
      // console.log("text", text[21468]);
      // console.log("text", text);
      // if(text[0]=="{"){
      //   text = "["+text+"]"
      //   console.log(text)
      // }

      // console.log("text", JSON.parse(text.replace(/(')(?!s )/g, "\"")));
      // const res = JSON.parse(text.replace(/'/g, '"'));
      // const res = JSON.parse(text.replace(/(')(?![a-z] )/g, '"'));
      // const resText = await JSON.stringify(text);
      // const res = await JSON.parse(resText);
      // const rr = await fetch_response.json();
      // console.log(res);
      // console.log('rr', rr)
      // response.json(res["List"]);
      const text = await fetch_response.text();
      try {
        const json = JSON.parse(text);
        response.json(json["List"]);
        return
      } catch (error) {
        console.log("got Json error");
        console.log("text", text);
        console.log(error);
        const res = JSON.parse(text.replace(/(')(?![a-z] )/g, '"'));
        response.json(res["List"]);
        return;
      }
      
    } catch (error) {
      console.log(error);
      if(test == cookieNum){
        response.json({ err: error });
        return;
      }
      // response.json({ err: error });
    }
  }
  
});

module.exports = router;