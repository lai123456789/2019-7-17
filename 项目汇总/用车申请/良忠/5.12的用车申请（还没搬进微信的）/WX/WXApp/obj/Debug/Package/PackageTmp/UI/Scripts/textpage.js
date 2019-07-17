$(function () {
    $('body').addClass('contor');
});

$(document).on('tap', '#top > .title > .control1', function () {
    window.history.back(-1);
});



function doTTS() {
    var ttsDiv = document.getElementById('bdtts_div_id');
    var ttsAudio = document.getElementById('tts_autio_id');
    var ttsText = document.getElementById('ttsText').value;

    // 这样就可实现播放内容的替换了
    ttsDiv.removeChild(ttsAudio);
    var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
    var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=4&spd=6&text=' + ttsText + '" type="audio/mpeg">';
    var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
    var au2 = '</audio>';
    ttsDiv.innerHTML = au1 + sss + eee + au2;

    ttsAudio = document.getElementById('tts_autio_id');

    ttsAudio.play();
}