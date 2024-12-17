import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '../validation/Yup'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, Flip } from 'react-toastify';
import { auth } from '../firebase/Firebase';
import InputMask from 'react-input-mask';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {

    const { email, password } = values;

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      if (user) {
        toast.success(`Hesab yaradıldı! Xoş gəldiniz ${user.email}`, {
          position: "top-right",
          autoClose: 3500,
          transition: Flip,
        });
        setTimeout(() => navigate('/'), 4000); 
      }
    } catch (error) {
      toast.error('Hesab sistemdə mövcuddur!', {
        position: "top-right",
        autoClose: 3500,
        transition: Flip,
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-register">
      <div className="container containerReg">
        <Formik
          initialValues={{ email: '',  number: '', password: '', confirmPassword: '' }}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="title">Qeydiyyat</div>

              <div className="input-box">
                <Field
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
                <Field name="number">
                  {({ field }) => (
                    <InputMask
                      {...field}
                      mask="(99) 999-99-99" 
                      placeholder="Mobil nömrə"
                      className="form-control"
                    />
                  )}
                </Field>
                <div className="underline"></div>
                <ErrorMessage
                  name="number"
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

              <div className="input-box">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Şifrəni təsdiqləyin"
                  className="form-control"
                />
                <div className="underline"></div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-box button">
                <button 
                  type="submit" 
                  disabled={!isValid || isSubmitting} // yalnisliq varsa submit etme
                >
                  Qeydiyyatdan keç
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="option"> və ya </div>
        <div onClick={() => navigate('/login')} className="option2">
          Artıq hesabınız var ? Hesaba giriş
        </div>
      </div>
    </div>
  );
}

export default Register;