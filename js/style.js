document.addEventListener("mousemove",parallax);
function parallax(e){
  document.querySelectorAll(".object").forEach(function(move){
    var moving_value = move.getAttriubute("data-value");
    var x = (e.clientX * moving_value)/2;
    var y = (e.clientY * moving_value)/2;
    move.style.transform = "translateX("+x+"px) translateY("+y+"px)";
  })

}

