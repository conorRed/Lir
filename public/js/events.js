function sendGET(url, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.response);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);
}

function passTemplate(docs){
  for(let i in docs){
    let pass = docs[i]
    $('#passes').find('ul').append('<li class="list-group-item">\
        <a href="#">From: '+pass.from+" To:"+ pass.to+"<br> Type: " + pass.type + " Area: "+pass.area+'</a></li>')
  }
}

function toggleSpin(docs){
  $("#spinner").css("display", "none")
  let docsJSON = JSON.parse(docs)
  passTemplate(docsJSON["pass"])
}

sendGET('/api/events/'+window.location.href.split('/')[window.location.href.split('/').length-1], toggleSpin)

document.getElementById('passes').addEventListener('click',function(event){
  if(event.target.tagName === 'I'){
    //get buttons form attr.
    event.preventDefault()
    let target = event.target.parentElement
    let form = target.form;
    doc = {}
    for(let i=0;i<form.elements.length;i++){
      let el = form.elements[i]
      doc[el.name] = el.value
    }
    let updateForm = $("#event-list-update-form")[0]
    let elements = updateForm.elements
    for(let i =0;i<elements.length;i++){
      if(elements[i].tagName !== "BUTTON"){
        updateForm[elements[i].name].value = doc[elements[i].name]
      }
    }
    console.log(doc)
  }
})
