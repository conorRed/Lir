window.onload = () => {
  document.getElementById("admin-list-users").addEventListener('click', function(event){
    let userListNodeId = $(event.target).closest('li')[0].id
    if(event.target.parentElement.id === 'edit-user-'+userListNodeId){
      event.preventDefault()
      $('#' + userListNodeId).find('form').css("display", "block")
      $('#' + userListNodeId).find('span').css("display", "none")
      $('#edit-user-'+userListNodeId).css("display", "none")
    }
    if(event.target.parentElement.id === 'cancel-edit-'+userListNodeId){
      $('#' + userListNodeId).find('form').css("display", "none")
      $('#' + userListNodeId).find('span').css("display", "inline")
      $('#edit-user-'+userListNodeId).css("display", "inline")
    }
  })
}
