"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface AuthPageProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

interface LoginForm{
  email: string;
  password: string;
}
interface SignupForm{
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}
interface ForgotForm{
  email: string;
}
interface ResetForm{
  password: string;
  confirmPassword: string;  
}

const AuthPage: React.FC<AuthPageProps> = ({isLoginOpen, setIsLoginOpen}) => {
    const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">('login');
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const [LoginLoding, setLoginLoading] = useState(false);
    const [signupLoding, setSignupLoading] = useState(false);
    const [ForgetLoding, setForgetLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);  


    const {register:registerLogin, handleSubmit: handleSubmitLogin, formState: {errors: errorsLogin}} = useForm<LoginForm>({});
    const {register:registerSignup, handleSubmit: handleSubmitSignup, formState: {errors: errorsSignup}} = useForm<SignupForm>({});
    const {register:registerForgot, handleSubmit: handleSubmitForgot, formState: {errors: errorsForgot}} = useForm<ForgotForm>({});
    const {register:registerReset, handleSubmit: handleSubmitReset, formState: {errors: errorsReset}} = useForm<ResetForm>({});
  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className='sm:max-w-[425px] p-6'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-bold mb-4'>
            Welcome To Book kart
          </DialogTitle>
        </DialogHeader>
        
        <Tabs 
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as "login" | "signup" | "forgot")}>
          <TabsList className='grid w-full grid-cols-3 mb-6'>
            <TabsTrigger value='login'>Login</TabsTrigger>
            <TabsTrigger value='signup'>Signup</TabsTrigger>
            <TabsTrigger value='forgot'>Forgot</TabsTrigger>
          </TabsList>
          
     <AnimatePresence mode='wait'>
      <motion.div
         key={currentTab}
         initial={{opacity:0, y:20}}
         animate={{opacity:1, y:0}}
         exit={{opacity:0, y:-20}} 
         transition={{duration:0.3}}
      >
        <TabsContent value='login' className='space-y-4'>
          <form className='space-y-4'>
            <div className='relative'>
              <Input 
               {
                  ...registerLogin('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })
                }
                placeholder='Email'
                type='email'
                className='pl-10'
                /> 
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20}/>
            </div>
            {
              errorsLogin.email && (
                <p className='text-red-500 text-sm'>{errorsLogin.email.message}</p>
              )
            }
            <div className='relative'>
              <Input 
               {
                  ...registerLogin('password', {
                    required: "Password is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Password address"
                    }
                  })
                }
                placeholder='Password'
                type={showPassword? 'text' : 'password'}
                className='pl-10'
                /> 
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20}/>
              {
                showPassword ? (
                  <Eye className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer' size={20} onClick={() => setShowPassword(false)}/>
                ) : (
                  <EyeOff className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer' size={20} onClick={() => setShowPassword(true)}/>
                )
              }
            </div>
            {
              errorsLogin.password && (
                <p className='text-red-500 text-sm'>{errorsLogin.password.message}</p>
              )
            }
            

            <Button type='submit' className='w-full font-bold' >
              {LoginLoding ? 
              <>
              <Loader2 className='animate-spin mr-2' size={20}/>
              </> : 'Login'}
            </Button>
          </form>
            <div className='flex items-center my-4'>
              <div className='h-px flex-1 bg-gray-300'></div>
              <div className='mx-2 text-gray-500 text-sm'>Or</div>
              <div className='h-px flex-1 bg-gray-300'></div>  
            </div>    

          <Button className='w-full item-center gap-2 flex justify-center bg-white text-gray-700 border-gray-300 border hover:bg-gray-50'>
            {
              googleLoading ?
              <>
              <Loader2 className='animate-spin mr-2' size={20}/>
               <Image src="/icons/google.svg" alt="Google" width={20} height={20}/>
              Login with Google
              </>:
              <> 
               <Image src="/icons/google.svg" alt="Google" width={20} height={20}/>
              Login with Google
              </>
            }
          </Button>

        </TabsContent>
        <TabsContent value='signup' className='space-y-4'>
          <form className='space-y-4'>
             <div className='relative'>
              <Input 
               {
                  ...registerSignup('name', {
                    required: "Name is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid name address"
                    }
                  })
                }
                placeholder='Name'
                type='text'
                className='pl-10'
                /> 
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20}/>
            </div>
            {
              errorsSignup.name && (
                <p className='text-red-500 text-sm'>{errorsSignup.name.message}</p>
              )
            }
            <div className='relative'>
              <Input 
               {
                  ...registerSignup('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })
                }
                placeholder='Email'
                type='email'
                className='pl-10'
                /> 
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20}/>
            </div>
            {
              errorsSignup.email && (
                <p className='text-red-500 text-sm'>{errorsSignup.email.message}</p>
              )
            }
            <div className='relative'>
              <Input 
               {
                  ...registerSignup('password', {
                    required: "Password is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Password address"
                    }
                  })
                }
                placeholder='Password'
                type={showPassword? 'text' : 'password'}
                className='pl-10'
                /> 
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20}/>
              {
                showPassword ? (
                  <Eye className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer' size={20} onClick={() => setShowPassword(false)}/>
                ) : (
                  <EyeOff className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer' size={20} onClick={() => setShowPassword(true)}/>
                )
              }
            </div>
            {
              errorsSignup.password && (
                <p className='text-red-500 text-sm'>{errorsSignup.password.message}</p>
              )
            }
            <div className='flex items-center'>
              <input 
                type='checkbox'
                {
                  ...registerSignup('agreeTerms', {
                    required: "You must agree to the terms and conditions"
                  })
                }
                className='mr-2'
                />
                <label className='text-sm text-gray-500'>I agree to the terms & Condition</label>
            </div>

            <Button type='submit' className='w-full font-bold' >
              {signupLoding ? 
              <>
              <Loader2 className='animate-spin mr-2' size={20}/>
              </> : 'Signup'}
            </Button>
          </form>
            <div className='flex items-center my-4'>
              <div className='h-px flex-1 bg-gray-300'></div>
              <div className='mx-2 text-gray-500 text-sm'>Or</div>
              <div className='h-px flex-1 bg-gray-300'></div>  
            </div>    

          <Button className='w-full item-center gap-2 flex justify-center bg-white text-gray-700 border-gray-300 border hover:bg-gray-50'>
         
            {
              googleLoading ?
              <>
              <Loader2 className='animate-spin mr-2' size={20}/>
               <Image src="/icons/google.svg" alt="Google" width={20} height={20}/>
              Login with Google
              </>:
              <> 
               <Image src="/icons/google.svg" alt="Google" width={20} height={20}/>
              Login with Google
              </>
            }
           
          </Button>

        </TabsContent>
         <TabsContent value='forgot' className='space-y-4'>
          {
            forgotPasswordSuccess ? 
            <>
            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              className='text-center space-y-4'>
                
                <CheckCircle2 className='w-16 h-16 text-green-400 mx-auto'/>
                <h3 className='text-xl font-semibold text-gray-700'>
                  Reset Link sent
                </h3>
                <p className='text-gray-500'>
                  A reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
                </p>
                <Button onClick={()=>{setForgotPasswordSuccess(false)}} className='w-full'>
                  Resend Another Link
                </Button>
            </motion.div>
            </> 
            :
         
          <form className='space-y-4'>
            <div className='relative'>
              <Input 
               {
                  ...registerForgot('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })
                }
                placeholder='Email'
                type='email'
                className='pl-10'
                /> 
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20}/>
            </div>
            {
              errorsForgot.email && (
                <p className='text-red-500 text-sm'>{errorsForgot.email.message}</p>
              )
            }

            <Button type='submit' className='w-full font-bold' >
              {ForgetLoding ? 
              <>
              <Loader2 className='animate-spin mr-2' size={20}/>
              </> : 'Login'}
            </Button>
          </form>
          }
        </TabsContent>
      </motion.div>
     </AnimatePresence>
        </Tabs>
        <p className='text-sm text-gray-600 text-center'>
            by clicking "agree", you agree to our <Link onClick={()=>setIsLoginOpen(false)} href="/terms&Condition" className='text-blue-500 cursor-pointer hover:underline'>Terms of Service</Link> and <Link href="/privacyPolicy" onClick={()=>setIsLoginOpen(false)} className='text-blue-500 cursor-pointer hover:underline'>Privacy Policy</Link>
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default AuthPage