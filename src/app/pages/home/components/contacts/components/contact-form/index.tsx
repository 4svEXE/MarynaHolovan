import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import Loader from "../../../../../../components/shared/loader";
import { toast, Toaster } from "react-hot-toast";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  photoshootType: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const SERVICE_ID =
    (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || "service_al6dooo";
  const TEMPLATE_ID =
    (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || "template_w4dcxww";
  const USER_ID =
    (import.meta.env.VITE_EMAILJS_USER_ID as string) || "_i9RtJHIWkF2VHusS";

  const EMAIL_LIMIT_KEY = "emailSendLimit";
  const EMAIL_LIMIT_MAX = 3;

  const validationSchema = Yup.object({
    name: Yup.string().required(t("errors.required")),
    email: Yup.string()
      .email(t("errors.invalidEmail"))
      .required(t("errors.required")),
    phone: Yup.string(),
    photoshootType: Yup.string().required(t("errors.required")),
    message: Yup.string(),
  });

  const canSendEmail = () => {
    const emailData = JSON.parse(
      window.localStorage.getItem(EMAIL_LIMIT_KEY) || "{}"
    );
    const today = new Date().toLocaleDateString();

    if (emailData.date === today) {
      return emailData.count < EMAIL_LIMIT_MAX;
    }

    return true;
  };

  const updateEmailLimit = () => {
    const emailData = JSON.parse(
      window.localStorage.getItem(EMAIL_LIMIT_KEY) || "{}"
    );
    const today = new Date().toLocaleDateString();

    if (emailData.date === today) {
      emailData.count += 1;
    } else {
      emailData.date = today;
      emailData.count = 1;
    }

    window.localStorage.setItem(EMAIL_LIMIT_KEY, JSON.stringify(emailData));
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!canSendEmail()) {
      toast.error(t("contactForm.limitExceeded"));
      actions.setSubmitting(false);
      return;
    }

    try {
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
      updateEmailLimit();
      actions.resetForm();
      toast.success(t("contactForm.successMessage"));
    } catch (error) {
      toast.error(t("contactForm.errorMessage"));
    } finally {
      actions.setSubmitting(false);
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

            <Toaster position="top-right" reverseOrder={false} />


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
            className="custom-button flex justify-center items-center gap-3"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t("contactForm.submitButton")}

            {formik.isSubmitting && (
              <div className="loading">
                <div className="hidden">{t("contactForm.loadingMessage")}</div>
                <Loader />
              </div>
            )}
          </button>

          <p className="info mt-2">{t("contactForm.infoText")}</p>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;
