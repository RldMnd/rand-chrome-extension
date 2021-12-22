let btn=document.getElementById("startButton");
let dataDiv=document.getElementById("data");
let cooStr="";
const fields="desktop_session_key:desktop_session_key.sig:user-geo-region-id:user-geo-country-id:gdpr:yandexuid:yuidss:PHPSESSID:yandex_gid:_csrf_csrf_token:_csrf:location:mda_exp_enabled:mustsee_sort_v5:yandex_login:uid:_ym_uid:mykp_button:mustseeFormat:my_perpages:i:crookie:cmtchd:ys:yp:ymex:user_country:tc:mobile:ya_sess_id:mda2_beacon:yandex_plus_metrika_cookie:_ym_isad:sso_status:_ym_visorc:_ym_d";
let fieldsArr=[];

btn.addEventListener("click",
    function (event) {
        fieldsArr=fields.split(":");
        chrome.cookies.getAll(
            {
                domain:".kinopoisk.ru"
            },
            function (cookies) {
                dataDiv.textContent=`Всего куков ${cookies.length}`;
                cookies=cookies.filter(el=>fieldsArr.indexOf(el.name)>-1);
                cookies=cookies.map(el=>`${el.name}=${el.value}`);
                cooStr=cookies.join(";");
        
                fetch('https://www.kinopoisk.ru/mykp/movies/list/type/3575/sort/default/vector/asc/vt/all/perpage/200/page/1/', {headers: {cookie: cooStr}})
                    .then(response => {
                        if (!response.ok) {
                            console.log("Fetch err");
                          }
                          return response.text();
                    })
                    .then(data => 
                        {
                            let re=/<a href="\/(film|series)\/\d+\/">.+/g;
                            const array = [...data.matchAll(re)];
                            let ind=Math.round(Math.random()*array.length);
                            console.log(array[ind]);
                            dataDiv.innerHTML=array[ind][0];
                            dataDiv.firstElementChild.target="_blank";
                            dataDiv.firstElementChild.href="https://www.kinopoisk.ru"+dataDiv.firstElementChild.pathname;

                            let o=3;
                        }
                        );
                console.log(cooStr);
            });
        }
      );