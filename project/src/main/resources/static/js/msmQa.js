$(function() {

    $('.btnMain').click(function() {
        window.location.href = 'index1.html';
    });

    $('.btnAdd').click(function() {
        window.location.href = 'question.html';
    })

    //화살표 이미지 회전
    document.getElementById('btnArrow').addEventListener('click', function() {
        this.classList.toggle('clicked');
    });

});
