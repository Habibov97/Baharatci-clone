import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email formatı düzgün deyil.')
    .test(
      'min-email-name',
      'E-poçt adı "@" hərfindən əvvəl ən azı 4 simvol olmalıdır',
      (value) => {
        const emailName = value ? value.split('@')[0] : '';
        return emailName.length >= 4;
      }
    )
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|mail\.ru)$/,
      'E-poçt domeni düzgün deyil!'
    )
    .required('Email is tələb olunur.'),
  password: Yup.string()
    .min(6, 'Şifrə ən azı 6 simvoldan ibarət olmalıdır!')
    .required('Şifrə tələb olunur!'),
});


export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-poçt formatı yanlışdır')
    .test(
      'min-email-name',
      'E-poçt adı ən az 4 ən çox 15 simvol olmalıdır',
      (value) => {
        const emailName = value ? value.split('@')[0] : '';
        if(emailName.length >= 4 && emailName.length < 14){
          return true;
        }
        
      }
    )
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|mail\.ru)$/,
      'E-poçt domeni düzgün deyil!'
    )
    .required('Email tələb olunur.'),
  password: Yup.string()
    .min(6, 'Şifrə ən azı 6 simvoldan ibarət olmalıdır!')
    .required('Şifrə tələb olunur!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Şifrələr eyni olmalıdır!')
    .required('Şifrəni təstiqləyin!'),
  number: Yup.string()
  .matches(
    /^\((50|55|70|10|90)\) \d{3}-\d{2}-\d{2}$/, 
    'Mobil nömrə formatı yanlışdır!'
  )
    .required('Mobil nömrə tələb olunur!'),
});
