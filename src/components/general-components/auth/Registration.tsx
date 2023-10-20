import { useState } from "react"
import { InputPassword } from "../../ui/InputPassword"
import { CheckBox } from "../../ui/CheckBox"
import { InputMain } from "../../ui/InputMain"
import {
    inNotEmpty,
    emailPattern,
    isPasswordPattern,
} from "../../../utils/patterns"
import { useAppSelector } from "../../../utils/hooks"
import { changeAuthError } from "../../../reducer/auth"
import { useDispatch } from "react-redux"

const Registration = ({
    login,
    setLogin,
    password,
    setPassword,
    fullName,
    setFullName,
    handlerAuth,
}: {
    login: string
    setLogin: (s: string) => void
    password: string
    setPassword: (s: string) => void
    fullName: string
    setFullName: (s: string) => void
    handlerAuth: () => void
}) => {

    const { authError } = useAppSelector(s => s.authReducer)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("test2000")
    const [validation, setValidation] = useState({
        login: new RegExp(emailPattern).test(login),
        password: new RegExp(isPasswordPattern).test(password),
        confirmPassword: new RegExp(`^${password}$`).test(confirmPassword),
        fullName: new RegExp(inNotEmpty).test(fullName)
    })
    
    const disabledSingUp =
        validation.login &&
        validation.password &&
        validation.fullName &&
        (confirmPassword === password)
        
    return (
        <>
            <div className="registration">
                <InputMain
                    value={login}
                    setValue={(s) => {
                        setLogin(s)
                        dispatch(changeAuthError(''))
                    }}
                    placeholder={"Email"}
                    errorMessage={authError ? authError : "Invalid login, example@example.example" }
                    pattern={emailPattern}
                    isValidated={!Boolean(authError)}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, login: s })
                    }
                />
                <InputMain
                    value={fullName}
                    setValue={setFullName}
                    placeholder={"Full Name"}
                    errorMessage={"Еhe name must be"}
                    pattern={inNotEmpty}
                    isValidated={validation.fullName}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, fullName: s })
                    }
                />
                <InputPassword
                    password={password}
                    setPassword={setPassword}
                    errorMessage={
                        "Invalid password, min 8, numbers and letters"
                    }
                    pattern={isPasswordPattern}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, password: s })
                    }
                />

                <InputPassword
                    password={confirmPassword}
                    setPassword={setConfirmPassword}
                    errorMessage={
                        "Password mismatch"
                    }
                    pattern={`^${password}$`}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, confirmPassword: s })
                    }
                />

                <div className="registration__policy">
                    <CheckBox click={() => setChecked((s) => !s)} />
                    <div>
                        <p>By Signing up, you agree to the</p>
                        <p>
                            <b> Terms of Service</b> and <b>Privacy Policy</b>
                        </p>
                    </div>
                </div>
            </div>
            <button
                className={`login__button
                ${
                    (disabledSingUp) ||
                    "login__button--disabled"
                }
            `}
                onClick={handlerAuth}
                disabled={!disabledSingUp}
            >
                Sing Up
            </button>
        </>
    )
}

export default Registration
