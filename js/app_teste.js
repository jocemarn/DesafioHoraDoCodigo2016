$(document).foundation();

marginTop = 90;
atual = 0;
function needFundo(){
	if($(window).scrollTop() < 20){
		if($('header #fixed').hasClass('fundoFixo')){
			$('header #fixed').removeClass('fundoFixo');
		}
	}else{
		if(!$('header #fixed').hasClass('fundoFixo')){
			$('header #fixed').addClass('fundoFixo');
		}
	}
}

$(document).ready(function(){
	needFundo();
});

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
	needFundo();
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


$("#escola_inep").focusout(function(){

	$("#escola_total").attr("disabled", "disabled");
	$("#erroInscreva p").html();
	if(!$("#erroInscreva").hasClass("displayNone")){
		$("#erroInscreva").addClass("displayNone")
	}

	var inep = $("#escola_inep").val();
	if(inep){
		var url = "http://formulario.fundetec.org.br/hdc/pesquisa/inep.php?inep="+inep;
		$.getJSON(url, function(data){
			if(data.sucesso == 1){
				$("#escola_nome").val(data.nomeEscola);
				$("#escola_cidade").val(data.nomeCidade);
				if(!data.numeroAlunos){
					$("#escola_total").removeAttr("disabled");
				}else{
					$("#escola_total").val(data.numeroAlunos);
				}
			}else{
				$("#erroInscreva p").html(data.motivo);
				if($("#erroInscreva").hasClass("displayNone")){
					$("#erroInscreva").removeClass("displayNone")
				}
			}
		});
	}
});


$("#botaoInscreva").click(function(){

});
