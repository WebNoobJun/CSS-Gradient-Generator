const content = document.querySelector('.content');
const nameSite = document.querySelector('.name_site');
const inputColor1 = document.getElementById('input_color_1');
const inputColor2 = document.getElementById('input_color_2');
const btnDeg = document.querySelectorAll('.btn_direction');
const btnStyle = document.querySelectorAll('.style_btn_js');

window.onload = function(){
  randomColor()
}

function randomColor(){
  const letters = '0123456789ABCDEF';
  let randomColor1 = '#';
  let randomColor2 = '#';

  for (let i = 0; i < 6; i++) {
    randomColor1 += letters[Math.floor(Math.random() * 16)];
  }
  for (let i = 0; i < 6; i++) {
    randomColor2 += letters[Math.floor(Math.random() * 16)];
  }

  inputColor1.setAttribute('value', randomColor1);
  inputColor2.setAttribute('value', randomColor2);

  inputColor();
}

console.log(inputColor1.value, inputColor2.value);

let styleGradient = 'linear';
btnStyle.forEach(btn => {
  btn.onclick = function(){
    styleGradient = btn.getAttribute('data-style');
    inputColor();
    if(btn.textContent == 'Radial'){
      document.querySelector('.hide').classList.add('vise');
    } else {
      document.querySelector('.hide').classList.remove('vise');
    }
  }
});

let deg = 0;
let radial = 'at top center';

btnDeg.forEach(btn => {
  btn.onclick = function(){
    deg = btn.getAttribute('data-deg');
    radial = btn.getAttribute('data-radial');
    inputColor();
  }
});

function inputColor(){
  content.style.background = `linear-gradient(${deg}deg, ${inputColor1.value}, ${inputColor2.value})`;

  if(styleGradient == 'radial'){
    content.style.background = `radial-gradient(${radial}, ${inputColor1.value}, ${inputColor2.value})`;
  }

  if(styleGradient == 'conic'){
    content.style.background = `conic-gradient(from ${deg}deg, ${inputColor1.value}, ${inputColor2.value})`;
  }

  document.documentElement.style.setProperty('--color-js1', inputColor1.value);
  document.documentElement.style.setProperty('--color-js2', inputColor2.value);
}


document.querySelector('.btn-primary').onclick = function(){
  var clipboard = navigator.clipboard;

  if(styleGradient == 'linear'){
    clipboard.writeText(`background: ${inputColor1.value};` + '\n' + `background: ${styleGradient}-gradient(${deg}deg, ${inputColor1.value}, ${inputColor2.value};`)
  }
  if(styleGradient == 'radial'){
    clipboard.writeText(`background: ${inputColor1.value};` + '\n' + `background: ${styleGradient}-gradient(${radial}, ${inputColor1.value}, ${inputColor2.value};`)
  }
  if(styleGradient == 'conic'){
    clipboard.writeText(`background: ${inputColor1.value};` + '\n' + `background: ${styleGradient}-gradient(from ${deg}deg, ${inputColor1.value}, ${inputColor2.value});`)
  }
  let completed = setTimeout(() => {
    this.textContent = 'Copied to Clipboard!';
  }, 0);

  setTimeout(() => {
    clearInterval(completed);
    this.textContent = 'Get CSS'
  }, 1000);
}
