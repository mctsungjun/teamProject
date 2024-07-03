//로그인 버튼 클릭됨----------------------------------------
// let loginForm=()=>{
//     $.ajax({
//         url:"/sung/loginF",
//         type:"GET",
//         success:(resp)=>{
            
//             let temp=$(resp).find(".login");
//             $(".change").html(temp);
//         }
//     })
// }
//로그아웃 버튼 클릭됨-------------------
// var logOut=()=>{
// 	$.ajax({
// 		url:"/sung/logout",
// 		type:"GET",
// 		success:(resp)=>{
// 			alert("로그아웃되었음")
// 			sessionStorage.setItem("id",null);
// 			sessionStorage.setItem("name",null);
// 			$.ajax ({
// 				url : "/design_guide",
// 				type: "GET",
// 				// data: {"findStr" : findStr},               // * 이거 selected icon 넘겨줘야함
// 				success: (resp) => {
// 					let temp = $(resp).find(".designGuide");  // * nav    : nav.html
// 					$(".content").html(temp);                 // * navbar : index.html
// 				}
// 			})
// 		}
// 	})
// }
//회원상세보기 보튼 클릭
var detail = ()=>{
	// var id = sessionStorage.getItem("id");
	// // alert(id)
	// var name = sessionStorage.getItem("name");
	$.ajax({
		url:"/sung/detail",
		type:"GET",
		// data:{"id":id,"name":name},
		success:(resp)=>{
			
			let temp = $(resp).find(".change");
			$(".content").html(temp);
			if(resp==="logout"){
				console.log(resp);
				
			}
			
		}
	})
}
// 대표이미지 바뀌때 테두리변함
var repreImage="";
var change=(tag,photo)=>{
	let allImg = document.querySelectorAll(".photo_list img");
	allImg.forEach((img)=>{
		img.style.border="5px solid blue";
	})
	tag.style.border="5px solid #aaa";
	repreImage=photo;
}

//대표 이미지 수정폼


var	btnChangePhoto=()=>{
		$.ajax({
			url:"/sung/repreChangeForm",
			type:"GET",
			success:(resp)=>{
				let temp = $(resp).find(".photoSection");
				$(".photoSection").html(temp);
				// 대표이미지수정
				let btnRepreChange = document.querySelector(".btnRepreChange");
				btnRepreChange.onclick=()=>{
					// var id = sessionStorage.getItem("id");
					// alert(id);
				
					$.ajax({
						url:"/sung/changePhoto",
						type:"GET",
						data:{"photo":repreImage},
						success:(resp)=>{
							detail();
						
						}
					})
				}
			}
		})
	}
// 홈으로 이동---------------------------------------------
var btnGoHome = ()=>{
	$.ajax ({
        url : "/design_guide",
        type: "GET",
        // data: {"findStr" : findStr},               // * 이거 selected icon 넘겨줘야함
        success: (resp) => {
            let temp = $(resp).find(".designGuide");  // * nav    : nav.html
            $(".content").html(temp);                 // * navbar : index.html
        }
    })
}

// 목록으로 이동 (관리자만)
var btnListForm = ()=>{
	let managerCode = prompt("관리코드를 입력하세요");
	if( managerCode !=null && managerCode !=""){
		$.ajax({
			url:"/sung/list",
			type:"GET",
			data:{"code":managerCode},
			success:(resp)=>{
				let temp =$(resp).find(".change");
				$(".change").html(temp);
				
				
			
				
			}
		})
	}
}


				
//리스트 목록에서 클릭하면 상세페이지로
function view(id){
	$.ajax({
		url:"/sung/view",
		type:"POST",
		data:{"id":id},
		success:(resp)=>{
			let temp = $(resp).find(".change");
			$(".content").html(temp);
		}
	})
}
// 리스트에서 검색하기
	
var search=()=>{
	let finStr = document.querySelector(".findStr").value;
    	        
		
		$.ajax({
			url:"/sung/search",
			type:"GET",
			data:{"findStr":finStr},
			success:(resp)=>{
				console.log(resp)

				let temp =$(resp).find(".change");
				$(".change").html(temp);
			}
		})
	}				

//회원가입 버튼 클릭됨-----------------------------------------
export function registerForm() {
    $.ajax({
        url:"/sung/registerF",
        type:"GET",
        success:(resp)=>{
            let temp=$(resp).find(".register");
            $(".authPage").html(temp);
        }
    })
}
//이미지등록버튼 클릭됨-------------------------------------------------
function regiPhoto() {
	// photoSection의 내용을 새로운 내용으로 변경
	var photoSection = document.querySelector('.photoSection');
	photoSection.innerHTML = `
	<div class="container mt-5 d-flex justify-content-center">
	<div class="col-md-5 m-auto">	
	<label>
			<h6 class="text-success fw-bolder">파일첨부<h6>
			<input type="file" id="fileInput" class="form-control" name="files" multiple onChange="fileChange(this)"/>
		</label>
		<br/>
		<button type="button" class="btn btn-outline-primary" onClick="uploadFiles()">업로드</button>
		<fieldset class="repre">
                    <legend class="text-info">대표이미지를 선택해 주세요</legend>
                </fieldset>
	</div>
	</div>
	`;
}
//대표이미지 선택---------------------------------------------
var fileChange=(tag)=>{
	let repre = document.querySelector(".repre");
	repre.innerHTML = ''; // 하위태그 모두 삭제
	let legend = document.createElement("legend");
	legend.textcontent="대표이미지를 선택해주세요";
	repre.appendChild(legend);
	for(f of tag.files){
		console.log(f.name);
		let chkbox = document.createElement('input');
		let label = document.createElement('label');
		let br = document.createElement("br");
		chkbox.type="radio";
		chkbox.name="photo";
		chkbox.value = f.name;

		label.textContent=f.name;
		label.prepend(chkbox);
		
		repre.appendChild(label);
		repre.appendChild(br)
	}
}


//사진/파일 업로드-----------------------------------------------
function uploadFiles(){
	let input = document.getElementById('fileInput');
	let frmData = new FormData();
	let selectedPhoto = document.querySelector('input[name="photo"]:checked');
	for (let i = 0; i < input.files.length; i++) {
        frmData.append('files', input.files[i]); // 파일 추가
    }
	if(selectedPhoto){
		frmData.append('reprePhoto',selectedPhoto.value); //선택된 대표이미지
	}
	$.ajax({
		url:"/sung/upload",
		type:"POST",
		data:frmData,
		processData:false,
		contentType:false,
		success:(resp)=>{
			console.log(resp);
			detail();
		}
	})
}

// 수정버튼 클릭됨-------------------------------------------

var modifyFrom=()=>{
	// let id = sessionStorage.getItem("id");
	// alert(id);
	$.ajax({
		url:"/sung/modify",
		type:"GET",
		// data:{"id":id},
		success:(resp)=>{
			let temp =$(resp).find(".change");
			$(".change").html(temp);
			
			let btnCancel = document.querySelector(".btnCancel");
			let btnUpdate = document.querySelector(".btnUpdate");
			// 취소버튼 클릭시 다시 상세페이지로 이동
			btnCancel.onclick = ()=>{
				detail();
			}
			//수정 버튼 클릭시 수정
			btnUpdate.onclick = () =>{
				let frm = document.form;
				let frmdata = new FormData(frm);
				$.ajax({
					url:"/sung/updateR",
					type:"POST",
					data:frmdata,
					processData:false,
					contentType:false,
					success:(resp)=>{
						console.log(resp)
						detail();
					}
				})


			}


		}


	})
}
//회원탈퇴
function btnMemberOff(){
	var yn = confirm("정말로 탈퇴하시겠습니까?");
	if (yn){
		
		$.ajax({
			url:"/sung/memberOff",
			type:"GET",
			success:(resp)=>{
				alert(resp);
				
                $.ajax ({
                    url : "/login",
                    type: "GET",
                    success: (resp) => {
                        let temp = $(resp).find(".change");  
                        $(".authPage").html(temp);                
                    }
                })
				
			}
		})
	}
}



//아이디/비번 찾기폼------------------------------------
export function findIdPwd() {
	$.ajax({
		url:"/sung/findIdPwd",
		type: "GET",
		success: (resp)=> {
		// 응답 처리
		let temp = $(resp).find(".findIdPw");
		$(".authPage").html(temp);
		}
    });
};

// // 아이디/비번찾기 함수들-------------------------------------------
// function inputSendit(num) {
// 	if(keyCode==13) {
// 		idpwsearch(num);
// 	}
// }


export function idpwsearch() {
	let a = goAndStay();
	
	if(a==="ok"){
		var passSearchForm2 = document.passSearchForm2
		var formData = new FormData(passSearchForm2);
	$.ajax({
		url:"/sung/passSearch",
		type:"POST",
		data:formData,
		processData: false, 
		contentType: false,
		success:(resp)=>{
			if(resp.message==="ok"){
				alert("메일로 보냈습니다.");
			}else if(resp.message==="unKnown"){
				alert("정보가 일치하지않습니다.");
			}else{
				alert(resp.message);
			}

	}
	});	
	}

	

}
function goAndStay(){
	var passSearchForm2 = document.getElementById("passSearchForm2");
	if(true){
	
			
			if(passSearchForm2.name.value==""){
				alert("이름을 입력해주세요.");
				passSearchForm2.name.focus();
				return false;
			}
			if(passSearchForm2.email.value==""){
				alert("이메일을 입력해주세요.");
				passSearchForm2.email.focus();
				return false;
			}
			return "ok";
		}else{
			return "ok";
		}
	
}

//비밀번호----------------------------------------------------------
function text_chkpw(){
	var form = document.querySelector("#pwd").value;
    var pattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/;
	if(form.length < 6 || pattern.test(form) == false){
		$('#no_pw').show();
		$('#ok_pw').hide();
	}else{
		$('#no_pw').hide();
		$('#ok_pw').show();
	}
	form.passwd_check.value = "";
	$('#no_multipw').hide();
	$('#ok_multipw').hide();
}
function multi_chkpw(){
	var formchk = document.querySelector("#pwdchk").value;
    var form = document.querySelector("#pwd").value;
	if(form != formchk) {
		$('#no_multipw').show();
		$('#ok_multipw').hide();
	}else{
		$('#no_multipw').hide();
		$('#ok_multipw').show();
	}
}
// 체크박스 선택시 필요한 양식 표시-------------------------------------------

function joinform_chk(event)     
{
 
	var form = document.joinForm;
	var checked = $("input[name='chked']:checkbox:checked").val();
	

			if(form.id.value==""){
				alert('아이디를 입력해주세요.');
				form.id.focus();
                return false;
					
			}
				
			if(form.idchk.value==''){
				alert("아이디 중복체크하여 주세요.");
				return false;
				
			}
			// else if(form.id.value.length < 3 || form.id.value.length > 16) {
			// 	alert("아이디는 3~15자로 입력 주세요.");
			// 	form.id.focus();
            //     event.preventDefault();
			// 	return;
			// }
			
			 if(form.pwd.value=="") {
				alert("비밀번호를 입력해 주세요.");
				form.pwd.focus();
                return false;
				
			}
		
            if(form.pwdchk.value=="") {
				alert("비밀번호확인를 입력해 주세요.");
				form.pwd_check.focus();
                return false;
				
			}
			// if(form.pwd.value != form.pwdchk.value) {
			// 	alert("비밀번호가 정확하지 않습니다. 정확히 입력해 주세요.");
			// 	form.pwdchk.focus();
            //     return false;
				
			// }
			if(form.name.value=="") {
				alert("이름을 입력해 주세요.");
				form.name.focus();
                return false;
				
			}
			if(form.birthday.value=="") {
				alert("생년월일을 입력해 주세요.");
				form.birth.focus();
                return false;
				
			}


			
			
			if(form.roadAddress.value=="") {
				alert("주소를 입력해 주세요.");
				form.roadAddress.focus();
                return false;
				
			}
			if(form.addressDetail.value=="") {
				alert("상세주소를 입력해 주세요.");
				form.detailAddress.focus();
                return false;
			
			}
			if(form.email.value=="") {
				alert("이메일을 입력해 주세요.");
				form.emailName.focus();
				return false;
				
			}
			if(form.phone1.value=="") {
				alert("회원님의 휴대폰 번호를 입력해 주세요.");
				form.phone1.focus();
				return false;
				
			}
			if(form.phone2.value=="") {
				alert("회원님의 휴대폰 번호를 입력해 주세요.");
				form.phone2.focus();
                return false;
				
			}
			if(form.phone3.value=="") {
				alert("회원님의 휴대폰 번호를 입력해 주세요.");
				form.phone3.focus();
                return false;
				
			
			}
		else{
		 	return "ok";
			
		 }
	}
//--------------------------------------------------------주소----------------------------
         //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
         var sample4_execDaumPostcode=()=> {
            var postcodePopup = new daum.Postcode({
                oncomplete: function(data) {
                  
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수
        
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                   
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                       extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                 
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
        
                  
                    document.getElementById('postcode').value = data.zonecode;
                    document.getElementById("roadAddress").value = roadAddr;
                    document.getElementById("jibunAddress").value = data.jibunAddress;
       
                
                }
                
            }).open();

        }


 // 아이디체크----------------------------------------------------
function userChk()
{

    var userId = document.querySelector("#id");
    var pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{3,16}$/;


    if(userId.value==""){
        alert('아이디를 입력해주세요.');
        userId.focus();
        return;
    }else if(userId.value.length < 3 || userId.value.length > 16) {
        alert("아이디는 3~15자의 영문과 숫자를 포함해 주세요.");
        userId.focus();
        return;
    }else if(!pattern.test(userId.value)){
    alert('아이디는 영문과 숫자를 포함해 주세요.');
        return;
   }else{

            $.ajax({
                url:"/memberId/chk",
                type:"GET",
                data:{"userId":userId.value},
                success:(resp)=>{

                    if(resp===0){
                        console.log(resp);
                        alert("사용가능한 아이디 입니다.");
                      
                    }else if(resp===1){
                        console.log(resp);
                        alert("현재 사용중인 아이디 입니다.");
                        userId.value="";
                        userId.focus();
                    }
                }
            })

        };
    

    
}
//이메일 option값 input에 넣기-------------------------------------------
function updateEmailInput(){
    var select = document.getElementById("email_sel");
    var selectedValue = select.value;
    var email2 = document.getElementById("email2");
    email2.value = selectedValue;
}   

export function returnToLoginPage() {
	$.ajax({
        url:"/login",
        type:"GET",
        success:(resp)=>{
            let temp = $(resp).find(".loginPage");
            $(".authPage").html(temp);
        }
    })
}

       



    
  