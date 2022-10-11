import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import { useForm } from "react-hook-form"
import { useState } from 'react'

const Home = () => {

  const [isPosting,setIsPosting] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  const [errorMessage,setErrorMessage] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {
    
    setIsPosting(true)

    axios.post('https://greenfuturefestival-vvip.herokuapp.com/api/form-entries', {
      "data": {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "emailAddress": data.emailAddress,
        "jobTitle": data.jobTitle,
        "institution": data.institution,
        "phoneNumber": `+62${data.phoneNumber.replace(/^0+/, '')}`
      }
    }, {
      "content-type": "application/json"
    })
    .then(function (response) {
      setIsPosting(false)
      setIsSuccess(true)
      setErrorMessage(false)
      reset()
    })
    .catch(function (error) {
      setIsPosting(false)
      setErrorMessage(true)
      setIsSuccess(false)
    });

  }

  return (
    <>
      <Head>
        <title>Green Future Festival - VVIP Form</title>
        <meta name="description" content="Interested in going to the Green Future Festival? Sign this form to get noticed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <div className="bg-white max-w-[700px] mx-auto shadow-xl min-h-screen py-20 px-6 bg-[url('/images/bg.svg')] bg-bottom bg-no-repeat bg-contain bg-fixed sm:px-20">
          <img src="/images/logo.svg" className="mx-auto w-[70%] max-w-[300px] mb-20" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid grid-cols-1 gap-3 mb-20 sm:grid-cols-2 ${isPosting ? 'opacity-30 pointer-events-none' : '' }`}>
              <div className="">
                <input className="border border-solid border-slate-900 rounded py-2 px-4 bg-[transparent] w-full focus:bg-white active:bg-white" placeholder="First Name" {...register("firstName", { required: true })} />
                {errors.firstName && <span className="text-xs text-red-500 italic">This field is required</span>}
              </div>
              <div className="">
                <input className="border border-solid border-slate-900 rounded py-2 px-4 bg-[transparent] w-full focus:bg-white active:bg-white" placeholder="Last Name" {...register("lastName", { required: true })} />
                {errors.lastName && <span className="text-xs text-red-500 italic">This field is required</span>}
              </div>
              <div className="sm:col-span-2">
                <input type="email" className="border border-solid border-slate-900 rounded py-2 px-4 bg-[transparent] w-full focus:bg-white active:bg-white" placeholder="Email" {...register("emailAddress", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })} />
                
                {errors.emailAddress && <span className="text-xs text-red-500 italic">Invalid email address</span>}
                {errors.emailAddress && <span className="text-xs text-red-500 italic">This field is required</span>}
              </div>
              <div className="">
                <input className="border border-solid border-slate-900 rounded py-2 px-4 bg-[transparent] w-full focus:bg-white active:bg-white" placeholder="Job Title / Position" {...register("jobTitle", { required: true })} />
                {errors.jobTitle && <span className="text-xs text-red-500 italic">This field is required</span>}
              </div>
              <div className="">
                <input className="border border-solid border-slate-900 rounded py-2 px-4 bg-[transparent] w-full focus:bg-white active:bg-white" placeholder="Institution / Organization" {...register("institution", { required: true })} />
                {errors.institution && <span className="text-xs text-red-500 italic">This field is required</span>}
              </div>
              <div className="sm:col-span-2">
                <div className="flex space-x-2">
                  <div><input type="text" className="border border-solid border-slate-900 rounded p-2 bg-slate-200 w-16 text-center" value="+62" readOnly /></div>
                  <div className="grow">
                    <input className="border border-solid border-slate-900 rounded py-2 px-4 bg-[transparent] w-full focus:bg-white active:bg-white" placeholder="Phone Number" {...register("phoneNumber", { required: true })} />
                    {errors.phoneNumber && <span className="text-xs text-red-500 italic">This field is required</span>}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-10 sm:col-span-2">
                <div><input type="submit" value="Sign Up" className="rounded-xl py-2 px-4 bg-[#1A8B44] w-full text-white w-[260px] max-w-full uppercase font-bold" /></div>
              </div>
              { (errorMessage && !isSuccess ) && <div class="sm:col-span-2"><p className="text-red-500 font-semibold text-center">Sorry something wrong. Please try again later.</p></div> }
              { (!errorMessage && isSuccess ) && <div class="sm:col-span-2"><p className="text-[#1A8B44] font-semibold text-center">Thank you for your submission!</p></div> }
            </div>
          </form>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <img src="/images/logo-sunenergy.svg" alt="SunEnergy" className="h-[30px] w-auto mx-auto" />
            </div>
            <div>
              <img src="/images/logo-sunterra.svg" alt="SunEnergy" className="h-[30px] w-auto mx-auto" />
            </div>
            <div>
              <img src="/images/logo-sunmobility.svg" alt="SunEnergy" className="h-[30px] w-auto mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home