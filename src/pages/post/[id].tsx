import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import createWithApollo from "../../utils/withApollo";
import { useGetIdFromUrl } from "../../utils/useGetIdFromUrl";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const intId = useGetIdFromUrl();
  const {data: postData} = usePostQuery({variables: {
    id: intId
  }})
  const { data, loading } = usePostQuery({
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Layout>
        <Box>Loading ...</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      {meData?.me?.id !== postData?.post?.creator.id ? null : (
        <EditDeletePostButtons id={data.post.id} />
      )}
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Post);
