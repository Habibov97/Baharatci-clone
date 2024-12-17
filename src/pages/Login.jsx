import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../validation/Yup';
import { signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase/Firebase';
import { toast, Flip } from 'react-toastify';

const provider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  // GOOGLE ile Giris
  const loginWithGoogle = async()=> {
    try {
      const response = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(response);
      // const token = credential.accessToken;
      const user = response.user
      
      if(user) {
        toast.success(`Xoş gəldiniz ${user.displayName}!`, {position: "top-right",
          autoClose: 3500, transition: Flip });
        navigate('/');
        console.log(user);
      }
    } 
    catch (error) {
      toast.error('Xəta baş verdi.' + error)
    }
  }

  // Form submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      const response =  await signInWithEmailAndPassword( auth, email, password )
      const user = response.user
      if(user){
        toast.success(`Xoş gəldiniz ${email.slice(0, email.indexOf('@'))}!`, {position: "top-right",
          autoClose: 3500, transition: Flip });
        navigate('/')
      }
    } 
    catch (error) {
      toast.error('Email və ya şifrə yalnışdır.', {position: "top-center",
        autoClose: 3500, transition: Flip });
    }


    setSubmitting(false);
  };

  return (
    <div className="bg-login">
      <div className="container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema} 
          onSubmit={handleSubmit}
          validateOnBlur={false} 
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="title">Hesaba giriş</div>

              <div className="input-box ">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                />
                <div className="underline"></div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-box">
                <Field
                  type="password"
                  name="password"
                  placeholder="Şifrə"
                  className="form-control"
                />
                <div className="underline"></div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-box button">
                <button type="submit" disabled={!isValid || isSubmitting}>
                  Giriş
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="option">və ya</div>
        <div className="twitter">
          <a onClick={loginWithGoogle} ><i className="fab fa-google"></i>Google hesabı ilə giriş edin</a>
        </div>
        {/* <div className="facebook">
          <a ><i className="fab fa-facebook-f"></i>Facebook hesabı ilə giriş edin</a>
        </div> */}
        <div onClick={() => navigate('/register')} className="option2">
          Yeni müştərisiniz ? Qeydiyyatdan keçin
        </div>
      </div>
    </div>
  );
}

export default Login;