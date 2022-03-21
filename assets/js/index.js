console.log("JS")
$("#add_user").submit(function(event){
  console.log("new user")
  alert("Success")
})
$("#update_user").submit(function(event){
  event.prevenntDefault()
console.log("working")
  var unindexed_array=$(this).serializeArray()
  var data={}

  $.map(unindexed_array,function(n,i){
    data[n['name']]=n['value']
  })
  console.log(data)
  
  var request={
    "url":`http://localhost:3030/api/users/${data.id}`,
    "method":"PUT",
    "data":data
  }


$.ajax(request).done(function(response){
  console.log(data)
  alert("Updated")
})
})
if(window.location.pathname == "/"){
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function(){
      var id = $(this).attr("data-id")

      var request = {
          "url" : `http://localhost:3000/api/users?${id}`,
          "method" : "DELETE"
      }

      if(confirm("Do you really want to delete this record?")){
          $.ajax(request).done(function(response){
              alert("Data Deleted Successfully!");
              location.reload();
          })
      }

  })
}