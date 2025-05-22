const links = [
  "https://m.indiamart.com/impcat/washing-ball.html?utm_source=insta_show2.0&utm_medium=affiliate&utm_campaign=0525&utm_content=9",
  "https://m.indiamart.com/proddetail/23456124662.html?utm_source=picksby_me_&utm_medium=affiliate&utm_campaign=0425&utm_content=41",
  "https://m.indiamart.com/proddetail/26269935273.html?utm_source=picksby_me_&utm_medium=affiliate&utm_campaign=0425&utm_content=45",
  "https://www.profitableratecpm.com/mwbg7v2g0r?key=c6aaa3a2635e2ddc891a9c145928f823"
];

let qr;

window.onload = function () {
  qr = new QRious({
    element: document.getElementById('qrcode'),
    size: 128,
    value: ''
  });
};

function animateDigits(number) {
  const digits = number.split('');
  digits.forEach((digit, index) => {
    setTimeout(() => {
      const el = document.getElementById('d' + index);
      el.textContent = digit;
      el.classList.add('visible');
    }, index === 0 ? 200 : index * 1250);
  });
  setTimeout(() => {
    qr.set({ value: number });
  }, 5000);
}

function generateNumber() {
  const digits = ['d0', 'd1', 'd2', 'd3'];
  digits.forEach(id => {
    const el = document.getElementById(id);
    el.textContent = '-';
    el.classList.remove('visible');
  });
  let num = Math.floor(10000 * Math.random()).toString().padStart(4, "0");
  animateDigits(num);
}

function handleClick() {
  const now = Date.now();
  const lastTime = parseInt(localStorage.getItem("lastClickTime") || "0");
  const diff = now - lastTime;

  if (diff > 180000) {
    localStorage.setItem("clickCount", "0");
  }

  let count = parseInt(localStorage.getItem("clickCount") || "0") + 1;
  localStorage.setItem("clickCount", count.toString());
  localStorage.setItem("lastClickTime", now.toString());

  if ([1, 3, 5, 7].includes(count)) {
    generateNumber();
  } else if ([2, 4, 6].includes(count)) {
    window.location.href = links[(count / 2) - 1];
  } else {
    window.location.href = links[3]; // Adsterra
  }
}