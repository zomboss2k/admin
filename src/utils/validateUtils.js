export const validateRegex = {
  // phone: /((\+84[0-9]{9})|(\b0[0-9]{9}))(?![0-9])/gs,
  phone: /(^840|^84)+([35789][0-9]{8})\b/g,
  password: /^(?=.*[a-z])(?=.*[0-9])(?=.*\d).{6,}$/g,
  username: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+([_.])$/g,
  fullName: /^[a-z0-9 ]{3,100}$/iu,
  email:
    // eslint-disable-next-line
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};