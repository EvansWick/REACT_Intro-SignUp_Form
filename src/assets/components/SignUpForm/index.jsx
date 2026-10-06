import { Component } from "react";
import styles from "./SignUpForm.module.css";
import classNames from "classnames";

const VALIDATION_REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\];':"\\|,./?]).{8,25}$/, // Мінімум 8 символів,
  // літери та цифри + спец-символи
  nickName: /^[a-zA-Z0-9_]{3,16}$/, // Від 3 до 16 символів, без пробілів
};

const ERRORS_MAP = {
  email: `Введіть справжній Email`,
  password: `Пароль має включати велику літеру, спец символ, цифру та бути від 8 до 25 символів`, // Мінімум 8 символів,
  // літери та цифри + спец-символи
  nickName: `Ім'я користувача має бути написане латиницею від 3 до 16 символів, без пробілів та спец символів`, // Від 3 до 16 символів, без пробілів
  checkPassword: `Паролі мають співпадати`,
  isRulsAgree: `Погодьтеся з умовами користування`,
};

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickName: "",
      email: "",
      password: "",

      checkPassword: "",
      showPassword: false,
      isRulsAgree: false,

      errors: {},
    };
  }

  // changeInputHandler = (e) => {
  //   e.stopPropagation();
  //   const { name, value, type, checked } = e.target;

  //   this.setState((prevState) => {
  //     const errs = this.checkUserInfo();
  //     return {
  //       [name]: type === "checkbox" ? checked : value,

  //       errors: {
  //         ...prevState.errors,
  //         [name]: errs[name],
  //       },
  //     };
  //   });
  // };

  changeInputHandler = (e) => {
    e.stopPropagation();
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    this.setState((prevState) => {
      const errorsList = { ...prevState.errors };

      if (
        name !== "checkPassword" &&
        name !== "isRulsAgree" &&
        name !== "showPassword"
      ) {
        errorsList[name] = VALIDATION_REGEX[name].test(newValue)
          ? ""
          : ERRORS_MAP[name];
      }
      switch (name) {
        case "checkPassword":
          errorsList[name] =
            newValue === prevState.password ? "" : ERRORS_MAP[name];
          break;
        case "isRulsAgree":
          errorsList[name] = newValue ? "" : ERRORS_MAP[name];
          break;
      }

      return {
        [name]: newValue,
        errors: errorsList,
      };
    });
  };

  sendNewUser = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // конструювання об'єкту юзера
    const errList = this.checkUserInfo();
    const isCorrectUser =
      !errList.nickName &&
      !errList.email &&
      !errList.password &&
      !errList.checkPassword &&
      !errList.isRulsAgree;
    if (isCorrectUser) {
      const { checkPassword, showPassword, isRulsAgree, errors, ...newUser } =
        this.state;
      console.log(JSON.stringify(newUser));
    } else console.log(Object.keys(this.checkUserInfo()).length);
  };
  checkUserInfo(prevstate = this.state) {
    // Перевірка даних
    const { nickName, email, password, checkPassword, isRulsAgree } = prevstate;
    const newErrors = {};

    // login
    if (!VALIDATION_REGEX.nickName.test(nickName)) {
      newErrors.nickName = `Ім'я користувача має бути написане латиницею від 3 до 16 символів, без пробілів та спец символів`;
    } else {
      newErrors.nickName = "";
    }
    // email
    if (!VALIDATION_REGEX.email.test(email)) {
      newErrors.email = `Введіть справжній Email`;
      console.log(newErrors.email);
    } else {
      newErrors.email = "";
    }
    // password
    if (!VALIDATION_REGEX.password.test(password)) {
      newErrors.password = `Пароль має включати велику літеру, спец символ, цифру та бути від 8 до 25 символів`;
      console.log(newErrors.password);
    } else {
      newErrors.password = "";
    }
    // password and check
    if (password !== checkPassword) {
      newErrors.checkPassword = `Паролі мають співпадати`;
      console.log(newErrors.checkPassword);
    } else {
      newErrors.checkPassword = "";
    }
    // agreement
    if (!isRulsAgree) {
      newErrors.isRulsAgree = `Погодьтеся з умовами користування`;
      console.log(newErrors.isRulsAgree);
    } else {
      newErrors.isRulsAgree = "";
    }

    return newErrors;
  }
  render() {
    return (
      <>
        <h1 className={styles.formTitle}>Створіть аккаунт</h1>
        <form onSubmit={this.sendNewUser} className={styles.form}>
          <label className={styles.labelRow}>
            <span className={styles.labelTitle}>Ім'я користувача</span>
            <input
              required
              autoFocus
              placeholder="UserName"
              type="text"
              name="nickName"
              value={this.state.nickName}
              className={classNames(styles.input, {
                [styles.inputValid]:
                  !this.state.errors.nickName && this.state.nickName.length > 0,
                [styles.inputInvalid]: Boolean(this.state.errors.nickName),
              })}
              onChange={this.changeInputHandler}
            />
          </label>
          {this.state.errors.nickName && (
            <span className={styles.errorText}>
              {this.state.errors.nickName}
            </span>
          )}

          <label className={styles.labelRow}>
            <span className={styles.labelTitle}>Пошта</span>
            <input
              required
              placeholder="example@gmail.com"
              type="email"
              name="email"
              value={this.state.email}
              className={classNames(styles.input, {
                [styles.inputValid]:
                  !this.state.errors.email && this.state.email.length > 0,
                [styles.inputInvalid]: Boolean(this.state.errors.email),
              })}
              onChange={this.changeInputHandler}
            />
          </label>
          {this.state.errors.email && (
            <span className={styles.errorText}>{this.state.errors.email}</span>
          )}

          <div className={styles.labelRow}>
            <input
              name="showPassword"
              onChange={this.changeInputHandler}
              checked={this.state.showPassword}
              className={styles.inputShowPassword}
              type="checkbox"
            />
            <span className={styles.labelTitle}>Пароль</span>
            <input
              id="passwordId"
              required
              placeholder="Password"
              type={this.state.showPassword ? "text" : "password"}
              name="password"
              value={this.state.password}
              className={classNames(styles.input, {
                [styles.inputValid]:
                  !this.state.errors.password && this.state.password.length > 0,
                [styles.inputInvalid]: Boolean(this.state.errors.password),
              })}
              onChange={this.changeInputHandler}
            />
          </div>
          {this.state.errors.password && (
            <span className={styles.errorText}>
              {this.state.errors.password}
            </span>
          )}

          <label className={styles.labelRow}>
            <span className={styles.labelTitle}>Перевірка пароля</span>
            <input
              required
              type={this.state.showPassword ? "text" : "password"}
              name="checkPassword"
              placeholder="CheckPassword"
              value={this.state.checkPassword}
              className={classNames(styles.input, {
                [styles.inputValid]:
                  !this.state.errors.checkPassword &&
                  this.state.checkPassword.length > 0,
                [styles.inputInvalid]: Boolean(this.state.errors.checkPassword),
              })}
              onChange={this.changeInputHandler}
            />
          </label>
          {this.state.errors.checkPassword && (
            <span className={styles.errorText}>
              {this.state.errors.checkPassword}
            </span>
          )}
          <label className={styles.rulsAgreeContainer}>
            <input
              checked={this.state.isRulsAgree}
              onChange={this.changeInputHandler}
              type="checkbox"
              name="isRulsAgree"
              id="agreementCheckbox"
            />
            <span className={styles.agreeTitle}>
              Я погоджуюсь з правилами користування
            </span>
          </label>
          {this.state.errors.isRulsAgree && (
            <span className={styles.errorText}>
              {this.state.errors.isRulsAgree}
            </span>
          )}
          <button className={styles.submitButton} type="submit">
            Реєстрація
          </button>
          <div className={styles.toLogInContainer}>
            <span>Вже маєте аккаунт?</span>
            <a href="#" className={styles.toLogInLink}>
              Увійдіть в нього
            </a>
          </div>
        </form>
      </>
    );
  }
}
