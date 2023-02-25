const signUpPage = document.querySelector('#signupPage');
const loginPage = document.querySelector('#loginPage');
signUpPage.addEventListener('click', () => {
    window.location.href = "./index.html"
})
loginPage.addEventListener('click', () => {
    window.location.href = "./login.html"
})

let teacher = JSON.parse(window.localStorage.getItem('currentUser'));
console.log(teacher.password);
const teacherName = document.querySelector('.teacherName');
const teacherEmail = document.querySelector('.teacherEmail');
const users = JSON.parse(window.localStorage.getItem('users'));

teacherName.innerHTML = `Welcome back <strong>${teacher.name}</strong>!`
teacherEmail.innerHTML = `Your Email ID: ${teacher.email}`

const oldPassword = document.querySelector('#oldPassword');
const oldPasswordWarning = document.querySelector('#oldPasswordHelp');
const newPassword = document.querySelector('#newPassword');
const newPasswordWarning = document.querySelector('#newPasswordHelp');
const confirmNewPassword = document.querySelector('#confirmNewPassword');
const confirmNewPasswordWarning = document.querySelector('#confirmNewPasswordHelp');
const change = document.querySelector('#change');
const logout = document.querySelector('#logout');
const notification = document.querySelector('.notification');
console.log(teacher)

change.addEventListener('click',(e) =>{
    e.preventDefault();
    if(oldPassword.value !== teacher.password){
        oldPasswordWarning.innerHTML = 'Entered password is not same as Current Password!';
        notification.innerHTML = '';
        return false;
    }
    else{
        oldPasswordWarning.innerHTML = '';
    }
    //password validation
    //1 Uppercase
    if(!newPassword.value.match(/[A-Z]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    //lowercase
    if(!newPassword.value.match(/[a-z]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    if(!newPassword.value.match(/[0-9]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    if(!newPassword.value.match(/[!/@/#/$/%/^/&/*/</>/_/]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    if(newPassword.value===teacher.password){
        newPasswordWarning.innerHTML = 'New password should not be same as your old password!';
        notification.innerHTML = '';
        return false;
    }
    else{
        newPasswordWarning.innerHTML = '';
    }

    if(newPassword.value !== confirmNewPassword.value){
        confirmNewPasswordWarning.innerHTML = "New password and Confirm Password should be the same!";
        notification.innerHTML = '';
        return false;
    }
    else{
        confirmNewPasswordWarning.innerHTML = "";
        notification.innerHTML = 'Password changed successfully!!';
        teacher.password = confirmNewPassword.value;
        window.localStorage.setItem('currentUser', JSON.stringify(teacher));
        users.map(data=>{
            console.log(data.password)
            if(oldPassword.value === data.password){
                data.password = confirmNewPassword.value;
            }
        })
        window.localStorage.setItem('users', JSON.stringify(users));
    }
    
})
logout.addEventListener('click', ()=>{
    window.localStorage.removeItem('currentUser');
    window.location.href = './login.html';
})