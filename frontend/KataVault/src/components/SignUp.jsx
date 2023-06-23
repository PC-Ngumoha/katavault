import { useState } from 'react';
import { account } from '../appwrite/appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    //signup
    const signupUser = async (e) => {
        e.preventDefault() //we use this method because we are sendong infromation to the backend and we dont wanrto clear it on refresh
        const result = account.create(
            uuidv4(),
            user.email,
            user.name
        );
        result.then(function (response) {
            console.log(response);
            // if it is successful we want to navigate to a different page
            navigate("/profile") //success
         }, function (error) {
            console.log(error);
         });
    }
    
  return (
    <div>
        <form action = '#' method='POST'>
            <div>
                <label
                htmlFor='name'
                className=''
                >
                    Name
                </label>
                <div>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      required
                      onChange={(e) => {
                        setUser({
                        ...user,
                        name: e.target.value
                    })}}
                    />
                </div>
            </div>
            <div>
                <label
                htmlFor='name'
                className=''
                >
                    Email
                </label>
                <div>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      onChange={(e) => { 
                        setUser({
                        ...user,
                        email: e.target.value
                    })}}
                    />
                </div>
            </div>
            <div>
                <label
                htmlFor='password'
                className=''
                >
                    Password
                </label>
                <div>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      onChange={(e) => { 
                        setUser({
                        ...user,
                        password: e.target.value
                    })}}
                    />
                </div>
            </div>
            <button
                type='submit'
                onClick={signupUser}
            >
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignUp