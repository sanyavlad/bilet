// let box = document.querySelector('.box');
// let star = document.querySelector('.box .item .star ');
//
// box.addEventListener('click',(e) => {
//
//   if (e.target.matches('.item i')) {
//     e.target.style.color = 'blue';
//     result = confirm('Вы добавили вакансию в Избранное. Перейти?');
//     if (result) {
//       console.log('ok');
//
//     }
//   }
// })


const renderBtnsAuth = () =>{
	document.querySelector('.applicants')?.remove();
	document.querySelector('.stick')?.remove();
	document.querySelector('.employers')?.remove();
	document.querySelector('.summary')?.remove();
	document.querySelector('.s-work')?.remove();

	document.querySelector('.authorization')?.insertAdjacentHTML('afterbegin', `<a href="" id="logout" style="margin-right: 5px;
  margin-bottom: 5px;
  display: block;
  padding: 7px;

  border-radius: 10px;
  color: black;
  text-decoration: none;">Выйти из аккаунта</a>`);

}
const logout = () =>{
	localStorage.removeItem('authUser');
	document.querySelector('#logout')?.remove();
	document.querySelector('.right')?.insertAdjacentHTML('afterbegin',`<a href="#" class="applicants">Соискателям</a>
	<span class="stick"></span>
	<a href="employer.html" class="employers">Работодателям</a>`);
	document.querySelector('.authorization')?.insertAdjacentHTML('afterbegin',`<a href="" data-bs-toggle='modal' data-bs-target='#ModalsignUp' class="s-work">Зарегистрироваться</a>
	<a href="" data-bs-toggle='modal' data-bs-target='#ModalsignIn' class="summary">Войти</a>`);
}
// localStorage.setItem('users',JSON.stringify([
// 	{id: 1, email: 'user1@mail.ru', password: 'AA1234jfj'},
// 	{id: 2, email: 'user2@mail.ru', password: 'AA1235jfj'},
// ]))
document.querySelector('#login')?.addEventListener('click', (e) =>{

	const emailField = document.querySelector('#ModalsignIn input[type="email"]');
	const passwordField = document.querySelector('#ModalsignIn input[type="password"]');
	// console.log( document.querySelector('#ModalsignIn select').value);

	// let a = document.querySelector('#ModalsignIn').get();
	// let b = a.hide();
	if (localStorage.getItem('users')) {
		let usersArray = JSON.parse(localStorage.getItem('users'));
		// console.log(usersArray.includes({email: 'user1@mail.ru', password: 'AA1234jfj'}));
		// const email = 'user1@mail.ru';
		// const password = 'AA1234jfj';
		// for (var user of usersArray) {
		// 	if (user.email == emailField.value && user.password == passwordField.value) {
		// 		console.log('yes');
		// 	}
		// }
		const user = usersArray.find((user)=>{
			return user.email == emailField.value && user.password == passwordField.value;

		});
		if (user) {

				// window.location.href = 'worker.html';
				localStorage.setItem('authUser',user.id);

				$('#ModalsignIn').modal('hide');
				renderBtnsAuth();
				document.querySelector('#logout');
				localStorage.setItem('authUser',user.id);

				document.querySelector('#logout')?.addEventListener('click', (e)=>{
					e.preventDefault();
					logout();

				})





		} else {
			let label = '<label id="authError" style="color: red; font-style:italic; font-size:12px;">Check email password on correctness</label>';
			document.querySelector('#ModalsignIn .auth-error').innerHTML = label;

		}

	}

})




document.querySelector('#logup')?.addEventListener('click', () =>{
	const emailField = document.querySelector('#ModalsignUp input[type="email"]');
	const passwordField = document.querySelector('#ModalsignUp input[type="password"]');
	const repeatPasswordField = document.querySelector('#ModalsignUp input[placeholder="подтвердите свой пароль"]');

	const isMatchEmail = emailField.value.match(/^\S+@\S+\.\S+$/);
	const isMatchPassword = passwordField.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

	let label;
	if (!isMatchEmail && !isMatchPassword) {

		emailField.style.border = '1px solid red';
		label = '<label id="errorEmailLabel" style="color: red; font-style:italic; font-size:12px;">Проверьте корректность ввода электронной почты</label>';
		document.querySelector('#ModalsignUp .email-error').innerHTML = label;
		passwordField.style.border = '1px solid red';
		label = '<label id="errorPasswordLabel" style="color: red; font-style:italic; font-size:12px;">Проверьте корректность ввода пароля</label>';
		document.querySelector('#ModalsignUp .password-error').innerHTML = label;
	} else if(!isMatchEmail) {
		emailField.style.border = '1px solid red';
		label = '<label id="errorEmailLabel" style="color: red; font-style:italic; font-size:12px;">Проверьте корректность ввода электронной почты</label>';
		document.querySelector('#ModalsignUp .email-error').innerHTML = label;

	} else if (!isMatchPassword) {
		passwordField.style.border = '1px solid red';
		label = '<label id="errorPasswordLabel" style="color: red; font-style:italic; font-size:12px;">Проверьте корректность ввода пароля</label>';
		document.querySelector('#ModalsignUp .password-error').innerHTML = label;
	} else if(isMatchEmail && isMatchPassword){

		emailField.style.borderColor = '#ccc';
		document.querySelector('#errorEmailLabel')?.remove();

		passwordField.style.borderColor = '#ccc';
		document.querySelector('#errorPasswordLabel')?.remove();

		if (passwordField.value == repeatPasswordField.value) {

              let usersArray = JSON.parse(localStorage.getItem('users'));

              const user = usersArray.find((user)=>{
                return user.email == emailField.value && user.password == passwordField.value;

              })

            if (user) {
              repeatPasswordField.style.border = '1px solid red';
              label = '<label id="errorRepeatPasswordLabel" style="color: red; font-style:italic; font-size:12px;">Аккаунт с указанной почтой и паролем уже существует</label>';
              document.querySelector('#ModalsignUp .repeat-password').innerHTML = label;
            } else {
                document.querySelector('#errorRepeatPasswordLabel')?.remove();
                $('#ModalsignUp').modal('hide');
                renderBtnsAuth();
                console.log(localStorage.getItem('users'));
                let arr = JSON.parse(localStorage.getItem('users'));
                localStorage.removeItem('users');
                let number = arr[arr.length-1].id + 1;
                let info = {
                  id: number,
                  email: emailField.value,
                  password: passwordField.value
                }
                console.log(info);
                arr[arr.length] = info;
                console.log(arr);
                localStorage.setItem('authUser',number);
                localStorage.setItem('users',JSON.stringify(arr));
                console.log(localStorage.getItem('users'));

            }


		} else {
			repeatPasswordField.style.border = '1px solid red';
			label = '<label id="errorRepeatPasswordLabel" style="color: red; font-style:italic; font-size:12px;">Пароль не совпадает с вышеуказанным</label>';
			document.querySelector('#ModalsignUp .repeat-password').innerHTML = label;

		}

	}
})
document.addEventListener('DOMContentLoaded',()=>{

	if (localStorage.getItem('authUser')) {
		renderBtnsAuth();
	}
	document.querySelector('#logout')?.addEventListener('click', (e)=>{
		e.preventDefault();
		logout();

	})


})
