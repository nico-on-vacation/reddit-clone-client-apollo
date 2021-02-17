import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import createWithApollo from "../utils/withApollo";

interface forgotPasswordProps {}

const forgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({variables: values});
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              {" "}
              If an account with that email exists, we sent you an email.
            </Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Send me Link
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default createWithApollo({ssr: false})(forgotPassword);
