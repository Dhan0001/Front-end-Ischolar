function setRouter() {
  switch (window.location.pathname) {
    // If you are logged in you cant access outside pages; redirect to dashboard
    case "/":
    case "/index.html":
    case "/register.html":
      if (localStorage.getItem("token")) {
        window.location.pathname = "/dashboard.html";
      }
      break;

    // If you are not logged in you cant access dashboard pages; redirect to /
    case "/dashboard.html":
    case "/booksborrowed.html":
    case "/departments.html":
    case "/mybookshelf.html":
    case "/ccis.html":
    case "/ced.html":
      if (!localStorage.getItem("token")) {
        window.location.pathname = "/";
      }
      break;
    // For Admin Users only; redirect to /dashboard
    case "/users.html":
      if (localStorage.getItem("role") != "Admin") {
        window.location.pathname = "/dashboard.html";
      }
      break;

    default:
      break;
  }
}

export { setRouter };
