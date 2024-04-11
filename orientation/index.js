let displayData = document.getElementById('displayData');
let displayDataGyro = document.getElementById('gyro');
let displayDataAcc = document.getElementById('acc');
let displayDataAccG = document.getElementById('accG');

function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener("deviceorientation", handleOrientation,true);

                // window.addEventListener("devicemotion", handleMotion,true);

                
                removeBtnPermission();
                return;

            }

            permissionDenied();
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
        window.addEventListener("deviceorientation", handleOrientation,true);
        window.removeEventListener("devicemotion", handleMotion,true);
        
        removeBtnPermission();
        return;

    }

}
    

function removeBtnPermission(){
    document.getElementById("btnPermission").remove()
}

function permissionDenied(){
    displayData.innerText = "Please give permission to get sensor data."
}

function handleOrientation(event) {
    const absolute = event.absolute;
    const alpha = Math.round(Number(event.alpha));
    const beta = Math.round(Number(event.beta));
    const gamma = Math.round(Number(event.gamma));
    
    const compHead = event.webkitCompassHeading;
    const compAcc = event.webkitcompassaccuracy;

    setTimeout(() => {
        displayData.innerHTML = getInnerHTML(alpha, beta, gamma);

        displayDataGyro.innerText = `compHead ${compHead}; compAcc ${compAcc}`
    }, 200);
    
    // `alpha ${alpha}\ngamma ${gamma}\nbeta ${beta}`
    console.log(event);
    // Do stuff with the new orientation data
}


function handleMotion(event){
    console.log("ok");
    // including gravity
    let accelerationGX = event.accelerationIncludingGravity.x
    let accelerationGY = event.accelerationIncludingGravity.y
    let accelerationGZ = event.accelerationIncludingGravity.z

    let accelerationX = event.acceleration.x
    let accelerationY = event.acceleration.y
    let accelerationZ = event.acceleration.z
    
    // gyro
    let gyroX = event.rotationRate.alpha
    let gyroY = event.rotationRate.beta
    let gyroZ = event.rotationRate.gamma
    

    setTimeout(() => {
        displayDataAcc.innerHTML = createHTML(accelerationX, accelerationY, accelerationZ)
        
        displayDataAccG.innerHTML = createHTML(accelerationGX, accelerationGY, accelerationGZ)
        
        displayDataGyro.innerHTML = createHTML(gyroX, gyroY, gyroZ)

    }, 5000);

}

function getInnerHTML(alpha, beta, gamma){
    // document.getElementById("displayData1").style.transform = `rotate(${-alpha}deg)`
    document.getElementById("displayData").style.transform = `rotate(${beta}deg)`

    return `<div>
                <span class="dataName">
                    Alpha
                </span>
                <span class="data">${alpha}</span>
            </div>
            <div>
            <span class="dataName">
                Beta
            </span>
            <span class="data">${beta}</span>
        </div>
        <div>
        <span class="dataName">
            Gamma
        </span>
        <span class="data">${gamma}</span>
    </div>`
}


function createHTML(alpha, beta, gamma){
    // document.getElementById("displayData1").style.transform = `rotate(${-alpha}deg)`
    // document.getElementById("displayData").style.transform = `rotate(${alpha}deg)`

    alpha = Math.round(alpha)
    beta = Math.round(beta)
    gamma = Math.round(gamma)
    return `<div>
                <span class="dataName">
                    X
                </span>
                <span class="data">${alpha}</span>
            </div>
            <div>
            <span class="dataName">
                Y
            </span>
            <span class="data">${beta}</span>
        </div>
        <div>
        <span class="dataName">
            Z
        </span>
        <span class="data">${gamma}</span>
    </div>`
}



// function test(){

//     if (
//         DeviceMotionEvent &&
//         typeof DeviceMotionEvent.requestPermission === "function"
//     ) {
//         DeviceMotionEvent.requestPermission();
//     }

//     if (is_running){
//         window.removeEventListener("devicemotion", handleMotion);
//         window.removeEventListener("deviceorientation", handleOrientation);
//         demo_button.innerHTML = "Start demo";
//         demo_button.classList.add('btn-success');
//         demo_button.classList.remove('btn-danger');
//         is_running = false;
//       }else{
//         window.addEventListener("devicemotion", handleMotion);
//         window.addEventListener("deviceorientation", handleOrientation);
//         document.getElementById("start_demo").innerHTML = "Stop demo";
//         demo_button.classList.remove('btn-success');
//         demo_button.classList.add('btn-danger');
//         is_running = true;
//       }
// }
