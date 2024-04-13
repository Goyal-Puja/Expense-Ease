import React, { useContext } from 'react';
import { authContext  } from '@/lib/store/auth-context';
import { SiHey } from "react-icons/si";

import { FcGoogle } from 'react-icons/fc';

function SignIn(){
    const { googleLoginHandler } = useContext(authContext);
return (
    <main className="container max-w-2xl px-6 mx-auto">
        <h1 className='mb-6 flex justify-between gap-6 text-6xl font-bold text-center'>Welcome <SiHey /></h1>
        <div className='mt-6 flex flex-col overflow-hidden shadow-md bg-slate-800 rounded-2xl'>
            <div className='h-52'>
              <img className='objcet-cover w-full h-full' src='https://mir-s3-cdn-cf.behance.net/projects/404/bd139f87186189.Y3JvcCw5OTksNzgyLDAsMTQ.png'/>
            </div>
            <div className='px-4 py-4'>
                <h3 className='text-2xl text-center'>Please sign in to continue</h3>
<button onClick={googleLoginHandler} className='flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-slate-700 rounded-lg'><FcGoogle className='text-2xl'/>Google</button>
            </div>
        </div>

    </main>
)
}
export default SignIn;