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

function editEvent(id){
  $('#pass-' + id+' span').css("display", "none")
  $('#pass-' + id+' select').css("display", "inline")
  $('#cancel-pass-btn-'+id).css("display", "inline")
  $('#update-pass-btn-'+id).css("display", "inline")
  $('#edit-pass-btn-'+id).css("display", "none")
  $('#remove-pass-'+id).css("display", "none")
}

function cancelEdit(id){
  $('#pass-' + id+' span').css("display", "inline")
  $('#pass-' + id+' select').css("display", "none")
  $('#cancel-pass-btn-'+id).css("display", "none")
  $('#update-pass-btn-'+id).css("display", "none")
  $('#edit-pass-btn-'+id).css("display", "inline")
  $('#remove-pass-'+id).css("display", "inline")
}

$(document).ready(function(){
  $("#export").on("click", function(){
    download_csv()
  })
})

let selectNumbers = `
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
  `

let html =`
  <form style="display:inline;" class="inline" type="hidden" id="edit-pass-<%=pass.id%>">
    <td>
      <select class="browser-default form-control" name="from"> `
          +selectNumbers+
        `</select>
    </td>
    <td>
      <select class="browser-default form-control" name="to"> `
          +selectNumbers+
        `</select>
    </td>
    <td>
      <div class="form-group">
        <select class="browser-default form-control" name="outcome">
          <option value="Lateral">Lateral</option>
          <option value="Forward">Forward</option>
          <option value="Back">Back</option>
          <option value="Turnover">Turnover</option>
          <option value="Score">Score</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </td>
    <td>
      <select class="browser-default form-control" name="type">
        <option value="Foot">Foot</option>
        <option value="Hand">Hand</option>
      </select>
    </td>
    <td>
      <select class="browser-default form-control" name="area">
        <option value="Back">Back</option>
        <option value="Mid">Mid</option>
        <option value="Forward">Forward</option>
      </select>
    </td>
    <input type="hidden" value="<%= game.id %>" name="game">
    <input type="hidden" value="pass" name="eventType">
  </form>
`
