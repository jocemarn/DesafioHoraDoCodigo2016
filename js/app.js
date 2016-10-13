$(document).foundation();

marginTop = 90;
atual = 0;

$("header nav a.itemMenu").click(function (event) {
	if(Foundation.MediaQuery.current == 'small'){
		$(".itemMenu").addClass("show-for-medium");
	}
});

$("header nav a.goTo").click(function (event) {
  event.preventDefault();
  var idElemento = $(this).attr("href");

	if(idElemento == "#inicio"){
  	var deslocamento = marginTop;
	}else{
  	var deslocamento = $(idElemento).offset().top;
	}
	
  $('html, body').animate({ scrollTop: deslocamento-marginTop }, 'slow');
});


$(window).scroll(function(){
  if($(window).scrollTop() < 20){
    if($('header #fixed').hasClass('fundoFixo')){
      $('header #fixed').removeClass('fundoFixo');
    }
  }else{
    if(!$('header #fixed').hasClass('fundoFixo')){
      $('header #fixed').addClass('fundoFixo');
    }
  }
});

$("header nav #menuTrigger").click(function(){
	if(Foundation.MediaQuery.current == 'small'){
		if($("#menuInicio").hasClass("show-for-medium")){
			$(".itemMenu").removeClass("show-for-medium");
		}else{
			$(".itemMenu").addClass("show-for-medium");
		}
	}
});
