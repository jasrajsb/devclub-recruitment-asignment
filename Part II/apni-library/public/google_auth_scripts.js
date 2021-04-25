const endpoint = "http://localhost:4000";
var server = {};
var loaded = false;
var redirected = false;
server.send = (msg, obj) => {
  console.log("server.send called")
  return new Promise(function (resolve, reject) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(msg);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(endpoint + "/api", requestOptions)
      .then(response => response.json())
      .then(result => {
        result.obj = obj
        resolve(result)


      })
      .catch(error => reject(error));
  });
}
var updateUser= ()=>{
  server.send({
    request_name: 'update_user',
    credentials: getUser().token.token
  },{
    redirect: {
      on_success: '/dashboard',
      on_error: '/logout',
    }
  }).then((result) => {
    window.loaded = true;
    obj = result.obj
    setCookie("user", JSON.stringify(result))
    console.log("set cookie");
    var event_msg = { billi: 'meow', detail: result.success ? obj.redirect.on_success : obj.redirect.on_error+"?reason="+result.msg }
    console.log("script", 22, event_msg)
    var event = new CustomEvent("stop_loading", event_msg);
    document.dispatchEvent(event);
    console.log("dispatched");
  });
}
var validateGoogleUser = (data) => {
  server.send({
    request_name: 'google_sign_in',
    credentials: data.credentials
  });
}

var validateSignIn = (data) => {
  server.send({
    request_name: 'validate_sign_in_user',
    credentials: data
  }, {
    redirect: {
      on_success: '/dashboard',
      on_error: '/auth/login',
    }
  }).then((result) => {
    obj = result.obj
    setCookie("user", JSON.stringify(result))
    console.log("set cookie");
    var event_msg = { billi: 'meow', detail: result.success ? obj.redirect.on_success : obj.redirect.on_error+"?reason="+result.msg }
    console.log("script", 22, event_msg)
    var event = new CustomEvent("stop_loading", event_msg);
    document.dispatchEvent(event);
    console.log("dispatched");
  });
}
var validateSignUp = (data) => {
  console.log("validateSignUp called");
  server.send({
    request_name: 'sign_up_user',
    credentials: data
  }, {
    redirect: {
      on_success: '/dashboard',
      on_error: '/auth/login'
    }
  }).then((result) => {
    console.log("script", 56, result)
    if (result.success) {
      obj = result.obj
      setCookie("user", JSON.stringify(result))
      console.log("set cookie");
      var event_msg = { billi: 'meow', detail: result.success ? obj.redirect.on_success : obj.redirect.on_error }
      console.log("script", 22, event_msg)
      var event = new CustomEvent("stop_loading", event_msg);
      document.dispatchEvent(event);
      console.log("dispatched");
    }
  })
}
function getUser() {
  var user = getCookie("user");
  return user && JSON.parse(user);
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
var getCookie = function (name) {
  var match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (match) return match[2];
};
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
const fun = function (googleUser) {
  console.log("Signed in: ");
  var event = new CustomEvent("google_user_loggedin", { credential: googleUser.getAuthResponse().id_token });
  document.dispatchEvent(event);
  validateGoogleUser({ credential: googleUser.getAuthResponse().id_token });
  console.log("dispatched");
};
function onLoadGoogleCallback() {
  var event = new CustomEvent("script_loaded");
  document.dispatchEvent(event);
  gapi.load("auth2", function () {
    auth2 = gapi.auth2.init({
      client_id:
        "18978223542-8ujp4l15lb3brvu4o130gea51o488gja.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
      scope: "profile",
    });

    auth2.attachClickHandler(element, {}, fun, function (error) {
      console.log("Sign-in error", error);
    });
  });

  element = document.getElementById("googleSignIn");
}
function attachClickHandler() {
  gapi.load("auth2", function () {
    auth2 = gapi.auth2.init({
      client_id:
        "18978223542-8ujp4l15lb3brvu4o130gea51o488gja.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
      scope: "profile",
    });

    auth2.attachClickHandler(element, {}, fun, function (error) {
      console.log("Sign-in error", error);
    });
  });
  element = document.getElementById("googleSignIn");
}
function loadScript(url, cb) {
  var script = document.createElement("script");
  script.setAttribute("src", url);
  var status = { loaded: false };
  script.onload = () => {
    status.loaded = true;
    if (cb) {
      cb();
    }
  }
  document.body.appendChild(script);
  return status;
}

  //NAV


