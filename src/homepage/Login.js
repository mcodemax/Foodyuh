import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';


//might need to implement isLoading banner until requests are finished
//for logging in
function Login({ login }) {
    const navigate = useNavigate();
    const [loginErrors, setLoginErrors] = useState([]);

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().min(1).required("Required"),
        password: Yup.string().min(1).required("Required"),
    });

    const onSubmit = async (values, {resetForm}) => {
        console.debug('In Login.js, onSubmit')
        console.log("Form Data: ", values);//comment out later so password not revealed
        
        const res = await login(values.username, values.password);

        if(res.success){
            navigate("/user/profile"); 
        }else{
            setLoginErrors(res.errors)//trouble shoot later how to actuallyy display these properly
            resetForm({});
        }
        //if login fail show error message and navigate back2Login

        // https://github.com/jaredpalmer/formik/issues/446
    };
    
    return (
        <div className="Login">
            { loginErrors.length ? 
                loginErrors.map(error => {
                    return (
                        <div className="Login-failed error">
                            <p>{error}</p>
                        </div> 
                    )
                })
                : ``
            }
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className={'Login-form'}>
                    <div className={'Login-form-username form'}>
                        <label htmlFor="username">Username</label>
                        <Field type="text" id="username" name="username" />
                        <p className='form-warning'><ErrorMessage name="username"  /></p>
                    </div>
                    <div className={'Login-form-password form'}>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <p className='form-warning'><ErrorMessage name="password"  /></p>
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;