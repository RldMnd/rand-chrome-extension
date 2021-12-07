let btn=document.getElementById("startButton");
let data=document.getElementById("data");

btn.addEventListener("click",
    function (event) {        
        console.log("Sup! 3");
        chrome.cookies.getAll(
            {domain:".kinopoisk.ru",
        name:"PHPSESSID"},
            function (cookies) {
                console.log(cookies);
                data.textContent=cookies.length;
                cookies.forEach(element => {
                    data.textContent=element.name;
                });
            });
        }
      );