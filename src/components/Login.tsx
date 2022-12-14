import React, {useState} from "react";
import {getData} from "../helpers/api"


export const handleSubmit = async ( email: string, password: string): Promise<boolean> => {
  if (email && password) {
    await getData(email, password)
    return true
  }

  return false
}

interface Props {
  submit: ( email: string, password: string) => Promise<boolean>
}

const Login = ({submit = handleSubmit}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState({text: "Continue", sending: false});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submit( email, password)
  }


  return (
    <div
      className="bg-opacity-70 bg-slate-900 fixed left-0 h-screen inset-0 overflow-hidden right-0 top-0 w-full z-50">

      <div className="grid h-full items-center max-w-md mx-auto px-4 py-8 relative">
        <div className="bg-white overflow-y-auto max-h-full relative rounded-lg">
          <div className="border-b flex items-center text-center justify-center p-4 rounded-t">
            <h3 className="font-bold text-slate-900 text-xl">
              Login
            </h3>
            <button
              type="button"
              className="bg-transparent hover:bg-slate-200 hover:text-slate-900 inline-flex items-center p-1.5 rounded-lg text-slate-400 text-sm"
            >
              <span className="material-icons text-2xl"><span className="fa fa-close"/></span>
            </button>
          </div>

          <div className="p-6 pb-8">
            <div className="grid gap-y-4">

              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-y-2">
                  <label htmlFor="email" className="text-sm font-semibold">Email</label>
                  <input data-testid="email" type="email" id="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}
                         className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:border-blue-400 px-2.5 py-2 focus-within:outline-none"
                         placeholder="johndoe@mail.com" required/>
                </div>
                <div className="grid gap-y-2">
                  <label htmlFor="password" className="text-sm font-semibold">Password</label>
                  <input data-testid="password" type="password" id="password" value={password} name="password"
                         onChange={(e) => setPassword(e.target.value)}
                         className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:border-blue-400 px-2.5 py-2 focus-within:outline-none"
                         placeholder="********" required/>
                </div>
                <div className="grid md:flex items-center justify-between gap-y-4 gap-x-5 pb-3">

                </div>
                <button data-testid="submit" type="submit" role="button" value={btn.text} name="Submit"
                        className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm uppercase px-5 py-3.5 tracking-widest">
                  <p> button</p>
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login