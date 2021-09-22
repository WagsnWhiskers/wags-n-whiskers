(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

    

  }); // end of document ready
})(jQuery); // end of jQuery name space

// init() //calls when page starts up leave at bottom

// <!-- <script>
//    $(document).ready(function(){
//     $('select').formSelect();
//     }); -->

//     $(document).ready(function(){
//       $('.modal').modal();
//     });

      document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });