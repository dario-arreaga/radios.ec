$(document).ready(function(){
	initPlayer();
	getSongs();
});
var audio;
var music;
audio = document.getElementById('player');
function initPlayer(){
	$('#shuffle').click(function(){
		$('#playlist').empty();
		console.log(shuffle(music.songs));
		genList(music);
		playSong(0);
	});
}

function playSong(id){
	console.log(id);
	var long = music.songs;
	if (id >=long.length) {
		console.log('se acabó');
		audio.pause();
	}else{
		$('#img-album').attr('src',music.songs[id].image);
		$('#player').attr('src',music.songs[id].song);
		audio.play();
		scheduleSong(id);
	}
	
}

function getSongs(){
	$.getJSON("https://dl.dropboxusercontent.com/s/nrg0mnse04dqz86/app.json",function(mjson){
		music = mjson;
		console.log(music);
		genList(music);
	});

}
function scheduleSong(id){
	audio.onended = function(){
		console.log('Terminó la canción');
		playSong(parseInt(id)+1);
	}
}

function genList(music){
	$.each(music.songs,function(i,song){
		$('#playlist').append('<li class="inactivo" id="'+i+'"><a><img class="cover" src="'+song.image+'" height="50" width="55"></img><div>'+song.name+'</div></a></li>')
	});
	$('#playlist li').click(function(){
		var selectedsong = $(this).attr('id');
		console.log(selectedsong);
		playSong(selectedsong);
	});
}	
function shuffle(array){
	for(var random, temp, position = array.length;position; random = Math.floor(Math.random()* position),temp = array[--position], array[position]= array[random],array[random]=temp);
		return array;
}

