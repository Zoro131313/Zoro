function toRoman(num) {
    if (num < 1 || num > 100) {
      return ; 
    }
    const romanMap = {
      
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
  
    let result = '';
    for (let key in romanMap) {
      while (num >= romanMap[key]) {
        result += key;
        num -= romanMap[key];
      }
    }
    return result;
  }



function createNumber() {
    const number = Math.floor(Math.random() * 100);
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.style.position = 'absolute';
  
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    let angle = Math.random() * 360;
    const angularVelocity = 0.2 + Math.random() * 0.9;
  
    let x, y;
    let foundPosition = false;
  
    while (!foundPosition) {
      angle = Math.random() * 360; 
      x = centerX + radius * Math.cos(angle * Math.PI / 180);
      y = centerY + radius * Math.sin(angle * Math.PI / 180);
  
      const overlaps = Array.from(document.getElementsByClassName('number')).some(el => {
        const rect1 = {
          left: x,
          top: y,
          right: x + numberElement.offsetWidth,
          bottom: y + numberElement.offsetHeight,
        };
        const rect2 = el.getBoundingClientRect();
        return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
      });
  
      if (!overlaps) {
        foundPosition = true;
      }


      const useRoman = Math.random() < 0.5; 

        const numberText = document.createElement('div');
        numberText.textContent = useRoman ? toRoman(number) : number; 
        numberText.style.position = 'absolute';
        numberText.style.textAlign = 'center';
        numberText.style.width = '100%';
        numberText.style.height = '100%';
        numberText.style.lineHeight = '100%';
        numberText.style.fontSize = '0.8em';
        numberText.style.color = 'white';
        numberText.style.zIndex = '10';
        numberElement.appendChild(numberText);
      
      const button = document.createElement('button');
      button.style.position = 'absolute';
      button.style.width = '50px';
      button.style.height = '50px';
      button.style.opacity = 0;
      button.style.border = 'none';
      button.style.background = 'rgba(255, 255, 255, 0.5)';
      button.style.cursor = 'pointer';
      button.style.left = '50%';
      button.style.top = '50%';
      button.style.transform = 'translate(-50%, -50%)';
      button.textContent = '';

      const messageContainer = document.getElementById('message-container');
      button.addEventListener('click', () => {
        // alert('SjExSThLNUo');
          messageContainer.style.display = 'block';
      });
    
      document.body.appendChild(button);

}
  
  
    function animate() {
      angle += angularVelocity;
      x = centerX + radius * Math.cos(angle * Math.PI / 180);
      y = centerY + radius * Math.sin(angle * Math.PI / 180);
      numberElement.style.left = x + 'px';
      numberElement.style.top = y + 'px';
      requestAnimationFrame(animate);
      button.style.left = x + 'px';
      button.style.top = y + 'px';
  
      requestAnimationFrame(animate);
    }
  
    numberElement.style.left = x + 10 +'px';
    numberElement.style.top = y + 10 + 'px';
    document.body.appendChild(numberElement);
    animate();
  
    setTimeout(() => {
      document.body.removeChild(numberElement);
    }, 1500);
  }
  
  setInterval(createNumber, 1500);




  const countdownElement = document.getElementById('countdown');
  let timeLeft = 6 * 60 * 60;
  
  function updateCountdown() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    countdownElement.textContent = formattedTime;
  
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(updateCountdown, 1000);
    } else {
      countdownElement.textContent = "Time's up!";
    }
  }
  
  updateCountdown();



  

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 4;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.dataset.startX = star.style.left;
    star.dataset.startY = star.style.top;
    document.body.appendChild(star);
    return star;
}

const numStars = 200;
const stars = [];
for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
}

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const speed = 0.2; 

setInterval(() => {
    stars.forEach(star => {
        let x = parseFloat(star.style.left);
        let y = parseFloat(star.style.top);

        const dx = centerX - x;
        const dy = centerY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = distance === 0 ? 0 : dx / distance * speed;
        const normalizedDy = distance === 0 ? 0 : dy / distance * speed;
        star.style.left = (x + normalizedDx) + 'px';
        star.style.top = (y + normalizedDy) + 'px';

        if (distance < 5) {
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
        }
    });
}, 20);
