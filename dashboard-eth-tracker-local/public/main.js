const ethPrice = document.querySelector(".eth-price"),
      ethBtc = document.querySelector(".in-btc"),
      today = document.querySelector(".today"),
      time = document.querySelector(".time"),
      profitToday = document.querySelector(".profit-today"),
      profitWeekly = document.querySelector(".profit-weekly"),
      selection = document.querySelector("#time"),
      timers = document.querySelector(".timer"),
      edit = document.querySelectorAll(".each-con img"),
      inputAll = document.querySelectorAll(".each-con input"),
      divEachcon = document.querySelectorAll(".each-con div");

selection.addEventListener("change", (e) => {
      if (e.target.value == 0) {
            getEth(inputAll[0].value, inputAll[1].value, inputAll[2].value);
      } else if (e.target.value == 60) {
            for (let i = 1; i < 99999; i++) {
                  window.clearInterval(i);
            }

            const under1hour = () => {
                  getEth(
                        inputAll[0].value,
                        inputAll[1].value,
                        inputAll[2].value
                  );

                  let totalSeconds = 3600;

                  const timer = () => {
                        --totalSeconds;
                        if (totalSeconds == -1) {
                              clearInterval(counter);
                              return;
                        }
                        let hours = Math.floor(totalSeconds / 3600),
                              minutes = Math.floor((totalSeconds % 3600) / 60),
                              seconds = totalSeconds % 60;

                        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
                        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

                        timers.innerHTML = `${hours}:${minutes}:${seconds}`;
                  };
                  const counter = setInterval(timer, 1000);
            };
            under1hour();

            const under1 = setInterval(under1hour, 3600000);
      } else if (e.target.value == 12) {
            for (let i = 1; i < 99999; i++) {
                  window.clearInterval(i);
            }
            const under12hour = () => {
                  getEth(
                        inputAll[0].value,
                        inputAll[1].value,
                        inputAll[2].value
                  );

                  let totalSeconds = 43200;

                  const timer = () => {
                        --totalSeconds;
                        if (totalSeconds == -1) {
                              clearInterval(counter);
                              return;
                        }
                        let hours = Math.floor(totalSeconds / 3600),
                              minutes = Math.floor((totalSeconds % 3600) / 60),
                              seconds = totalSeconds % 60;

                        minutes = minutes < 10 ? `0${minutes}` : minutes;
                        seconds = seconds < 10 ? `0${seconds}` : seconds;

                        timers.innerHTML = `${hours}:${minutes}:${seconds}`;
                  };

                  const counter = setInterval(timer, 1000);
            };
            under12hour();

            setInterval(under12hour, 43200000);
      } else if (e.target.value == 24) {
            for (let i = 1; i < 99999; i++) {
                  window.clearInterval(i);
            }
            const under24hour = () => {
                  getEth(
                        inputAll[0].value,
                        inputAll[1].value,
                        inputAll[2].value
                  );

                  let totalSeconds = 86400;

                  const timer = () => {
                        --totalSeconds;
                        if (totalSeconds == -1) {
                              clearInterval(counter);
                              return;
                        }
                        let hours = Math.floor(totalSeconds / 3600),
                              minutes = Math.floor((totalSeconds % 3600) / 60),
                              seconds = totalSeconds % 60;

                        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
                        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

                        timers.innerHTML = `${hours}:${minutes}:${seconds}`;
                  };

                  const counter = setInterval(timer, 1000);
            };
            under24hour();

            setInterval(under24hour, 86400000);
      }
});

const date = new Date();

let pm = date.getHours() < 12 ? "AM" : "PM";
today.innerHTML = `${date.toString().split(" ").splice(0, 4).join(" ")}`;
time.innerHTML = `${date.getHours()}:${date.getMinutes()} ${pm}`;

const aud = new Audio("you_suffer.mp3");

const options = {
      methods: 'GET',
}

async function getEthData(hash, kw, pow, opt, n) {
      try {
            const res = await fetch(`http://localhost:5000/api/name=ethereum&hashrate=${hash}&power=${pow}&poolfee=0&powercost=${kw}`,opt,n)
            const data = await res.json()
            return data

      } catch (err) {
            if(n === 1) throw err
            const res = await fetch(`http://localhost:5000/api/name=ethereum&hashrate=${hash}&power=${pow}&poolfee=0&powercost=${kw}`,opt,n)
            const data = await res.json()
            return data


      }

}
const getEth = async (hash, kw, pow) => {
      try {

            // using cor anywere
            // let res = await fetch(`https://corsanywhere.herokuapp.com/https://www.coincalculators.io/api?name=ethereum&hashrate=${hash}&power=${pow}&poolfee=0&powercost=${kw}`)

            // using manual cor config file appjs
            const data = await getEthData(hash,kw,pow,options,5)

            console.log(data)

            let res2 = await fetch(
                  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/myr.json"
            );
            let data2 = await res2.json();

            const [a, b] = await Promise.all([data, data2]);

            const prToday = (a.profitInDayUSD * b.myr).toFixed(2),
                  prWeekly = (a.profitInWeekUSD * b.myr).toFixed(2);

            ethPrice.innerHTML = `ETH Price:${(a.price_usd * b.myr).toFixed(2)}`;
            ethBtc.innerHTML = `ETH/BTC:${a.price_btc.toFixed(1)}BTC`;
            profitToday.innerHTML = `Profit-today:RM<span class="change">${prToday}</span>`;
            profitWeekly.innerHTML = `Profit-Weekly:RM<span class="change">${prWeekly}</span>`;

            const allPrv = document.querySelectorAll(".change");


            prToday > 0 ? allPrv.forEach((eachone) => {
                  eachone.style.color = "green";
                  eachone.style.fontSize = "22px";
            }) : allPrv.forEach((eachone) => (eachone.style.color = "red"));

            prToday > 0
                  ? document.querySelector(".profitable").classList.toggle("dis") && document.querySelector(".not-profit").classList.toggle("not-display") : true

            prToday < 0
                  ?
                  document.querySelector(".not-profit").classList.toggle("dis") &&
                  document.querySelector(".profitable").classList.toggle("not-display")
                  &&
                  document.querySelector(".profitable").classList.remove(".dis")
                  : false

            if ((a.profitInDayUSD * b.myr).toFixed(2) > 0) {
                  await aud.play();
            }


      } catch (error) {
            throw error
      }
};

//input editable

for (let i = 0; i < edit.length; i++) {
      edit[i].addEventListener("click", (e) => {
            inputAll[i].style.display = "block";
            divEachcon[i].innerHTML = "";

            inputAll[i].addEventListener("keypress", (e) => {
                  if (e.key === "Enter" && inputAll[i].value != "") {
                        getEth(
                              inputAll[i].value == inputAll[0].value
                                    ? inputAll[i].value
                                    : inputAll[0].value || divEachcon[0].value,
                              (inputAll[i].value == inputAll[1].value
                                    ? inputAll[i].value
                                    : inputAll[1].value) || divEachcon[1].value,
                              (inputAll[i].value == inputAll[2].value
                                    ? inputAll[i].value
                                    : inputAll[2].value) || divEachcon[2].value
                        );
                  }
            });

            window.addEventListener("click", (e) => {
                  if (
                        e.target != inputAll[i] &&
                        inputAll[i].style.display == "block" &&
                        e.target != edit[i]
                  ) {
                        inputAll[i].style.display = "none";

                        divEachcon[i] === divEachcon[0]
                              ? (divEachcon[
                                    i
                              ].innerHTML = `Hashrate:${inputAll[i].value}h/s`)
                              : NaN;
                        divEachcon[i] === divEachcon[1]
                              ? (divEachcon[
                                    i
                              ].innerHTML = `KW Cost:${inputAll[i].value}kw/h`)
                              : NaN;
                        divEachcon[i] === divEachcon[2]
                              ? (divEachcon[
                                    i
                              ].innerHTML = `Power:${inputAll[i].value}kw/h`)
                              : NaN;
                  }
            });
      });
}

getEth(inputAll[0].value, inputAll[1].value, inputAll[2].value);
