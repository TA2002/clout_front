import Container from "@/components/ui/container";

export const DataDeletion = () => {
  return (
    <Container>
      <div className="container w-full mt-20">
        <h3 className=" mb-8 font-heading text-5xl font-bold">
          Deletion of Personal Information
        </h3>
        <div className="">
          <p className="mb-4 text-base font-bold">Dear Clout User,</p>

          <p className="mb-4 text-base">
            We respect your privacy and take data protection seriously. If you
            wish to have all your personal information removed from our system,
            please follow the instructions below:
          </p>

          <p className="mb-4 text-base">
            Compose an email from the email address associated with your Clout
            account.
          </p>

          <p className="mb-4 text-base">
            Address the email to: <strong>info@clout.kz</strong>
          </p>

          <p className="mb-4 text-base">
            In the subject line of your email, please write: "Deletion Request -
            [Your Username or Registered Email]"
          </p>

          <p className="mb-4 text-base">
            In the body of the email, kindly include the following information
            to help us process your request accurately:
          </p>

          <p className="mb-4 text-base font-bold">- Your full name</p>

          <p className="mb-4 text-base font-bold">
            - Your username or registered email address on clout.kz
          </p>

          <p className="mb-4 text-base">
            Please provide any additional context or details that may assist us
            in identifying your account.
          </p>

          <p className="mb-4 text-base">
            Once we receive your request, we will promptly initiate the process
            of deleting your personal information from our database in
            accordance with our privacy policy. Please note that certain legal
            obligations may require us to retain some data for a specified
            period.
          </p>

          <p className="mb-4 text-base">
            If you have any questions or concerns, please do not hesitate to
            contact us at info@clout.kz.
          </p>

          <p className="mb-4 text-base">
            Thank you for using Clout.kz, and we appreciate your understanding
            of our data handling practices.
          </p>

          <p className="mb-4 text-base font-bold">Best regards,</p>

          <p className="mb-4 text-base font-bold">Clout team</p>
        </div>
      </div>
    </Container>
  );
};
