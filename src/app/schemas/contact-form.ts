import * as yup from "yup";
import { useTranslation } from "react-i18next";

export type ContactFormValues = {
  name: string;
  email: string;
  photoshootType: string;
  message: string;
};

export const useContactValidationSchema = () => {
  const { t } = useTranslation();

  const contactSchema = yup.object().shape({
    name: yup.string().required(t("errors.nameRequired")),
    email: yup
      .string()
      .email(t("errors.invalidEmail"))
      .required(t("errors.emailRequired")),
    photoshootType: yup.string().required(t("errors.photoshootTypeRequired")),
    message: yup.string(),
  });

  return contactSchema;
};
