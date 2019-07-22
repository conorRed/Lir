var events = ["pass"]

function sendGET(url){
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.onreadystatechange = () => { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        resolve(xmlHttp.response)
    }
    xmlHttp.onerror = () => {
      reject(xmlHttp.statusText)
    }
    xmlHttp.send(null);
  })
}

function download_csv() {
    sendGET('/api/events/'+window.location.href.split('/')[window.location.href.split('/').length-1])
    .then((docs) => {
      let jsonResponse = JSON.parse(docs)
      let csv = ''
      for(let index in events){
        let eventName = events[index]
        csv += Object.keys(jsonResponse[eventName][0]).join(',')
        jsonResponse[eventName].forEach(function(el){
          csv += Object.values(el).join(',')
          csv += "\n";
        })
      }
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'stats.csv';
      document.body.appendChild(hiddenElement)
      hiddenElement.click();
      document.body.removeChild(hiddenElement)
    })
    .catch((err) => {
      console.log(err)
    })
}

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


$(document).ready(function(){
  $("#export").on("click", function(){
    download_csv()
  })
})
