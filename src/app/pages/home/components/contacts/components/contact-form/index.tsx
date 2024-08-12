import { useTranslation } from "react-i18next";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  photoshootType: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string || 'service_al6dooo';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string || 'template_w4dcxww';
  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID as string || '_i9RtJHIWkF2VHusS';

  const validationSchema = Yup.object({
    name: Yup.string().required(t("errors.required")),
    email: Yup.string()
      .email(t("errors.invalidEmail"))
      .required(t("errors.required")),
    phone: Yup.string(),
    photoshootType: Yup.string().required(t("errors.required")),
    message: Yup.string(),
  });

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      console.log('values.photoshootType :>> ', values, values.photoshootType);
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name,
          to_name: "Maryna Holovan",
          message: values.message,
          phone: values.phone,
          photoshootType: values.photoshootType,
          email: values.email,
        },
        USER_ID
      );
      alert(t("contactForm.successMessage"));
    } catch (error) {
      console.error("Error sending email:", error);
      alert(t("contactForm.errorMessage"));
    } finally {
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        photoshootType: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <form className="contact-form" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">{t("contactForm.nameLabel")}</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">{t("contactForm.emailLabel")}</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">{t("contactForm.phoneLabel")}</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="photoshoot-type">
              {t("contactForm.photoshootTypeLabel")}
            </label>
            <Field as="select" id="photoshoot-type" name="photoshootType">
              <option value="" disabled>
                {t("contactForm.notSpecified")}
              </option>
              <option value="Express">Express</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </Field>
            <ErrorMessage
              name="photoshootType"
              component="div"
              className="error-message"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">{t("contactForm.messageLabel")}</label>
            <Field as="textarea" id="message" name="message" rows={4} />
            <ErrorMessage
              name="message"
              component="div"
              className="error-message"
            />
          </div>
          <button
            className="custom-button"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t("contactForm.submitButton")}
          </button>

          <p className="info mt-2">{t("contactForm.infoText")}</p>

          {formik.isSubmitting && (
            <div className="loading">{t("contactForm.loadingMessage")}</div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;
