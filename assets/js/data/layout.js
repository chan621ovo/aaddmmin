// $(function(){
//     layOutData();
// })

// //헤더 , 푸터  비동기
// function layOutData (){

// 	//헤더
// 	fetch("/include/header.html")
// 	  .then(response => {
// 		return response.text()
// 	})
// 	.then(data => {
// 		document.querySelector("header").innerHTML = data;
// 	});

// 	//푸터
// 	fetch("/include/footer.html")
// 	  .then(response => {
// 		return response.text()
// 	  })
// 	  .then(data => {
// 		document.querySelector("footer").innerHTML = data;
// 	  });
// };