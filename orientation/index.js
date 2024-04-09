let displayData = document.getElementById('displayData');

function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener("deviceorientation", handleOrientation,true);
                
                removeBtnPermission();
                return;

            }

            permissionDenied();
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
        window.addEventListener("deviceorientation", handleOrientation,true);
        
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
    
    

    setTimeout(() => {
        displayData.innerHTML = getInnerHTML(alpha, beta, gamma);
    }, 200);
    
    // `alpha ${alpha}\ngamma ${gamma}\nbeta ${beta}`
    console.log(event);
    // Do stuff with the new orientation data
}

function getInnerHTML(alpha, beta, gamma){
    // document.getElementById("displayData1").style.transform = `rotate(${-alpha}deg)`
    document.getElementById("displayData").style.transform = `rotate(${alpha}deg)`

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

// function handleMotion(event) {
//     // const absolute = event.absolute;
//     // const alpha = event.alpha;
//     // const beta = event.beta;
//     // const gamma = event.gamma;
    
//     console.log(event);
//     // Do stuff with the new orientation data
//   }

// window.addEventListener("devicemotion", handleMotion, true);


// update del