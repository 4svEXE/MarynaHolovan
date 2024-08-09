import { useTranslation } from "react-i18next";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const { t } = useTranslation();

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

  const validationSchema = Yup.object({
    name: Yup.string().required(t("errors.required")),
    email: Yup
      .string()
      .email(t("errors.invalidEmail"))
      .required(t("errors.required")),
    photoshootType: Yup.string().required(t("errors.required")),
    message: Yup.string(),
  });

  const onSubmit = async (values, actions) => {
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name,
          to_name: "Recipient Name",
          message: values.message,
          reply_to: values.email,
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
