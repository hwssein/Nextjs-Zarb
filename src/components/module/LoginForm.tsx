import { Bool, LoginFormType } from "@/types/types";

import { Input } from "../ui/input";

import { Eye, EyeOff } from "lucide-react";
import FormButton from "../element/FormButton";

interface LoginFormProps {
  form: LoginFormType;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isShowPassword: Bool;
  setIsShowPassword: (value: Bool) => void;
  loginHandler: () => void;
}

function LoginForm({
  form,
  changeHandler,
  isShowPassword,
  setIsShowPassword,
  loginHandler,
}: LoginFormProps) {
  return (
    <>
      <form
        action={loginHandler}
        className="w-full flex flex-col items-center justify-start gap-3 px-1 sm:w-5/6"
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={changeHandler}
          required
          className="bg-popover"
        ></Input>

        <div className="w-full flex items-center bg-popover rounded-md border border-input p-1 shadow-sm transition-colors focus-within:border-primary">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={changeHandler}
            required
            className="w-full h-7 bg-popover border-0 px-2 placeholder:text-muted-foreground text-base md:text-sm peer"
          />
          {isShowPassword ? (
            <span
              onClick={() => setIsShowPassword(false)}
              className="cursor-pointer"
            >
              <Eye size={20} />
            </span>
          ) : (
            <span
              onClick={() => setIsShowPassword(true)}
              className="cursor-pointer"
            >
              <EyeOff size={20} />
            </span>
          )}
        </div>

        <div className="w-3/6 mt-2">
          <FormButton title="Login" />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
