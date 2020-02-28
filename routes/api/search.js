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
  console.log("I got a request!");
  // console.log(request);
  data = request.body;
  console.log(data);
  // const url = new URL('http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=showGrid');
  const url =
    "http://cos1.ntnu.edu.tw/AasEnrollStudent/CourseQueryCtrl?action=showGrid";
  // url.search = new URLSearchParams(data).toString();
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
      Cookie: `JSESSIONID=${process.env.MAGIC}`
    },
    body: queryString.stringify(data)
  };
  try {
        const fetch_response = await fetch(url, options);
        fetch_response.type = "basic";
        // console.log("fetch_response", fetch_response);
        const text = await fetch_response.text();
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
        const res = JSON.parse(text.replace(/(')(?![a-z] )/g, "\""));
        // const rr = await fetch_response.json();

        // console.log('rr', rr)
        response.json(res["List"]);
      } catch (error) {
    console.log(error);
    response.json({ err: error });
  }
});

module.exports = router;