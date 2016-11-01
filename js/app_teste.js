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


	  $('#professor_cpf').mask('000.000.000-00', {reverse: true});
		$('#professor_telefone').mask('(00) 0000-00009');

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


$("#escola_total").focusout(function(){
	$("#erroInscreva p").html();
	if(!$("#erroInscreva").hasClass("displayNone")){
		$("#erroInscreva").addClass("displayNone")
	}

	if($("#escola_total").val() == 0 || !$("#escola_total").val()){
			$("#erroInscreva p").html("O campo de Total de Alunos da Escola é obrigatório para essa inscrição. Para continuar, por favor, preencha com o total de alunos matriculados neste momento em sua escola.");
			if($("#erroInscreva").hasClass("displayNone")){
				$("#erroInscreva").removeClass("displayNone");
			}
	}

});

$("#escola_inep").focusout(function(){

	$("#escola_total").attr("disabled", "disabled");
	$("#erroEscola p").html();
	$("#escola_nome").val('');
	$("#escola_cidade").val('');
	if(!$("#erroEscola").hasClass("displayNone")){
		$("#erroEscola").addClass("displayNone")
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
				$("#erroEscola p").html(data.motivo);
				if($("#erroEscola").hasClass("displayNone")){
					$("#erroEscola").removeClass("displayNone");
				}
			}
		});
	}else{
		$("#erroEscola p").html("O preenchimento do campo INEP é obrigatório.");
		if($("#erroEscola").hasClass("displayNone")){
			$("#erroEscola").removeClass("displayNone");
		}
	}
});

$("#professor_cpf").focusout(function(){

	$("#erroProfessor p").html();
	if(!$("#erroProfessor").hasClass("displayNone")){
		$("#erroProfessor").addClass("displayNone")
	}

	var cpf = $("#professor_cpf").val();
	if(cpf){
		var url = "http://formulario.fundetec.org.br/hdc/pesquisa/cpf.php?cpf="+cpf;
		$.getJSON(url, function(data){
			if(data.erro == 1){
				$("#erroProfessor p").html(data.motivo);
				if($("#erroProfessor").hasClass("displayNone")){
					$("#erroProfessor").removeClass("displayNone");
				}
			}
		});
	}else{
		$("#erroProfessor p").html("O preenchimento do campo CPF do Professor(a) é obrigatório.");
		if($("#erroProfessor").hasClass("displayNone")){
			$("#erroProfessor").removeClass("displayNone");
		}
	}
});

$("#professor_email").focusout(function(){

	$("#erroProfessor p").html();
	if(!$("#erroProfessor").hasClass("displayNone")){
		$("#erroProfessor").addClass("displayNone")
	}

	var email = $("#professor_email").val();
	if(email){
		var url = "http://formulario.fundetec.org.br/hdc/pesquisa/email.php?email="+email;
		$.getJSON(url, function(data){
			if(data.erro == 1){
				$("#erroProfessor p").html(data.motivo);
				if($("#erroProfessor").hasClass("displayNone")){
					$("#erroProfessor").removeClass("displayNone");
				}
			}
		});
	}else{
		$("#erroProfessor p").html("O preenchimento do campo e-mail do Professor(a) é obrigatório.");
		if($("#erroProfessor").hasClass("displayNone")){
			$("#erroProfessor").removeClass("displayNone");
		}
	}
});


$("#botaoInscreva").click(function(){
	var inep = $("#escola_inep").val();
	if(!inep){
		$("#erroBotao p").html("O campo INEP é obrigatório. Por favor, preencha-o para que possa continuar.");
		if($("#erroBotao").hasClass("displayNone")){
			$("#erroBotao").removeClass("displayNone");
		}
		var deslocamento = $("#erroEscola").offset().top;
		$('#inscreva').animate({ scrollTop: deslocamento-marginTop }, 'slow');
	}else{
		if(typeof $("#escola_total").val() == typeof undefined && attr == false){
			$("#erroBotao p").html("O campo de Total de Alunos da Escola é obrigatório para essa inscrição. Para continuar, por favor, preencha com o total de alunos matriculados neste momento em sua escola.");
			if($("#erroBotao").hasClass("displayNone")){
				$("#erroBotao").removeClass("displayNone");
			}
		  var deslocamento = $("#erroEscola").offset().top;
		  $('#inscreva').animate({ scrollTop: deslocamento-marginTop }, 'slow');
		}else{

		}
	}
});
