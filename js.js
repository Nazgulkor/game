const container = document.querySelector('.container');
const gameOver = document.querySelector('.game-over');


let  positionX;
let positionY = container.getBoundingClientRect().bottom - 80;




let positionForEnemy = container.clientWidth;
console.log(positionForEnemy)

let colors = [
    'A',
    'B',
    'C',
    'D',
    'F',
    'E',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
];


let bullets = Array.from(document.querySelectorAll('.bullet'));
let enemys = Array.from(document.querySelectorAll('.enemy'));









function createEmeny(){
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.cssText = `
        top : 0;
        left : ${Math.floor(Math.random() * positionForEnemy)}px;
    `;
    container.append(enemy);
    enemys = Array.from(document.querySelectorAll('.enemy'));
    function moveEnemy(){
        enemy.style.top = parseInt(enemy.style.top) + 1 + 'px';
        if(enemy.getBoundingClientRect().top >= container.getBoundingClientRect().bottom){
            delete enemys[enemy];
            enemy.remove();
            gameOver.classList.add('game-over-active')
        }
        enemys.forEach(enem => {
            bullets.forEach(bull => {
                if(enem.getBoundingClientRect().bottom >= bull.getBoundingClientRect().top && enem.getBoundingClientRect().left <= bull.getBoundingClientRect().left && enem.getBoundingClientRect().right >= bull.getBoundingClientRect().right){
                    enem.remove();
                }
            })
        })
    }
    setInterval(moveEnemy, 0.5);
}
setInterval(createEmeny, 1000);
function generateColor(arr){
    let color = '#';
    for(let i = 0; i != 6; i++){
        color += arr[Math.floor(Math.random() * arr.length)]
    }
    
    return color
}


window.addEventListener('resize', (e) => {
    positionY = container.getBoundingClientRect().bottom - 80;
    positionForEnemy = container.clientWidth;
})


container.addEventListener('mousemove', event => {
    function getPosition(){
        positionX = event.clientX;
        
    }
    requestAnimationFrame(getPosition)
})

container.addEventListener('click', (e) => {
    
    let bullet = document.createElement('div');
    bullet.classList.add('bullet');
    let generatedColor = generateColor(colors)
    bullet.style.cssText = `
        top : ${positionY}px;
        left : ${positionX}px;
        background-color: ${generatedColor};
    `;   
    container.append(bullet);
    bullets = Array.from(document.querySelectorAll('.bullet'));


    let ret = parseInt(bullet.style.top);
    
    function moveBullet(){
        ret = ret - 1;
        bullet.style.top = ret + 'px';
        if(bullet.getBoundingClientRect().bottom <= 0){
            let index = bullets.indexOf(bullet)
            delete bullets[index];
            bullet.remove();
        }
    }
    setInterval(moveBullet, 0.1);
    

})


