document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      toolbarEnabled: true
    });
  });


  
  $(document).ready(function(){
    $('.modal').modal();
  });

  $(document).ready(function(){
    $('select').formSelect();
  });