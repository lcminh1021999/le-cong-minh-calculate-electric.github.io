let getElement = (element) =>{
    return document.querySelector(element);
}

 let getEvent = (event, element, callback) => {
    getElement(element).addEventListener(event, (e) =>{
        callback(e);
    })
}

