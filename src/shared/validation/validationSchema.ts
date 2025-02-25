import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useValidationSchema = () => {
    const { t } = useTranslation();

    return yup.object().shape({
        user_name: yup
            .string()
            .required(t('validation.user_name.required')),
        password: yup
            .string()
            .min(6, t('validation.password.minLength'))
            .required(t('validation.password.required')),
    });
};